'use strict';

const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.route('/customer').get(userController.findByRole);
router.route('/doctor').get(userController.findByRole);
router.route('/deliveryman').get(userController.findByRole);
router.route('/representative').get(userController.findByRole);
router.route('/info/:id').get(userController.findById);

module.exports = router;
