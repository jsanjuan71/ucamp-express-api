// importamos el modelo de usuario
const User = require('../models/user.model');

/**
 * @param {Object} userInfo 
 * @returns {boolean, Object} error and result object
 */
const createUser = async (userInfo) => {
    try {
        // creamos el usuario en base a la estructura del modelo
        const newUser = new User({
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            email: userInfo.email,
            age: userInfo.age,
            password: userInfo.password,
        })
        // guardamos el usuario en la base de datos
        const userCreated = await newUser.save()
        // regresamos la estructura de error y resultado
        return {
            error: false,
            result: userCreated
        }
    } catch (error) {
        // igualmente la estructura de error y resultado pero cambiando los valores
        return {
            error: true,
            result: error.message
        }
    }
}

/**
 * @returns Array of users
 */
const fetchAllUsers = async () => {
    try {
        // usamos el metodo find para traer todos los usuarios
        const users = await User.find()
        // regresamos la estructura error y resultado
        return {
            error: false,
            result: users
        }
    } catch (error) {
         // igualmente la estructura de error y resultado pero con valores de error
        return {
            error: true,
            result: error.message
        }
    }
}

module.exports = {
    createUser,
    fetchAllUsers,
}