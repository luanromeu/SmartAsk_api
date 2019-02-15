'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/description-controller');
const authService = require('../../src/services/auth-service');

router.post('/create', authService.authorize ,controller.create)
router.get('/list', authService.authorize, controller.listmodels)




module.exports = router;
