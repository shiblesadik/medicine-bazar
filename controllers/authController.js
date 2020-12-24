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
    if (req.userData.role !== 'admin') {
        res.status(404).json({
            status: 'Unauthorized'
        });
        return;
    }
    await userService.registerAdminUser(req.body, async (data) => {
        if (data.email === req.body.email && data.phone === req.body.phone) {
            res.status(201).json({
                status: 'success'
            });
        } else {
            res.status(401).json({
                status: 'failed'
            });
        }
    });
};
