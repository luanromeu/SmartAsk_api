'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/questions-controllers');
const authService = require('../../src/services/auth-service');

router.post('/new', controller.addNewQuestion)
router.put('/delete', controller.removeQuestion)




module.exports = router;
