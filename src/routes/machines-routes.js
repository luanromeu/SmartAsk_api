'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/machines-controller');
const authService = require('../../src/services/auth-service');

router.get('/listOutChecklists/:filterOption', authService.authorize, controller.listOutChecklists)
router.get('/listOutChecklistItens/:filterParam', controller.listOutChecklistItens)
router.get('/questionsandanswersbyquiz/:id', authService.authorize, controller.questionsAndAnswersByQuiz)
router.post('/outmachines', authService.authorize, controller.PostOut)
router.put('/ordermodels', authService.authorize, controller.PutOrderModel)
router.get('/listmachinesout/:AF', authService.authorize, controller.listMachinesOut)
router.get('/listmodels',authService.authorize, controller.listModels)
router.get('/listmodel/:Modelo', controller.listByModel)



module.exports = router;
