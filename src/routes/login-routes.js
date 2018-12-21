'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/login-controller');
const authService = require('../../src/services/auth-service');

router.post('/create', controller.post)
router.post('/authenticate', controller.authenticate)
router.get('/list', authService.authorize ,controller.get)
router.put('/update/:id', authService.authorize ,controller.UserUpdate)



module.exports = router;
