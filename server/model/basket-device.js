const mongoose = require('mongoose')

const BasketDevice = new mongoose.Schema({
    deviceId: { type: String, required: true },
    basketId: { type: String, required: true },
})

module.exports = mongoose.model('BasketDevice',BasketDevice)