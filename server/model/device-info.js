const mongoose = require('mongoose')

const DeviceInfo = new mongoose.Schema({
    deviceId: { type: mongoose.Schema.Types.ObjectId, ref:'Device', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
})

module.exports = mongoose.model('DeviceInfo',DeviceInfo)