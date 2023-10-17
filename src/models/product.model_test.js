const mongoose = require('mongoose')

const { productCategories, defaultValues, modelNames } = require('../tools/data.constants')
const { getValidationMessage, validationMessages } = require('../tools/messages.constants')

// definimos el esquema de la coleccion
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, getValidationMessage( validationMessages.required, ["title"] )  ],
        unique: true,
    },
    description: {
        type: String,
        default: defaultValues.noDescription
    },
    price: {
        type: Number,
        required: [true, getValidationMessage( validationMessages.required, ["price"] )],
    },
    stock: {
        type: Number,
        required: false,
        default: 1
    },
    category: {
        type: String,
        enum: productCategories,
        default: productCategories[0]
    }
}, {
    timestamps: true //Habilita los campos createdAt y updatedAt
})

// creamos el modelo con su respectiva estructura
const Product = mongoose.model( modelNames.products , productSchema)
// exportamos el modelo
module.exports = Product