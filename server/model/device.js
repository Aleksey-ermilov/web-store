const mongoose = require('mongoose')

const Device = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    price: { type: String, required: true },
    rating: { type: String, default: '0' },
    img: { type: String, required: true },
    typeId: { type: mongoose.Schema.Types.ObjectId, ref:'Type', required: true },
    brandId: { type: mongoose.Schema.Types.ObjectId, ref:'Brand', required: true },
})

module.exports = mongoose.model('Device',Device)