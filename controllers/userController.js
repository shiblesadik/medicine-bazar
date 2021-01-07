const User = require('../models/userModel');

exports.findByRole = async (req, res) => {
    if (req.userData.role !== 'admin' && req.userData.role !== 'representative') {
        res.status(401).json({
            status: 'Unauthorized'
        });
    } else {
        const role = req.path.toString().substring(1, req.path.toString().length);
        await User.find({role: role},).then((data) => {
            res.status(200).json({
                status: 'success',
                data: data,
            });
        });
    }
};

exports.findById = async (req, res) => {
    await User.findById(req.params.id).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data
        });
    });
};
