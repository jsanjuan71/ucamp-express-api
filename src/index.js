require('dotenv').config()

const express = require('express')

const app = express()

app.use(express.json())

app.get("/", (request, response) => {
    response.json({
        name: "Ucamp Express API",
        version: "1.0.0",
        message: "Hello World" 
    })
})

app.use("/products", require("./routers/products.router"))
app.use("/pets", require("./routers/pets.router"))


const port = process.env.PORT

app.listen(port, () => {
    console.log(`New Server running on port ${port}`)
})