var express = require('express');
var router = express.Router();
const controller = require('../controllers/controller.js');
const marblesController = require('../controllers/marbles.controller.js');
const marblesPrivateController = require('../controllers/marblesPrivate.controller.js');

const userController = require('../controllers/users.controller');

router.get('/healthcheck', controller.healthcheck);
router.post('/marble/create', marblesController.createMarble);
router.get('/marble/get/:name', marblesController.getMarble);
router.post('/marble/delete', marblesController.deleteMarble);
router.post('/marble/transfer', marblesController.transferMarble);

router.post('/private/marble/create', marblesPrivateController.createMarble);

router.post('/user/create', userController.createUser);
router.post('/user/enroll', userController.enroll);



module.exports = router;
