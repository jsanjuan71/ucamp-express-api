const express = require('express')

const router = express.Router()

//POST /pets/

router.get("/", (request, response) => {
    response.json({ "message": "GET /pets/" })
})

router.get("/:id", (request, response) => {})

router.post("/", (request, response) => {})

router.put("/:id", (request, response) => {})

router.delete("/:id", (request, response) => {})

module.exports = router