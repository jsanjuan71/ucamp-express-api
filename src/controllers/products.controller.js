// importamos el modelo de usuario
const Product = require('../models/product.model');

const jwt = require('jsonwebtoken')

const secretKey = process.env.JWT_SECRET

/**
 * @param {Object} productInfo 
 * @returns {boolean, Object} error and result object
 */
const createProduct = async (productInfo) => {
    try {
        // creamos el usuario en base a la estructura del modelo
        const newProduct = new Product({
            title: productInfo.title,
            description: productInfo.description,
            price: productInfo.price,
            stock: productInfo.stock,
            category: productInfo.category
        })

        // guardamos el usuario en la base de datos
        const productCreated = await newProduct.save()
        // regresamos la estructura de error y resultado
        return {
            error: false,
            result: productCreated
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
const fetchAllProducts = async () => {
    try {
        // usamos el metodo find para traer todos los usuarios
        // el segundo parametro es para indicar que campos queremos omitir (proyeccion)
        const products = await Product.find({}, {updatedAt: 0})

        // regresamos la estructura error y resultado
        return {
            error: false,
            result: products
        }
    } catch (error) {
         // igualmente la estructura de error y resultado pero con valores de error
        return {
            error: true,
            result: error.message
        }
    }
}


const getProductById = async (id) => {
    try {
        // usamos el metodo findOne para traer un usuario por su email
        // el segundo parametro es para indicar que campos queremos omitir
        const product = await Product.findOne({id})
        // si todo bien regresamos el resultado
        return {
            error: false,
            result: product
        }
    } catch (error) {
        // avisamos del error
        return {
            error: true,
            result: error.message
        }
    }
}


const updateProductById = async (idToFind, newproductInfo) => {
    try {
        // usamos el metodo updateOne para actualizar un usuario por su email
        const updated = await Product.updateOne({id: idToFind}, {
            description: newproductInfo.description,
            price: newproductInfo.price,
            stock: newproductInfo.stock,
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

const deleteProductById = async (idToFind) => {
    try {
        // usamos el metodo deleteOne para eliminar un usuario por su email
        const deleted = await Product.deleteOne({id: idToFind})
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



module.exports = {
    createProduct,
    fetchAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
}