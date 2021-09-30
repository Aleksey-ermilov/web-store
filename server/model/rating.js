const mongoose = require('mongoose')

const Rating = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
    deviceId: { type: mongoose.Schema.Types.ObjectId, ref:'Device' },
    rate: String
})

module.exports = mongoose.model('Rating',Rating)