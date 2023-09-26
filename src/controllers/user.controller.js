const UserModel = require("../models/user.model")

const excludedFields = {password: 0, createdAt: 0, updatedAt: 0, __v: 0}

const fetchAllUsers = async () => {
    try {
        const users = await UserModel.find({}, excludedFields)
       return {error: false, result: users}
    } catch (err) {
       return {error: true,  result: err.message}
    }
}

const fetchUserById = async (id) => {
    try {
        const user = await UserModel.findById(id, excludedFields)
       return {error: false, result: user}
    } catch (err) {
       return {error: true,  result: err.message}
    }
}

const createUser = async (data) => {
    try {
        const newUser = await UserModel.create(data)
       return {error: false, result: {id: newUser._id}}
    } catch (err) {
       return {error: true,  result: err.message}
    }
}

const updateUser = async (id, data) => {
    try {
        const user = await UserModel.findByIdAndUpdate(id, {
            $set: { name: data.name, lastname: data.lastname, age: data.age }
        }, {new: true})
    } catch (err) {
         return {error: true,  result: err.message}
    }
}

const deleteUser = async (id) => {
    
}

module.exports = {
    fetchAllUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser
}