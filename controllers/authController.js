'use strict';

const User = require('../models/userModel');
const userService = require('../services/user/userService');
const authService = require('../services/authentication/authenticationService');

exports.registerOrLoginUser = async (req, res) => {
    await userService.registerOrLoginUser(req.body, async (data) => {
        const user = {
            userId: data._id,
            phone: data.phone,
            name: data.name,
            role: data.role,
        };
        const jwtToken = await authService.generateJwtToken(user);
        res.status(201)
            .json({
                status: 'success',
                userId: user.userId,
                phone: user.phone,
                username: user.name,
                role: user.role,
                token: jwtToken,
            });
    });
};

exports.registerAdmin = async (req, res) => {

};

exports.registerDoctor = async (req, res) => {

};

exports.registerDeliveryMan = async (req, res) => {

};

exports.loginAdmin = async (req, res) => {

};

exports.loginDoctor = async (req, res) => {

};

exports.loginDeliveryMan = async (req, res) => {

};
