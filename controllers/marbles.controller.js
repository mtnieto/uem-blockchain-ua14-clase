const hfConnection = require('../helpers/hfconnection');

// peer chaincode invoke -C myc1 -n marbles -c '{"Args":["initMarble","marble2","red","50","tom"]}'
async function createMarble(req, res) {
    try {
       
    } catch (err) {
        console.log(err)
        return res.json({ error: err.message }).status(500);
    }
}
// peer chaincode query -C myc1 -n marbles -c '{"Args":["readMarble","marble1"]}'
async function getMarble(req, res) {
    try {
        
    } catch (err) {
        console.log(err)
        res.send({error: err.message }).status(500);
    }
}
 // peer chaincode invoke -C myc1 -n marbles -c '{"Args":["transferMarble","marble2","jerry"]}'
async function transferMarble(req, res) {
    try {
        
    } catch (err) {
        console.log(err)
        res.send({ error: err.message }).status(500);
    }
}
// peer chaincode invoke -C myc1 -n marbles -c '{"Args":["delete","marble1"]}'
async function deleteMarble(req, res) {
    try {
       
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