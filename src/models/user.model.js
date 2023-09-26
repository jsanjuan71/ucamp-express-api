const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"]
    },
    lastname: {
        type: String,
        required: false,
        minlength: [3, "Lastname must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: function (value) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
            }
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    },
    age: {
        type: Number, 
        min: 18, 
        max: 65, 
        default: null
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
}, {    
    timestamps: true
})

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel