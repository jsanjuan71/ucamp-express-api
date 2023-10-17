const { productCategories } = require('../tools/data.constants')
const { getValidationMessage, validationMessages } = require('../tools/messages.constants')

const mongoose = require('mongoose')


/**
 * title
 * description
 * price   
 * stock
 * category
 */
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, getValidationMessage( validationMessages.required, ["Title"]  ) ],

    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: [true, getValidationMessage( validationMessages.required, ["Price"]) ],
        min: [0, getValidationMessage( validationMessages.min, ["Price", "0"])]
    },
    stock: {
        type: Number,
        required: [true, getValidationMessage( validationMessages.required, ["Stock"]) ],
        min: [0, getValidationMessage( validationMessages.min, ["Stock", "0"])]
    },
    category: {
        type: String,
        enum: productCategories,
        default: productCategories[0]
    },
    manufacturerDate: {
        type: Date,
        required: false
    },
}, {
    timestamps: true // habilita los campos createdAt y updatedAt
})


const Product = mongoose.model("Product", productSchema)

module.exports = Product