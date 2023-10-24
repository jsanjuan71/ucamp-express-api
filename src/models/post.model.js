const mongoose = require('mongoose')

const { modelNames } = require('../tools/data.constants')

const postSchema = new mongoose.Schema({
    author: { // ATENCION: este campo es un ObjectId
        type: mongoose.Schema.Types.ObjectId, // tipo de dato es un ObjectId esto cuando son ids de otros documentos
        ref: modelNames.users, // la referencia es el modelo de usuario
        required: true, // es requerido
        default: new mongoose.Types.ObjectId( process.env.SYSTEM_USER_ID ) // el valor por defecto es el id del usuario del sistema
    },
    header: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        default: "No content"
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: false
    },
    isUseful: {
        type: Boolean,
        required: true,
        default: true
    },
}, {
    timestamps: true //Habilita los campos createdAt y updatedAt
})

// creamos el modelo con su respectiva estructura
const Post = mongoose.model( modelNames.posts , postSchema)
// exportamos el modelo
module.exports = Post