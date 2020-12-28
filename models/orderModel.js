'use strict';

const mongoose = require('mongoose');
const validator = require('validator');

const ordersSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: [true, 'Customer Id required'],
        trim: true,
    },
    representativeId: {
        type: String,
        required: false,
        trim: true,
        default: 'none',
    },
    deliverymanId: {
        type: String,
        required: false,
        trim: true,
        default: 'none',
    },
    prescription: {
        type: String,
        required: [true, 'Prescription required'],
        trim: true,
    },
    address: {
        type: String,
        required: [true, 'Delivery address required'],
        trim: true,
    },
    status: {
        type: String,
        required: false,
        trim: true,
        default: 'review',
    },
    date: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now
    },
    list: {
        type: Array,
        required: [true, 'Medicine List required'],
        trim: true,
    },
    total: {
        type: Number,
        required: [true, 'Total Price required'],
        default: 0,
    }
});

const Order = mongoose.model('orders', ordersSchema);

module.exports = Order;
