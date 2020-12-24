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
    await User.findOne({email: info.email}).then(async (data) => {
        if (data === null || data.phone === info.phone) {
            const user = await new User(info);
            await user.save();
            callback(user);
        } else {
            callback(data);
        }
    });
};

exports.informationUser = async (info, callback) => {
    await User.findById({_id: info.userId}, {name: 1, phone: 1}).then(async (data) => {
        callback(data);
    });
};
