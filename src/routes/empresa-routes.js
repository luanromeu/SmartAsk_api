'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/empresa-controller');
const authService = require('../../src/services/auth-service');

router.post('/create', authService.authorize ,controller.create)




module.exports = router;
