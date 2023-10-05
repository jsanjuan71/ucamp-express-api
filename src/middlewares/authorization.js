const jwt = require("express-jwt")

const secretKey = process.env.JWT_SECRET

// Ejemplos de Authorization Header
    // Bearer asdfasdfasdfa -> JWT
    // Token asdfasdfasdfa -> JWT
    // Basic asdfasdfasdsdsd3545 -> Basic Auth
    // root:asdfasdfasdfadssddssd -> Api key Auth

const getTokenFromHeaders = (request) => {
    //const {headers: {authorization}} = request

    // obtiene el header authorization de la petición
    const {authorization} = request.headers

    // si no existe el header authorization regresa null
    if(!authorization) return null

    // si existe el header authorization lo separa por espacios
    const [authType, token] = authorization.split(" ")

    // si el tipo de autorización no es Bearer o Token regresa null
    if(authType.toLowerCase() != "bearer" && authType.toLowerCase() != "token") return null

    // Finalmente si todo ok regresa el token
    return token

}

// middleware para verificar el token usando express-jwt
const auth = jwt.expressjwt({
    secret: secretKey, // llave secreta para encriptar y desencriptar el token
    algorithms: ["HS256"], // algoritmo de encriptación por defecto
    requestProperty: "user", // request.user  -> { id, email }
    getToken: getTokenFromHeaders // funcion para obtener el token del header
})

// exportamos el middleware
module.exports = auth