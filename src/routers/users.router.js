const express = require('express')

const userController = require('../controllers/users.controller')
const auth = require('../middlewares/authorization')

const router = express.Router()

// GET /users/
router.get("/", auth, async(request, response) => {
    try {
        // Si se invoca el middleware de autorización, el usuario estará en request.user
        console.log("Logged user", request.user)

        // Si el usuario no es admin, no puede ver los usuarios
        if(request.user.role !== "admin") {
            // interrumpimos la ejecución y devolvemos un error 401 (Unauthorized)
            return response.status(401).json({
                error: "This service is only for admins"
            })
        }
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

router.get("/:email", async(request, response) => {
    try {
        // Invocamos al controller para traer un usuario por email
        const {error, result} = await userController.getUserByEmail(request.params.email)
        // Si algo falla devolvemos un error 400 (Bad request)
        if( error ) {
            return response.status(400).json({
                error: result
            })
        }
        //  si todo bien devolvemos un 200 (ok)
        response.status(200).json({
            result
        })
    } catch (error) {
        // si algo inesperado ocurre devolvemos un error 500 (internal server error)
        response.status(500).json({
            error: error.message
        })
    }
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

router.post("/login", async(request, response) => {
    try {
        // extraemos el email y password del body
        const {email, password} = request.body
        // llamamos al controlador para que haga el login
        const {error, result} =  await userController.login(email, password)
        // si hubo error devolvemos un error 400 (Bad request)
        if( error ) {
            return response.status(400).json({
                error: result
            })
        }
        // si todo bien devolvemos un 200 (ok)
        response.status(200).json({
            result
        })
        
    } catch (error) {
        // si algo inesperado ocurre devolvemos un error 500 (internal server error)
        response.status(500).json({
            error: error.message
        })
    }
        
})

router.put("/:email", async(request, response) => {
    try {
        // convertimos el age a numero
        request.body.age = parseInt(request.body.age)
        // invocamos al controlador para que actualice por email
        const {error, result} = await userController.updateUserByEmail(request.params.email, request.body)
        // si hubo error devolvemos un error 400 (Bad request)
        if( error ) {
            return response.status(400).json({
                error: result
            })
        }
        // si todo bien devolvemos un 200 (ok)
        response.status(200).json({
            result
        })
    } catch (error) {
        // si algo inesperado ocurre devolvemos un error 500 (internal server error)
        response.status(500).json({
            error: error.message
        })
    }
})

router.delete("/:email", async(request, response) => {
    try {
        // Invocamos al controller para borrar usuario por email
        const {error, result} = await userController.deleteUserByEmail(request.params.email)
        if( error ) {
            return response.status(400).json({
                error: result
            })
        }
        // si todo bien devolvemos un 200 (ok)
        response.status(200).json({
            result
        })
    } catch (error) {
        // si algo inesperado ocurre devolvemos un error 500 (internal server error)
        response.status(500).json({
            error: error.message
        })
    }
})

module.exports = router