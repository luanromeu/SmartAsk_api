'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/machines-controller');
const authService = require('../../src/services/auth-service');

router.get('/list', authService.authorize,controller.list)
router.get('/listaf/:AF', authService.authorize, controller.listByAF)
router.post('/outmachines', authService.authorize, controller.PostOut)
router.get('/listmachinesout/:AF', authService.authorize, controller.listMachinesOut)
router.get('/listmodels',authService.authorize, controller.listModels)
router.get('/listmodel/:Modelo', controller.listByModel)



module.exports = router;
