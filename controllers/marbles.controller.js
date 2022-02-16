const hfConnection = require('../helpers/hfconnection');

// peer chaincode invoke -C myc1 -n marbles -c '{"Args":["initMarble","marble2","red","50","tom"]}'
async function createMarble(req, res) {
    try {
        const name = req.body.name;
        const color = req.body.color;
        const size = req.body.size;
        const owner = req.body.owner;
        const network = hfConnection.getConnection();
        const contract = network.getContract(process.env.CHAINCODE_NAME);
        console.log(`Creating Marble with params: ${name}, ${color}, ${size}, ${owner}`)
        await contract.submitTransaction("initMarble", name, color, size, owner);
        console.log(`Marble created successfully`);
        return res.send({ message: "Marble created" }).status(200);
    } catch (err) {
        console.log(err)
        return res.json({ error: err.message }).status(500);
    }
}
// peer chaincode query -C myc1 -n marbles -c '{"Args":["readMarble","marble1"]}'
async function getMarble(req, res) {
    try {
        const name = req.params.name;
        const network = hfConnection.getConnection();
        const contract = network.getContract(process.env.CHAINCODE_NAME);
        console.log(`Get Marble with params: ${name}`)
        const result = await contract.evaluateTransaction("readMarble", name);
        console.log("Returning result" + result);
        res.send({ output: JSON.parse(result) }).status(200);
    } catch (err) {
        console.log(err)
        res.send({error: err.message }).status(500);
    }
}
 // peer chaincode invoke -C myc1 -n marbles -c '{"Args":["transferMarble","marble2","jerry"]}'
async function transferMarble(req, res) {
    try {
        const name = req.body.name;
        const owner = req.body.owner;

        const network = hfConnection.getConnection();
        const contract = network.getContract(process.env.CHAINCODE_NAME);
        console.log(`Transfer Marble with params: ${name},  ${owner}`)
        await contract.submitTransaction("transferMarble", name, owner);
        console.log(`Marble transferred successfully`);
        res.send({ message: "Marble transferred to " + owner +` successfully` }).status(200);
    } catch (err) {
        console.log(err)
        res.send({ error: err.message }).status(500);
    }
}
// peer chaincode invoke -C myc1 -n marbles -c '{"Args":["delete","marble1"]}'
async function deleteMarble(req, res) {
    try {
        const name = req.body.name;
        const network = hfConnection.getConnection();
        const contract = network.getContract(process.env.CHAINCODE_NAME);
        console.log(`Delete Marble with params: ${name}`)
        await contract.submitTransaction("delete", name);
        console.log(`Marble transferred successfully`);
        res.send({ message: "Marble transferred to " + newOwner ` successfully` }).status(200);
    } catch (err) {
        console.log(err)
        res.send({ error: err.message }).status(500);
    }
}


module.exports = {
    createMarble,
    transferMarble,
    getMarble,
    deleteMarble
}