const express = require('express')
const fs = require('fs')

const router = express.Router()

const newLineSymbol = "\r\n"

//POST /products/

router.get("/", (request, response) => {   
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
})

router.get("/:id", (request, response) => {})

router.post("/", (request, response) => {
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

router.put("/:id", (request, response) => {})

router.delete("/:name", (request, response) => {
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

module.exports = router