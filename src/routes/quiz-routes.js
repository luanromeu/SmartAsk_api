'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/quiz-controller');
const authService = require('../../src/services/auth-service');

router.get('/', authService.authorize, controller.listQuiz)
router.get('/quizdetails/:id', authService.authorize, controller.QuizDetails)
router.post('/new' ,authService.authorize, controller.NewQuiz)


module.exports = router;
