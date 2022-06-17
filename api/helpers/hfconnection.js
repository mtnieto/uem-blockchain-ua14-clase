const {
    Gateway,
    Wallets
} = require('fabric-network');
const config = require('../config/config.json')

let network;


async function connectNetwork() {
   
}
function getConnection() {
    return network;
}



async function disconnectNetwork() {

}

module.exports = {
    connectNetwork,
    disconnectNetwork,
    getConnection
}