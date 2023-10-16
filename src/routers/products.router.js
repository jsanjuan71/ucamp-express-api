const express = require('express')

const userController = require('../controllers/users.controller')
const productController = require('../controllers/products.controller')
const auth = require('../middlewares/authorization')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const router = express.Router()

router.get("/", async(request, response) => {
    try {
        const products = await productController.fetchAllProducts()
        if( products.error ) {
            return response.status( StatusCodes.BAD_REQUEST ).json({
                error: products.result
            })
        }
        response.status( StatusCodes.OK ).json({
            result: products.result
        })
    } catch (error) {
        response.status( StatusCodes.INTERNAL_SERVER_ERROR ).json({
            error: error.message
        })
    }
})

router.get("/:id", async(request, response) => {
    try {
        response.status( StatusCodes.NOT_IMPLEMENTED ).json({
            result: ReasonPhrases.NOT_IMPLEMENTED
        })
    } catch (error) {
        response.status( StatusCodes.INTERNAL_SERVER_ERROR ).json({
            error: error.message
        })
    }
})

router.post("/", async(request, response) => {
    try {
        response.status( StatusCodes.NOT_IMPLEMENTED ).json({
            result: ReasonPhrases.NOT_IMPLEMENTED
        })
    } catch (error) {
        response.status( StatusCodes.INTERNAL_SERVER_ERROR ).json({
            error: error.message
        })
    }
})

router.post("/login", async(request, response) => {
    try {
        response.status( StatusCodes.NOT_IMPLEMENTED ).json({
            result: ReasonPhrases.NOT_IMPLEMENTED
        })
    } catch (error) {
        response.status( StatusCodes.INTERNAL_SERVER_ERROR ).json({
            error: error.message
        })
    }   
})

router.put("/:email", async(request, response) => {
    try {
        response.status( StatusCodes.NOT_IMPLEMENTED ).json({
            result: ReasonPhrases.NOT_IMPLEMENTED
        })
    } catch (error) {
        response.status( StatusCodes.INTERNAL_SERVER_ERROR ).json({
            error: error.message
        })
    }
})

router.delete("/:email", async(request, response) => {
    try {
        response.status( StatusCodes.NOT_IMPLEMENTED ).json({
            result: ReasonPhrases.NOT_IMPLEMENTED
        })
    } catch (error) {
        response.status( StatusCodes.INTERNAL_SERVER_ERROR ).json({
            error: error.message
        })
    }
})

module.exports = router