'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/responses-controllers');
const authService = require('../../src/services/auth-service');

router.post('/new/:responses',controller.addNewResponse)




module.exports = router;