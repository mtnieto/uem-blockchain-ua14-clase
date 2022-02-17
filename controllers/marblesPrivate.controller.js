const hfConnection = require('../helpers/hfconnection');

// export MARBLE=$(echo -n "{\"name\":\"marble1\",\"color\":\"blue\",\"size\":35,\"owner\":\"tom\",\"price\":99}" | base64 | tr -d \\n)
// peer chaincode invoke -C mychannel -n marblesp -c '{"Args":["InitMarble"]}' --transient "{\"marble\":\"$MARBLE\"}"

async function createMarble(req, res) {
    try {
        const name = req.body.name;
        const color = req.body.color;
        const size = req.body.size;
        const owner = req.body.owner;
        const price = req.body.price;

        
        
        const transient = {
            
                name,
                color,
                size,
                owner,
                price
            
        }
        console.log(transient)
        const network = hfConnection.getConnection();
        const contract = network.getContract(process.env.CHAINCODE_NAME);

        let statefulTxn = contract.createTransaction('InitMarble');
        let tmapData = Buffer.from(JSON.stringify(transient));
        statefulTxn.setTransient({
            marble: tmapData
        });
        console.log(`Creating Marble with params: ${name}, ${color}, ${size}, ${owner}, ${price}`)
        result = await statefulTxn.submit();
        console.log(`Marble created successfully`);
        return res.send({ message: "Marble created" }).status(200);
    } catch (err) {
        console.log(err)
        return res.json({ error: err.message }).status(500);
    }
}

module.exports = {
    createMarble
}