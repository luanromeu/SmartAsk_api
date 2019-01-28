'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/quiz-controller');
const authService = require('../../src/services/auth-service');

// GET
router.get('/', authService.authorize, controller.listQuiz)
router.get('/quizdetails/:id', authService.authorize, controller.QuizDetails)
router.get('/listquestions' , authService.authorize, controller.listQuestions)

//POST
router.post('/new' ,authService.authorize, controller.NewQuiz)
router.post('/newquestion', authService.authorize, controller.addQuestionQuiz)
router.post('/newmodel', authService.authorize, controller.addNewModel)


//PUT
router.put('/delete/:id', authService.authorize ,controller.deleteQuiz)

//DELETE
router.delete('/removequestion',authService.authorize, controller.removeQuestion)
router.delete('/removemodel', authService.authorize, controller.removeModel)


module.exports = router;
