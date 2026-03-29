const { S3Client, ListBucketsCommand, GetPublicAccessBlockCommand } = require('@aws-sdk/client-s3');
const { IAMClient, ListUsersCommand, GetLoginProfileCommand } = require('@aws-sdk/client-iam');
const { RDSClient, DescribeDBInstancesCommand } = require('@aws-sdk/client-rds');

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'server is running' });
});

app.post('/scan', async (req, res) => {
    // store the user accesskeyid and secretaccesskey
    const { accessKeyId, secretAccessKey } = req.body;

    // create the clients
    const s3 = new S3Client({ region: 'us-east-2',
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        }
    });
    const iam = new IAMClient({ region: 'us-east-2',
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        }
    });
    const rds = new RDSClient({ region: 'us-east-2',
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        }
    });

    const { Buckets } = await s3.send(new ListBucketsCommand());
    console.log('Buckets:', Buckets);

    const findings = [];

    for (const bucket of Buckets) {
        try {
            const { PublicAccessBlockConfiguration } = await s3.send(new GetPublicAccessBlockCommand({ Bucket: bucket.Name }));
            console.log(`PublicAccessBlockConfiguration for bucket ${bucket.Name}:`, PublicAccessBlockConfiguration);
            if (!PublicAccessBlockConfiguration.BlockPublicAcls){
                findings.push({
                    resource: bucket.Name,
                    rule: 'S3 bucket does not block public ACLs',
                    severity: 'HIGH'
                })
            }
        } catch (error) {
            console.error(`Error occurred while checking bucket ${bucket.Name}:`, error);
        }
    }

    console.log('Findings:', findings);

    // scanning logic goes here
    res.json({ findings });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
