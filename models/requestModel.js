'use strict';

const mongoose = require('mongoose');
const validator = require('validator');

const requestSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'UserId required'],
        trim: true,
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Phone required'],
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name required'],
        trim: true,
    },
    role: {
        type: String,
        required: [true, 'Role required'],
        trim: true,
    }
});

const Request = mongoose.model('requests', requestSchema);

module.exports = Request;
