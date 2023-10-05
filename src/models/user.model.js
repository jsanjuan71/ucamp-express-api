const mongoose = require('mongoose')

const crypto = require('crypto')

// definimos el esquema de la coleccion
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname is required"],
    },
    lastname: {
        type: String,
        required: [true, "Lastname is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    age: {
        type: Number,
        required: false,
        min: [18, "Age must be greater than 18"],
        max: [120, "Age must be less than 120"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    },
    salt: String,
    role: { // admin, user, dev
        type: String,
        enum: ["admin", "user", "dev"], // solo acepta estos valores
        default: "user" // valor por defecto
    },
}, {
    timestamps: true //Habilita los campos createdAt y updatedAt
})

/**
 * @param {string} passwordWithoutEncryption - password sin encriptar
 * @returns {void} - no regresa nada
 */
userSchema.methods.encryptPassword = function (passwordWithoutEncryption) {
    // creamos un salt aleatorio
    this.salt = crypto.randomBytes(16).toString("hex")
    // encriptamos el password que recibimos como parametro
    this.password = crypto.pbkdf2Sync(passwordWithoutEncryption, this.salt, 10001, 512, "sha512")
        .toString("hex")
    
}

/**
 * @param {string} passwordToValidate - password sin encriptar para comparar
 * @returns  {boolean} - regresa true si el password es correcto, false si no lo es
 */
userSchema.methods.validatePassword = function (passwordToValidate) {
    // si no tenemos salt no podemos comparar
    if(!this.salt){
        return false
    }
    // encriptamos el password que queremos validar con el salt de la base de datos
    const encryptedPassword = crypto.pbkdf2Sync(passwordToValidate, this.salt, 10001, 512, "sha512")
        .toString("hex")
    // comparamos el password encriptado de la base de datos con el que encriptamos
    return encryptedPassword === this.password
}

// creamos el modelo con su respectiva estructura
const User = mongoose.model("User", userSchema)
// exportamos el modelo
module.exports = User