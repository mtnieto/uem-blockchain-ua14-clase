const {
    Gateway,
    Wallets
} = require('fabric-network');
const config = require('../config/config.json')

let network;


async function connectNetwork() {
    const walletPath = '/tmp/hfnode/wallet';
    const ccp = config
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    gateway = new Gateway();
    await wallet.get("adminCA");
    await gateway.connect(ccp, {
        wallet: wallet,
        identity: "adminCA",
        discovery: {
            enabled: true,
            asLocalhost: true,
        }
    });
    network = await gateway.getNetwork(process.env.CHANNEL);
}
function getConnection() {
    return network;
}



async function disconnectNetwork() {
    await gateway.disconnect();

}

module.exports = {
    connectNetwork,
    disconnectNetwork,
    getConnection
}