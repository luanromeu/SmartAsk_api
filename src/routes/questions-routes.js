'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/questions-controllers');
const authService = require('../../src/services/auth-service');

router.post('/new/:question', controller.addNewQuestion)
router.put('/delete', controller.removeQuestion)
router.get('/list', controller.listQuestions)
router.get('/taskandresponses/:id', controller.listTasksAndResponses)




module.exports = router;
