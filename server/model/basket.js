const mongoose = require('mongoose')

const Basket = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
    devices: [{
        count: { type: Number},
        device: {type: mongoose.Schema.Types.ObjectId, ref: 'Device'}
    }],
})

module.exports = mongoose.model('Basket',Basket)