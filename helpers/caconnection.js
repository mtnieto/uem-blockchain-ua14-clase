/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabricCAServices = require('fabric-ca-client');
const { Wallets, X509WalletMixin} = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '../config/config.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

function connectCA() {
    // Create a new CA client for interacting with the CA.
    const caInfo = ccp.certificateAuthorities['ca.org1.uem.com'];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const ca = new FabricCAServices(caInfo.url, {
        trustedRoots: caTLSCACerts,
        verify: false
    }, caInfo.caName);
    return ca;

}

async function configureFileSystemWallet(){
    const walletPath = '/tmp/hfnode/wallet';
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    return wallet;
}

async function enrollAdmin() {
    try {
        const ca = connectCA();
        const wallet = await configureFileSystemWallet();

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.get('adminCA');
        if (adminExists) {
            console.log('An identity for the admin user "admin" already exists in the wallet');
            // return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({enrollmentID: 'adminCA', enrollmentSecret: 'adminpw', profile:'tls'});
        const identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment
                    .key
                    .toBytes()
            },
            mspId: 'org1MSP',
            type: 'X.509'
        };
        await wallet.put('adminCA', identity);
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet');

    } catch (error) {
        console.error(`Error": ${error}`);
        process.exit(1);
    }
}


module.exports = {
    enrollAdmin
}