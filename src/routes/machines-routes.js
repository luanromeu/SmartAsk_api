'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/machines-controller');
const authService = require('../../src/services/auth-service');

router.get('/list', authService.authorize,controller.list)
router.get('/listaf/:AF', authService.authorize, controller.listByAF)
router.post('/outmachines', controller.PostOut)


module.exports = router;
