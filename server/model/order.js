const mongoose = require('mongoose')

const Order = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
    devices: [{
        count: { type: Number},
        device: {type: mongoose.Schema.Types.ObjectId, ref: 'Device'}
    }],
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Order',Order)