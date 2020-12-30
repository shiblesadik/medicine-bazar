'use strict';

const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

// Prescription Upload Config

const multer = require('multer');

const storagePath = './storage';

const prescriptionStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, storagePath + '/prescription');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now().toString() + '-' + file.originalname);
    }
});

const prescriptionUpload = multer({
    storage: prescriptionStorage
});

router.route('/all').get(orderController.verify, orderController.all);
router.route('/complete').get(orderController.verify, orderController.search);
router.route('/pending').get(orderController.verify, orderController.search);
router.route('/cancel').get(orderController.verify, orderController.search);
router.route('/review').get(orderController.verify, orderController.search);
router.route('/complain').get(orderController.verify, orderController.search);
router.route('/my').get(orderController.my);
router.route('/insert').post(orderController.insert);
// router.route('/upload').post(prescriptionUpload.any(), orderController.upload);
router.route('/info/:id').get(orderController.verify, orderController.findById);

module.exports = router;
