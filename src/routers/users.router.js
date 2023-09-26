const express = require('express')

const userController = require('../controllers/users.controller')

const router = express.Router()

// GET /users/
router.get("/", async(request, response) => {
    try {
        // llamamos al controlador para traer todos los usuarios
        const users = await userController.fetchAllUsers()
        // evaluamos si hubo un error y lanzamos un bad request con el error
        if( users.error ) {
            return response.status(400).json({
                error: users.result
            })
        }
        // si no hubo error regresamos los usuarios con un success
        response.status(200).json({
            result: users.result
        })
    } catch (error) {
        // // algun error inesperado lanzamos un error de servidor
        response.status(500).json({
            error: error.message
        })
    }
})

router.get("/:id", (request, response) => {
    
})
// POST /users/
router.post("/", async(request, response) => {
    try {
        // convertimos el age a numero
        request.body.age = parseInt(request.body.age)
        // llamamos al controlador para crear un usuario, le mandamos lo que viene en el body
        const createUser = await userController.createUser(request.body)
        // evaluamos si hubo error y lanzamos un bad request con el error
        if( createUser.error ) {
            return response.status(400).json({
                error: createUser.result
            })
        } 
        // si no hubo error un resource added y los datos del usuario
        response.status(201).json({
            result: createUser.result
        })
    } catch (error) {
        // algun error inesperado lanzamos un error de servidor
        response.status(500).json({
            error: error.message
        })
    }
    
})

router.put("/:id", (request, response) => {})

router.delete("/:id", (request, response) => {})

module.exports = router