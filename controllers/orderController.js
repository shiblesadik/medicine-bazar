const Order = require('../models/orderModel');

exports.all = async (req, res) => {
    await Order.find().then((data) => {
        res.status(200).json({
            status: 'success',
            data: data
        });
    });
};

exports.search = async (req, res) => {
    const role = req.path.toString().substring(1, req.path.toString().length);
    await Order.find({status: role},).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data,
        });
    });
};

exports.findById = async (req, res) => {
    await Order.findById(req.params.id).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data
        });
    });
};

exports.my = async (req, res) => {
    await Order.find({customerId: req.userData.userId}).sort({date: 1}).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data
        });
    });
};

exports.insert = async (req, res) => {
    const data = {
        customerId: req.userData.userId,
        prescription: req.body.prescription,
        address: req.body.address,
        list: req.body.data,
        total: req.body.total + 50
    };
    const order = new Order(data);
    await order.save();
    res.status(201).json({
        status: 'success',
        data: order
    });
};

exports.permit = async (req, res) => {
    try {
        const update = {
            deliverymanId: req.body.deliverymanId,
            representativeId: req.userData.userId,
            status: 'pending'
        };
        const order = await Order.updateOne(
            {_id: req.body.orderId},
            {
                $set: update,
            }
        );
        res.status(200).json({
            status: 'success',
            data: order,
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message
        });
    }
};

exports.update = async (req, res) => {
    try {
        const update = {
            status: req.body.status
        };
        const order = await Order.updateOne(
            {_id: req.body.orderId},
            {
                $set: update,
            }
        );
        res.status(200).json({
            status: 'success',
            data: order,
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message
        });
    }
};

exports.upload = async (req, res) => {
    if (req.files) {
        let url = [];
        for (let i = 0; i < req.files.length; ++i) {
            let path = req.files[0].path.replace(/\\/g, '/');
            path = path.split('storage/').join('/');
            url.push('https://medicine-bazar-backend.herokuapp.com' + path);
        }
        if (url.length === 1) {
            url = url[0];
        }
        res.status(200).json({
            status: 'success',
            url: url
        });
    } else {
        res.status(404).json({
            status: 'failed'
        });
    }

};

exports.verify = async (req, res, next) => {
    if (req.userData.role !== 'admin'
        && req.userData.role !== 'representative'
        && req.userData.role !== 'deliveryman') {
        res.status(401).json({
            status: 'Unauthorized'
        });
    } else {
        next();
    }
};
