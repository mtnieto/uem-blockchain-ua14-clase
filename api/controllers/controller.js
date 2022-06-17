

function healthcheck(req, res) {
    return res.json({ message: 'the app is running' }).status(200);
}

module.exports = {
    healthcheck
}