'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/machines-controller');
const authService = require('../../src/services/auth-service');

//GET
router.get('/listoutchecklists/:filterOption', authService.authorize, controller.listOutChecklists)
//router.get('/listoutchecklists/:filterParam', controller.listOutChecklists)
router.get('/questionsandanswersbyquiz/:id', authService.authorize, controller.questionsAndAnswersByQuiz)
router.get('/listmachinesout/:AF', authService.authorize, controller.listMachinesOut)
router.get('/listmodels',authService.authorize, controller.listModels)
router.get('/listmodel/:Modelo', controller.listByModel)

//POST
router.post('/outmachines', authService.authorize, controller.PostOut)

//PUT
router.put('/ordermodels', authService.authorize, controller.PutOrderModel)



module.exports = router;
