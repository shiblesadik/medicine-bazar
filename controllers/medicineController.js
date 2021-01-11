const Medicine = require('./../models/medicineModel');

exports.all = async (req, res) => {
    await Medicine.find().then(async (data) => {
        res.status(200).json({
            status: 'success',
            data
        });
    });
};

exports.single = async (req, res) => {
    await Medicine.findById(req.params.id).then(async (data) => {
        if (data === null) {
            res.status(404).json({
                error: 'not found'
            });
        } else {
            res.status(200).json({
                status: 'success',
                data
            });
        }
    });
};

exports.update = async (req, res) => {
    if (req.userData.role !== 'admin') {
        res.status(401).json({
            error: 'unauthorized'
        });
        return;
    } else {
        await Medicine.replaceOne({_id: req.params.id}, req.body).then((data) => {
            if (data !== null) {
                res.status(201).json({
                    status: 'success',
                    data: data
                });
            }
        });
    }
};

exports.delete = async (req, res) => {
    if (req.userData.role !== 'admin') {
        res.status(401).json({
            error: 'unauthorized'
        });
        return;
    } else {
        await Medicine.findOneAndDelete({_id: req.params.id}).then(async (data) => {
            console.log(data);
            if (data === null) {
                res.status(404).json({
                    error: 'not found'
                });
            } else {
                res.status(200).json({
                    status: 'success'
                });
            }
        });
    }
};

exports.danger = async (req, res) => {
    if (req.userData.role !== 'admin') {
        res.status(401).json({
            error: 'unauthorized'
        });
    } else {
        await Medicine.find({count: {$lt: 5},},).sort({count: 1}).then((data) => {
            res.status(200).json({
                status: 'success',
                data: data
            });
        });
    }
};

exports.insert = async (req, res) => {
    console.log('called');
    if (req.userData.role !== 'admin') {
        res.status(401).json({
            error: 'unauthorized'
        });
    } else {
        await Medicine.findOne({name: req.body.name}).then(async (data) => {
            if (data === null) {
                try {
                    console.log(req.body);
                    const medicine = await new Medicine(req.body);
                    await medicine.save();
                    const data = medicine;
                    res.status(201).json({
                        status: 'success',
                        data
                    });
                } catch (e) {
                    res.status(403).json({
                        error: 'Please fill all field'
                    });
                }
            } else {
                res.status(403).json({
                    error: 'already exists'
                });
            }
        });
    }
};
