const express = require('express')

const router = express.Router()

const userController = require("../controllers/user.controller")

router.get("/", async(request, response) => {
    const {error, result} = await userController.fetchAllUsers()
    if (error) {
        return response.status(500).json({error: true, message: result})
    }
    response.json({error: false, message: result})
})

router.get("/:id", async(request, response) => {
    const {error, result} = await userController.fetchUserById(request.params.id)
    if (error) {
        return response.status(500).json({error: true, message: result})
    }
    response.json({error: false, message: result})
})

router.post("/", async(request, response) => {
    
    const {error, result} = await userController.createUser(request.body)
    if (error) {
        return response.status(500).json({error: true, message: result})
    }
    response.json({error: false, message: result})
})

router.put("/:id", async(request, response) => {
    const {error, result} = await userController.updateUser(request.params.id, request.body)
    if (error) {
        return response.status(500).json({error: true, message: result})
    }
    response.json({error: false, message: result})
})

router.delete("/:id", (request, response) => {})

module.exports = router