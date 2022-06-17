const caConnection = require('../helpers/caconnection')

async function createUser(req, res) {
    try {
       

    } catch (err) {
        console.log(err)
        res.send({ error: err.message }).status(500);
    }
}


async function enroll(req, res) {
    try {
       
    } catch (err) {
        console.log(err)
        res.send({ error: err.message }).status(500);
    }
}

module.exports = {
    createUser,
    enroll
}