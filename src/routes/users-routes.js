'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/users-controller');
const authService = require('../../src/services/auth-service');

router.get('/', controller.list);
router.post('/new', controller.new);
router.post('/login', controller.authenticate)


module.exports = router;