'use strict';

const User = require('./../../models/userModel');

exports.registerOrLoginUser = async (info, callback) => {
    // first validation here [check already exists or not then data validate]
    await User.findOne({phone: info.phone}).then(async (data) => {
        if (data === null) {
            const user = await new User(info);
            await user.save();
            callback(user);
        } else {
            callback(data);
        }
    });
};

exports.registerAdminUser = async (info, callback) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(String(info.email).toLowerCase())) {
        callback(null);
        return;
    }
    await User.findOne({email: info.email}).then(async (data) => {
        if (data === null || data.phone === info.phone) {
            info.role = info.role.toString().toLowerCase();
            const user = await new User(info);
            await user.save();
            callback(user);
        } else {
            callback(data);
        }
    });
};

exports.informationUser = async (info, callback) => {
    await User.findById(info.userId).then((data) => {
        if (data._id.toString() === info.userId.toString()) {
            callback(data);
        } else {
            callback(null);
        }
    });
};
