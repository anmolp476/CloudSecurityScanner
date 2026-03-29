const { ListBucketsCommand, GetPublicAccessBlockCommand, S3Client } = require("@aws-sdk/client-s3");

const scanS3 = async (findings, accessKeyId, secretAccessKey) => {

    const s3 = new S3Client({
        region: 'us-east-2',
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        }
    });

    const { Buckets } = await s3.send(new ListBucketsCommand());
    console.log('Buckets:', Buckets);

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
}

module.exports = scanS3