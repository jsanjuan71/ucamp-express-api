const Post = require('../models/post.model')

const { getValidationMessage, dataValidationMessages } = require('../tools/messages.constants')

/**
 * @param {Object} postInfo 
 * @returns {boolean, Object} error and result object
 */
const createPost = async (postInfo, author) => {
    try {
        // creamos una instancia del modelo con la informacion recibida
        // le agregamos el author y el isPublic dependiendo si el author esta definido
        const newPost = new Post( {...postInfo, author, isPublic: typeof author === "undefined" } )

        // guardamos el usuario en la base de datos
        const created = await newPost.save()
        // regresamos la estructura de error y resultado
        return {
            error: false,
            result: created
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
 * 
 * 
 * fetchAllPosts( isPublic, true )
 */
const fetchAllPosts = async (field, value) => {
    try {
        // buscamos todos los posts que coincidan con el campo y el valor
        const posts = await Post.find( { [field]: value }, { updatedAt: 0 } )

        // regresamos la estructura error y resultado
        return {
            error: false,
            result: posts
        }
    } catch (error) {
         // igualmente la estructura de error y resultado pero con valores de error
        return {
            error: true,
            result: error.message
        }
    }
}


const getPostById = async (id) => {
    try {
        // buscamos el post por id
        const product = await Post.findOne({id})
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


const updatePostById = async (idToFind, authorId, newpostInfo) => {
    try {
        // Buscamos todos los posts que coincidan con el id y el author
        const matchedPosts = await Post.find({ author: authorId, _id: idToFind })

        // Si no hay posts que coincidan con el id y el author, avisamos del error
        if( !matchedPosts.length ) throw new Error( getValidationMessage( dataValidationMessages.not_owned, ["post"]) )

        // Actualizamos el post
        const updated = await Post.updateOne({_id: idToFind}, {
            header: newpostInfo.header,
            content: newpostInfo.content,
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

const deletePostById = async (idToFind, authorId) => {
    try {
        // Buscamos todos los posts que coincidan con el id y el author
        const matchedPosts = await Post.find({ author: authorId, _id: idToFind })

        // Si no hay posts que coincidan con el id y el author, avisamos del error
        if( !matchedPosts.length ) throw new Error(getValidationMessage( dataValidationMessages.not_owned, ["post"]))

        // Eliminamos el post
        const deleted = await Post.deleteOne({_id: idToFind })

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
    createPost,
    fetchAllPosts,
    getPostById,
    updatePostById,
    deletePostById
}