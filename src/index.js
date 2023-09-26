require('dotenv').config()

const express = require('express')

const app = express()

app.use(express.json())

require("./config/database.config")

app.get("/", (request, response) => {
    response.json({
        name: "Ucamp Express API",
        version: "1.0.0",
        message: "Hello World" 
    })
})

app.use("/products", require("./routers/products.router"))
app.use("/pets", require("./routers/pets.router"))
app.use("/users",  require("./routers/users.router"))


const port = process.env.PORT

app.listen(port, () => {
    console.log(`New Server running on port ${port}`)
})