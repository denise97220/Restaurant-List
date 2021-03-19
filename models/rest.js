const mongoose = require("mongoose")
const Schema = mongoose.Schema

const restSchema = new Schema({
    name: {
    type: String,
    required: true
    },
    name_en: {
        type: String,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    phone: {
        type: String,
    },
    google_map: {
        type: String,
    },
    rating: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
})

module.exports = mongoose.model('Rest', restSchema)
