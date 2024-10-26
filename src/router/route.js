const router = require('express')
const route =router.Router()
const Services = require("../controllers/services")

route.get("/", (req, res) => {
    res.send({
        "status" : "success",
        "message" : "Welcome to express.js"
    })
})

// Get Ongoing Anime -Done-
route.get("/api/v1/ongoing/:page", Services.getOngoing)

module.exports = route