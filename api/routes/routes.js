var express = require('express');
var router = express.Router();
const controller = require('../controllers/controller.js')
const marblesController = require('../controllers/marbles.controller.js')
const userController = require('../controllers/users.controller')

router.get('/healthcheck', controller.healthcheck);


module.exports = router;
