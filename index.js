require('dotenv').config()
/** Importamos el módulo express */
const express = require('express')
/** Importamos fs para manejar el file system */
const fs = require('fs')
/** iniciamos el objeto app */
const app = express()

//middleware  - funciones que se ejecutan antes de llegar a la ruta
// configuramos para que todo request pase por el middleware de json 
app.use( express.json() )

/** Definimos el puerto donde va correr la aplicación */
const port = process.env.PORT 


/** En los archivos un enter es equivalete a esto */
const newLineSymbol = "\r\n"

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
    //const products = ["product1", "product2", "1234", "tablet 1", "tablet lenovo", "laptop acer", "producto 6"]
   
    /** Bloque try catch, para manejo de errores */
    try {
        const filtro = request.query.filtro
        const fecha = request.query.fecha
        let products = []
        //const result  = await fs.readFileSync("products.txt", 'utf8')
        //console.log("result", result)
        fs.readFile("products.txt", 'utf8', async(error, data) => {
            if(error) {
                console.error("Error al leer el archivo", error.message)
                throw new Error("Error al leer el archivo")
            }
            
            //products.push( ...data.toString().split(newLineSymbol) )
            /** convertimos el texto leido en un array donde el separado es el salto de línea */
            products = data.toString().split(newLineSymbol)
        
            console.log("products", products)
            /** Solo probando el catch, si un producto era numerico esto fallaba porque
             * la función replace solo funciona con strings
             */
            console.log( products[1].replace("x", "*") )
            /** Solo probando el catch, porque al poner request.querys.date 
             * fallaba porque no existe el ojecto querys, es query sin s
             */
            console.log( request.query.date)
           
            if(filtro) {
                /** Si viene el filtro lo aplicamos usando filter */
                const productosFiltrados = products
                    .filter( product => product.toLowerCase().includes( filtro.toLowerCase() ) )
                response.json({ "list": productosFiltrados, "filtro": filtro, "fecha":  fecha })
            } else {
                /** Si no hay filtro se devuelve todos los productos */
                response.json({ "list": products, "filtro": filtro, "fecha" : fecha })
            }
        })

        /** Este solo fue un ejemplo del appendFile
         * Si no existe crea el archivo y si existe agrega una linea
         * Cada que se invoca este endpoint se agrega una linea al archivo noExiste.txt
         */
        const linea = "Hola, yo no existia" + newLineSymbol
        fs.appendFile("noExiste.txt", linea , (error) => {
            if(!error) {
                console.log("Se ha creado el archivo")
            }
        })
        
        
    /** Para todo try siempre un catch
     * Es el bloque de código que se va invocar si hay un error en el try
     */
    } catch (error) {
        /** Mandamos una respuesta avisando cual fue el error */
        response.json({
            "error": error.message,
            "filtro": filtro,
        })
    }
    
    /** Si el filtro viene aplicarlo a la lista de productos */
   
})



// ejemplo de NO APEGO a protocolo REST
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
    /** En el request.body viene el body que hayamos mandado desde el cliente
     * Recordar que el middleware lo toma y lo convierte en un objeto json legible para nosotros
     */
    console.log("request.body", request.body)
    
    try {
        /** Agregamos el producto al archivo */
        fs.appendFile("products.txt",  newLineSymbol + request.body.name, (error) => {
            /** Si se agregó correctamente entonces no hubo error */
            if(!error) {
                response.json({ "message": "Producto creado" })
            } else {
                /** Si hubo error entonces lo mandamos al catch */
                throw new Error(error.message)
            }
        })
    } catch (error) {
        /** Si hubo error avisamos que fué */
        response.json({ "error": error.message })
    }
})

/** PUT /products/:id - Actualizar producto */
app.put("/products/:id", (request, response) => {

})

/** DELETE /products/:id - Eliminar producto */
app.delete("/files/:name", (request, response) => {
    try {
        /** Obtenemos el nombre del archivo a eliminar */
        const fileName = request.params.name
        /** Eliminamos el archivo */
        fs.unlinkSync(fileName)
        /** Avisamos que todo ok */
        response.json({ "message": `Archivo ${fileName} eliminado`})
        
    } catch (error) {
        /** Avisamos cualquier error */
        response.json({ "error": error.message })
    }
})

/** Iniciar el servidor para que escuche peticiones que seran procesadas por las rutas */
app.listen(port, (error) => {
    console.log(`Server is running on port ${port}`)
})

