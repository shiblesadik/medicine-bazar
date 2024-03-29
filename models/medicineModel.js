'use strict';

const mongoose = require('mongoose');
const validator = require('validator');

const medicinesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name required'],
        trim: true,
        unique: true
    },
    company: {
        type: String,
        required: [true, 'Company required'],
        trim: true,
    },
    img: {
        type: String,
        required: [true, 'Image required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description required'],
        trim: true,
    },
    type: {
        type: String,
        required: [true, 'Type required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Must have price'],
    },
    fullPrice: {
        type: Number,
        required: [true, 'Must have price'],
    },
    count: {
        type: Number,
        required: false,
        default: 0,
    }
});

const Medicine = mongoose.model('medicines', medicinesSchema);

module.exports = Medicine;
