'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/machines-controller');
const authService = require('../../src/services/auth-service');

//GET
router.get('/listchecklists/:filterOption', authService.authorize, controller.listChecklists)
router.get('/listchecklistitens/:filterParam/:id/:type', controller.listChecklistsitens)
router.get('/questionsandanswersbyquiz/:id', authService.authorize, controller.questionsAndAnswersByQuiz)
router.get('/listmachinesout/:AF', authService.authorize, controller.listMachinesOut)
router.get('/listmodels',authService.authorize, controller.listModels)
router.get('/listmodel/:Modelo', controller.listByModel)
router.get('/listimages/:id', controller.listImagesByItens)

//POST
router.post('/outmachines', authService.authorize, controller.PostOut)
router.post('/inputmachines',authService.authorize, controller.PostInput)

//PUT
router.put('/ordermodels', authService.authorize, controller.PutOrderModel)



module.exports = router;
