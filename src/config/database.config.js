const mongoose = require('mongoose')

/**
 * @param {CallableFunction} onSuccess - Callback function to execute when the connection is successful
 * @param {CallableFunction} onError - Callback function to execute when the connection fails
 */
const setup = (onSuccess, onError) => {
    try {
        // conectamos con el conection string
        mongoose.connect( process.env.MONGODB_CONECTION_STRING )
        // Si sucede un error lo lanzamos al catch
        mongoose.connection.on("error", (error) => {
            throw new Error(error.message)
        })
        // Si la conexion es exitosa ejecutamos el callback
        mongoose.connection.on("connected", () => {
            if( typeof onSuccess === "function" ) {
                onSuccess(mongoose.connection)
                return
            }
            console.log("Mongoose connected")
        })
        
    } catch (error) {
        // Si sucede un error ejecutamos el callback
        if( typeof onError === "function" ) {
            onError(error.message)
            return
        }
        console.error("Mongoose error", error.message)
    }
}

module.exports = {setup}