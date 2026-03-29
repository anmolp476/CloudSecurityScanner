const { DescribeDBInstancesCommand, RDSClient } = require("@aws-sdk/client-rds");

const scanRDS = async (findings, accessKeyId, secretAccessKey) => {

    const rds = new RDSClient({
        region: 'us-east-2',
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        }
    });
    
    const { DBInstances } = await rds.send(new DescribeDBInstancesCommand({}));
    console.log('DBInstances:', DBInstances);

    for (const dbInstance of DBInstances) {
        try {
            if(dbInstance.PubliclyAccessible){
                findings.push({
                    resource: dbInstance.DBInstanceIdentifier,
                    rule: 'RDS instance is publicly accessible',
                    severity: 'HIGH'
                })
            }
        } catch (error) {
            console.error(`Error occurred while checking RDS instance ${dbInstance.DBInstanceIdentifier}:`, error);
        }
    }
}

module.exports = scanRDS;