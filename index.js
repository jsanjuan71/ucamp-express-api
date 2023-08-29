/** Importamos el módulo express */
const express = require('express')
/** iniciamos el objeto app */
const app = express()

/** Definimos el puerto donde va correr la aplicación */
const port = 3000

/**
 *  GET     /                   health check - status 200
    GET     /products           obtener todos los productos
    GET     /products/:id       obtener un producto por id     
    POST    /products           crear un producto
    PUT     /products/:id       actualizar un producto por id
    DELETE  /products/:id       eliminar un producto por id

    GET     /users                  obtener todos los usuarios
    GET     /users/:id              obtener un usuario por id
    GET     /users/:id/account-info     obtener todos los productos de un usuario
    GET     /users/:id/account-info/plan
 */

/** Definimos la ruta raiz */
/**
 * GET  /  - health check - Ver que la api esté bien
 * request - petición del cliente
 * response - respuesta del servidor
 */
app.get("/", (request, response) => {
    response.json({ message: "Hello World" })
})

/** Definimos la ruta GET /products - listar los productos y listar por query param */
app.get("/products", (request, response) => {
    const products = ["product1", "product2", "product3", "tablet 1", "tablet lenovo", "laptop acer", "producto 6"]
    const filtro = request.query.filtro
    const fecha = request.query.fecha
    /** Si el filtro viene aplicarlo a la lista de productos */
    if(filtro) {
        const productosFiltrados = products.filter(product => product.includes(filtro))
        response.json({ "list": productosFiltrados, "filtro": filtro, "fecha":  fecha })
    } else {
        /** Si no hay filtro se devuelve todos los productos */
        response.json({ "list": products, "filtro": filtro, "fecha" : fecha })
    }
})



// ejemplo de no apego a protocolo REST
app.post("/productsById", (request, response) => {
    request.body.id
})

/** GET /products/:sku - Objetener un producto por su sku */
app.get("/products/:sku", (request, response) => {
    /** Obtener el path param - sku */
    const idProducto = request.params.sku
    response.json({ "sku": idProducto })
})

// /create-product
// get-plan-of-user-by-id
// update-plan-of-user-by-id
// get-products-of-user-by-id
// get-products-of-user-by-id-and-plan   
// update-product-by-id


/** POST /products - Crear producto */
app.post("/products", (request, response) => {
    
})

/** PUT /products/:id - Actualizar producto */
app.put("/products/:id", (request, response) => {

})

/** DELETE /products/:id - Eliminar producto */
app.delete("/products/:id", (request, response) => {

})

/** Iniciar el servidor para que escuche peticiones que seran procesadas por las rutas */
app.listen(port, (error) => {
    console.log(`Server is running on port ${port}`)
})

