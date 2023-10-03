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
    salt: String
}, {
    timestamps: true //Habilita los campos createdAt y updatedAt
})

userSchema.methods.encryptPassword = function (passwordWithoutEncryption) {
    this.salt = crypto.randomBytes(16).toString("hex")
    
    this.password = crypto.pbkdf2Sync(passwordWithoutEncryption, this.salt, 10001, 512, "sha512")
        .toString("hex")
    
}

// creamos el modelo con su respectiva estructura
const User = mongoose.model("User", userSchema)
// exportamos el modelo
module.exports = User