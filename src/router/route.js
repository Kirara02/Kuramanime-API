const router = require('express')
const route =router.Router()
const Services = require("../controllers/services")

route.get("/", (req, res) => {
    res.send({
        endpoint: {
            getOngoingAnime: "/api/v1/ongoing/:page",
            getCompletedAnime: "/api/v1/completed/:page",
            getAnimeList: "/api/v1/anime",
            getAnimeDetail: "/api/v1/anime/:id/:name",
        }
    })
})

// Get Ongoing Anime -Done-
route.get("/api/v1/ongoing/:page", Services.getOngoing)
route.get("/api/v1/completed/:page", Services.getCompleted)
route.get("/api/v1/anime", Services.getAnimeList)
route.get("/api/v1/anime/:id/:name", Services.getAnimeDetail)

module.exports = route