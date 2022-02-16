const caConnection = require('../helpers/caconnection')

async function createUser(req, res) {
    try {
        const name = req.body.name;
        const password = req.body.password

        const ca = caConnection.getCA();
        const wallet = await caConnection.configureFileSystemWallet();

        const userIdentity = await wallet.get(name);
        if (userIdentity) {
            console.log(`An identity for the user adminCA already exists in the wallet`);
            return;
        }
        // Must use an admin to register a new user
        const adminIdentity = await wallet.get('adminCA');
        if (!adminIdentity) {
            console.log('An identity for the admin user does not exist in the wallet');
            console.log('Enroll the admin user before retrying');
            return;
        }
        const provider = wallet
            .getProviderRegistry()
            .getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'adminCA');  
        await ca.register({
            affiliation: 'org1',
            enrollmentID: name,
            role: 'client',
            enrollmentSecret: password,
            maxEnrollments: -1
        }, adminUser);
        res.send({ message: "User registered" }).status(200);

    } catch (err) {
        console.log(err)
        res.send({ error: err.message }).status(500);
    }
}


async function enroll(req, res) {
    try {
        const name = req.body.name;
        const password = req.body.password

        const ca = caConnection.getCA();
        const wallet = await caConnection.configureFileSystemWallet();
        const enrollment = await ca.enroll({enrollmentID: name, enrollmentSecret: password});
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment
                    .key
                    .toBytes()
            },
            mspId: 'org1MSP',
            type: 'X.509'
        };
        await wallet.put(name, x509Identity);
        res.send({ message: "User enrolled" }).status(200);
    } catch (err) {
        console.log(err)
        res.send({ error: err.message }).status(500);
    }
}

module.exports = {
    createUser,
    enroll
}