const scanS3 = require('./scanners/s3.js')
const scanIAM = require('./scanners/iam.js')
const scanRDS = require('./scanners/rds.js')

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

    const findings = [];

    scanS3(findings, accessKeyId, secretAccessKey);
    scanIAM(findings, accessKeyId, secretAccessKey);
    scanRDS(findings, accessKeyId, secretAccessKey);

    console.log('Findings:', findings);

    // scanning logic goes here
    res.json({ findings });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
