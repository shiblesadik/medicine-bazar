'use strict';

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authService = require('../services/authentication/authenticationService');

router.route('/user/register').post(authController.registerOrLoginUser);
router.route('/user/login').post(authController.registerOrLoginUser);
router.route('/admin/register').post(authService.verifyJwtToken, authController.registerAdmin);
module.exports = router;
