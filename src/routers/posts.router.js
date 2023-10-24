const express = require('express')

const postController = require('../controllers/posts.controller')
const auth = require('../middlewares/authorization')
const { StatusCodes } = require('http-status-codes')

const router = express.Router()

router.get("/", auth, async(request, response) => {
    try {
        const {error, result} = await postController.fetchAllPosts( "author", request.user.id )
        if( error ) {
              return response.status( StatusCodes.BAD_REQUEST ).json({
                error: result
              })
        }
        response.status( StatusCodes.OK ).json( result )
    } catch (error) {
        response.status( StatusCodes.INTERNAL_SERVER_ERROR ).json({
            error: error.message
        })
    }
})

router.get("/public", async(request, response) => {
    try {
       const {error, result} = await postController.fetchAllPosts( "isPublic", true )
         if( error ) {
              return response.status( StatusCodes.BAD_REQUEST ).json({
                error: result
              })
         }
        response.status( StatusCodes.OK ).json( result )
    } catch (error) {
        response.status( StatusCodes.INTERNAL_SERVER_ERROR ).json({
            error: error.message
        })
    }
})

router.get("/:id", async(request, response) => {
    try {
        const {error, result} = await postController.fetchPostById( request.params.id )
        if( error ) {
            return response.status( StatusCodes.BAD_REQUEST ).json({
                error: result
            })
        }
        response.status( StatusCodes.OK ).json( result )
    } catch (error) {
        response.status( StatusCodes.INTERNAL_SERVER_ERROR ).json({
            error: error.message
        })
    }
})

router.post("/", auth, async(request, response) => {
    try {
        const newPost = await postController.createPost(request.body, request.user.id )
        if( newPost.error ) {
            return response.status( StatusCodes.BAD_REQUEST ).json({
                error: newPost.result
            })
        }

        response.status( StatusCodes.CREATED ).json({result: newPost.result})
    } catch (error) {
        response.status( StatusCodes.INTERNAL_SERVER_ERROR ).json({
            error: error.message
        })
    }
})

router.post("/public", async(request, response) => {
    try {
        const newPost = await postController.createPost(request.body )
        if( newPost.error ) {
            return response.status( StatusCodes.BAD_REQUEST ).json({
                error: newPost.result
            })
        }

        response.status( StatusCodes.CREATED ).json({result: newPost})
    } catch (error) {
        response.status( StatusCodes.INTERNAL_SERVER_ERROR ).json({
            error: error.message
        })
    }
})

router.put("/:id", auth, async(request, response) => {
    try {
        const {error, result} = await postController.updatePostById( request.params.id, request.user.id, request.body )
        if( error ) {
            return response.status( StatusCodes.BAD_REQUEST ).json({
                error: result
            })
        }
        response.status( StatusCodes.OK ).json( result )
    } catch (error) {
        response.status( StatusCodes.INTERNAL_SERVER_ERROR ).json({
            error: error.message
        })
    }
})

router.delete("/:id", auth, async(request, response) => {
    try {
        const {error, result} = await postController.deletePostById( request.params.id, request.user.id )
        if( error ) {
            return response.status( StatusCodes.BAD_REQUEST ).json({
                error: result
            })
        }
        response.status( StatusCodes.OK ).json( result )
    } catch (error) {
        response.status( StatusCodes.INTERNAL_SERVER_ERROR ).json({
            error: error.message
        })
    }
})

module.exports = router