var express = require('express');
var router = express.Router();
const controller = require('../controllers/controller.js')
const marblesController = require('../controllers/marbles.controller.js')


router.get('/healthcheck', controller.healthcheck);
router.post('/marble/create', marblesController.createMarble);


module.exports = router;
