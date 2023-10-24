require('dotenv').config()

const express = require('express')
// Importamos el modulo de mongoose
const mongoose = require('mongoose')

const cors = require('cors')

const jwt = require('jsonwebtoken')

const crypto = require('crypto')
const auth = require('./middlewares/authorization')

const secretKey = process.env.JWT_SECRET    

/** Hacemos el setup de la base de datos */
require("./config/database.config").setup()

const app = express()
// middleware para permitir conexiones externas // cross-origin resource sharing
app.use( cors() )
// middleware para poder recibir datos en formato json en el body de la peticion
app.use( express.json() ) // -> request.body

// middleware para verificar el token

app.get("/", auth, (request, response) => {
    response.json({
        name: "Ucamp Express API",
        version: "1.0.0",
        message: "Hello World" 
    })
})

 /** Este endpoint solo fue de prueba para ver si mongoose funcionaba */
app.get("/mongoose", (request, response) => {
    // Paso 1- Conectarse a mongodb usando el conection string
    mongoose.connect(process.env.MONGODB_CONECTION_STRING)

    // Paso 2- Definir el esquema de la coleccion
    const Cat = mongoose.model("Cat", {
        name: String,
        age: Number
    })
    // Paso 3- Crear una instancia del modelo, un documento nuevo
    const myCat = new Cat({
        name: "michi",
        age: 4
    })
    // Paso 4- Si es necesario aun se puede modificar el documento
    myCat.age = 5
    // Paso 5- Guardar el documento en la coleccion, esto ya lo manda a base de datos
    myCat.save()
        .then( (result) => {
            console.log("cat created", result)
            response.json(result)
        }).catch( (error) => {
            console.error("cat error", error)
            response.json(error.message)
        })

})

app.post("/token", (request, response) => {
    
    const token = jwt.sign({
        id: 23434,
        email: "sahj@live.com.mx"
    }, secretKey)

    response.json({
        token: token
    })
})

app.get("/token/:token", (request, response) => {
    const token = request.params.token
    const payload = jwt.verify(token, secretKey)
    response.json({
        payload: payload
    })
})

app.post("/encrypt", (request, response) => {
    const salt = "10000"
    const password = request.body.password
    const encrypted = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512")
        .toString("hex")
    response.json({encrypted})

    //200.toString(2)  // "11001000"
})

app.use("/products", require("./routers/products.router"))
app.use("/pets", require("./routers/pets.router"))
app.use("/users", require("./routers/users.router")) // agregamos el router de usuarios
app.use("/posts", require("./routers/posts.router")) // agregamos el router de posts


const port = process.env.PORT

app.listen(port, () => {
    console.log(`New Server running on port ${port}`)
})