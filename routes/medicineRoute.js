const express = require('express');
const medicineController = require('./../controllers/medicineController');
const authService = require('../services/authentication/authenticationService');
const router = express.Router();

router.route('/all').get(medicineController.all);
router.route('/single/:id').get(medicineController.single);
router.route('/insert').post(authService.verifyJwtToken, medicineController.insert);
router.route('/update/:id').patch(authService.verifyJwtToken, medicineController.update);
router.route('/delete/:id').delete(authService.verifyJwtToken, medicineController.delete);

module.exports = router;
