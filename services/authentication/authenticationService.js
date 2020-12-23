'use strict';

const jwt = require('jsonwebtoken');
require('dotenv').config();

const userService = require('../user/userService');

const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRES_TIME = (2 * 365 * 24 * 60 * 60); // Token expires in 2 years
// Local SECRET_KEY for authentication
const AUTH_SECRET_KEY1 = process.env.LOCAL_AUTH_SECRET_KEY1;
const AUTH_SECRET_KEY2 = process.env.LOCAL_AUTH_SECRET_KEY2;
const AUTH_SECRET_KEY3 = process.env.LOCAL_AUTH_SECRET_KEY3;
const AUTH_SECRET_KEY4 = process.env.LOCAL_AUTH_SECRET_KEY4;
const AUTH_SECRET_KEY5 = process.env.LOCAL_AUTH_SECRET_KEY5;

exports.generateJwtToken = async (user) => {
    return jwt.sign(user,
        SECRET_KEY,
        {
            // algorithm: 'RS512',
            expiresIn: EXPIRES_TIME,
        }
    );
};

exports.verifyJwtToken = async (req, res, next) => {
    const token = req.headers['authentication'];
    if (!token) {
        return res.status(403)
            .json({
                error: 'Unauthorized'
            });
    } else {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403)
                    .json({
                        error: 'Unauthorized'
                    });
            } else {
                req.userData = {
                    userId: decoded.userId,
                    phone: decoded.phone,
                    name: decoded.name,
                    role: decoded.role
                }
                next();
            }
        });
    }
};

exports.verifyJwtTokenForSocketIO = async (token, next) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new Error('Unauthorized'));
        } else {
            return next(decoded);
        }
    });
};

exports.verifyLocalToken = async (req, res, next) => {
    const key1 = req.headers['auth-secret-key1'];
    const key2 = req.headers['auth-secret-key2'];
    const key3 = req.headers['auth-secret-key3'];
    const key4 = req.headers['auth-secret-key4'];
    const key5 = req.headers['auth-secret-key5'];
    if (key1 === AUTH_SECRET_KEY1 &&
        key2 === AUTH_SECRET_KEY2 &&
        key3 === AUTH_SECRET_KEY3 &&
        key4 === AUTH_SECRET_KEY4 &&
        key5 === AUTH_SECRET_KEY5) {
        next();
    } else {
        return res.status(401)
            .json({
                error: 'Unauthorized'
            });
    }
};
