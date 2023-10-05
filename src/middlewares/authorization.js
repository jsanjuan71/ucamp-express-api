const jwt = require("express-jwt")

const secretKey = process.env.JWT_SECRET

const getTokenFromHeaders = (request) => {
    //const {headers: {authorization}} = request

    const {authorization} = request.headers

    if(!authorization) return null

    // jwt token
    // Bearer asdfasdfasdfa
    // Token asdfasdfasdfa

    // basic auth
    // Basic asdfasdfasdsdsd3545

    // api key
    // root:asdfasdfasdfadssddssd

    const [authType, token] = authorization.split(" ")

    if(authType.toLowerCase() != "bearer" && authType.toLowerCase() != "token") return null

    return token

}

const auth = jwt.expressjwt({
    secret: secretKey,
    algorithms: ["HS256"],
    userProperty: "user", // request.user  -> { id, email }
    getToken: getTokenFromHeaders
})


module.exports = auth