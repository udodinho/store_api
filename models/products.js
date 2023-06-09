const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "product name must provided"],
    },
    price: {
        type: Number,
        required: [true, "product name must provided"],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    company: {
        type: String,
        enum: {
            values: ["ikea", "liddy", "caressa", "marcos"],
            message: "{VALUE} is supported",
        }
        // enum: ["Ikea", "Liddy", "Carresa", "Marcos"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model("product", productSchema)