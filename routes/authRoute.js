'use strict';

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authService = require('../services/authentication/authenticationService');

router.route('/user/register').post(authController.registerOrLoginUser);
router.route('/user/login').post(authController.registerOrLoginUser);
router.route('/admin/register').post(authController.registerAdmin);
router.route('/admin/login').post(authController.loginAdmin);
router.route('/doctor/register').post(authController.registerDoctor);
router.route('/doctor/login').post(authController.loginDoctor);
router.route('/deliveryman/register').post(authController.registerDeliveryMan);
router.route('/deliveryman/login').post(authController.loginDeliveryMan);

module.exports = router;
