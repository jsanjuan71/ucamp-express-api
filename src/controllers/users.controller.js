// importamos el modelo de usuario
const User = require('../models/user.model');

const jwt = require('jsonwebtoken')

const secretKey = process.env.JWT_SECRET

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
            password: null,
            salt: null
        })

        newUser.encryptPassword(userInfo.password)
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


const getUserByEmail = async (emailToFind) => {
    try {
        // usamos el metodo findOne para traer un usuario por su email
        // el segundo parametro es para indicar que campos queremos omitir
        const user = await User.findOne({email: emailToFind }, {password: 0})
        // si todo bien regresamos el resultado
        return {
            error: false,
            result: user
        }
    } catch (error) {
        // avisamos del error
        return {
            error: true,
            result: error.message
        }
    }
}


const updateUserByEmail = async (emailToFind, newUserInfo) => {
    try {
        // usamos el metodo updateOne para actualizar un usuario por su email
        const updated = await User.updateOne({email: emailToFind}, {
            firstname: newUserInfo.firstname,
            lastname: newUserInfo.lastname,
            age: newUserInfo.age
        })
        // regresamos el resultado
        return {
            error: false,
            result: updated
        }
    } catch (error) {
        // avisamos del error
        return {
            error: true,
            result: error.message
        }
    }
}

const deleteUserByEmail = async (emailToFind) => {
    try {
        // usamos el metodo deleteOne para eliminar un usuario por su email
        const deleted = await User.deleteOne({email: emailToFind})
        // regresamos el resultado
        return {
            error: false,
            result: deleted
        }
    } catch (error) {
        // avisamos del error
        return {
            error: true,
            result: error.message
        }
    }
}

/**
 * 
 * @param {string} email - email del usuario
 * @param {string} password - password del usuario
 * @returns - En result regresa el token con la informacion del usuario logueado
 */
const login = async (email, password) => {
    try {
        // buscamos el usuario por email
        const user = await User.findOne({email: email})
        // si no existe el usuario avisamos
        if( !user ) {
            throw new Error("User not found")
        }
        // validamos el password
        const passwordMatched = user.validatePassword(password)
        // si no coincide avisamos
        if( !passwordMatched ) {
            throw new Error("Password incorrect")
        }
        // creamos el token, como payload mandamos el id y el email
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, secretKey)
        // regresamos el resultado
        return {
            error: false,
            result: token
        }
        
    } catch (error) {
        // avisamos del error
        return {
            error: true,
            result: error.message
        }
    }
}

module.exports = {
    createUser,
    fetchAllUsers,
    getUserByEmail,
    updateUserByEmail,
    deleteUserByEmail,
    login
}