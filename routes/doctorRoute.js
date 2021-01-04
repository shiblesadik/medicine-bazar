'use strict';

const express = require('express');
const router = express.Router();

const doctorController = require('../controllers/doctorController');

router.route('/request').post(doctorController.request);
router.route('/permit').post(doctorController.permit);
module.exports = router;
