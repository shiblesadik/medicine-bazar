'use strict';

const Request = require('../models/requestModel');

exports.request = async (req, res) => {
    await Request.findOne({userId: req.userData.userId}).then(async (data) => {
        if (data === null) {
            const request = await new Request(req.userData);
            await request.save();
            res.status(201).json({
                status: "success"
            });
        } else {
            res.status(200).json({
                status: "success"
            });
        }
    });
};

exports.permit = async (req, res) => {
    if (req.userData.role !== 'admin') {
        res.status(404).json({
            status: "Unauthorized"
        });
    } else {
        await Request.findByIdAndDelete(req.body.requestId).then(async (data) => {
            console.log(data);
            if (data === null) {
                res.status(404).json({
                    status: "failed"
                });
            } else {
                res.status(201).json({
                    status: "success"
                });
            }
        });
    }
};

exports.get = async (req, res) => {
    if (req.userData.role !== 'admin') {
        res.status(404).json({
            status: "Unauthorized"
        });
    } else {
        await Request.find().then(async (data) => {
            console.log(data);
            if (data === null) {
                res.status(404).json({
                    status: "failed"
                });
            } else {
                res.status(200).json({
                    status: "success",
                    data: data,
                });
            }
        });
    }
};
