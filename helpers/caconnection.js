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
let ca, wallet;
function connectCA() {
  

}

function getCA() {
    return ca;
}

async function configureFileSystemWallet(){
   
}

async function enrollAdmin() {
    try {
      

    } catch (error) {
        console.error(`Error": ${error}`);
        process.exit(1);
    }
}


module.exports = {
    enrollAdmin,
    getCA,
    configureFileSystemWallet
}