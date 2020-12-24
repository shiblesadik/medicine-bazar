'use strict';

const mongoose = require('mongoose');
const validator = require('validator');

const usersSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: [true, 'Phone number required'],
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Username required'],
        trim: true,
    },
    avatarUrl: {
        type: String,
        required: false,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
        default: 'customer',
    },
    email: {
        type: String,
        required: false,
        trim: true,
    },
    address: {
        type: String,
        required: false,
        trim: true,
    },
    status: {
        type: String,
        required: false,
        trim: true,
    }
});

const User = mongoose.model('users', usersSchema);

module.exports = User;
