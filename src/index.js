require('dotenv').config()

const express = require('express')
// Importamos el modulo de mongoose
const mongoose = require('mongoose')

/** Hacemos el setup de la base de datos */
require("./config/database.config").setup()

const app = express()

app.use( express.json() )

app.get("/", (request, response) => {
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

app.use("/products", require("./routers/products.router"))
app.use("/pets", require("./routers/pets.router"))
app.use("/users", require("./routers/users.router")) // agregamos el router de usuarios


const port = process.env.PORT

app.listen(port, () => {
    console.log(`New Server running on port ${port}`)
})