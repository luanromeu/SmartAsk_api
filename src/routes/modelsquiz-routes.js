'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/modelsquiz-controller');
const authService = require('../services/auth-service');

router.post('/', authService.authorize, controller.addNewModel)


module.exports = router;
