const { ListUsersCommand, ListMFADevicesCommand, IAMClient } = require("@aws-sdk/client-iam");

const scanIAM = async (findings, accessKeyId, secretAccessKey) => {

    const iam = new IAMClient({
        region: 'us-east-2',
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        }
    });

    const { Users } = await iam.send(new ListUsersCommand());
    console.log('Users:', Users);

    for (const user of Users) {
        try {
            const { MFADevices } = await iam.send(new ListMFADevicesCommand({ UserName: user.UserName }));
            console.log(`MFADevices for user ${user.UserName}:`, MFADevices);
            if(!MFADevices || MFADevices.length === 0){
                findings.push({
                    resource: user.UserName,
                    rule: 'IAM user does not have MFA enabled',
                    severity: 'HIGH'
                })
            }
        } catch (error) {
            console.error(`Error occurred while checking user ${user.UserName}:`, error);
        }

    }
}

module.exports = scanIAM;
