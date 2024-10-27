const cheerio = require('cheerio')
const service = require("../helper/service")
const BASEURL = require("../constant/url")

const Services = {
    getOngoing: async (req, res) => {
        const page = req.params.page
        let url = page === 1 ? `${BASEURL}/quick/ongoing?order_by=updated&page=1` : `${BASEURL}/quick/ongoing?order_by=updated&page=${page}`
        try {
            const response = await service.fetchService(url, res)
            if (response.status === 200) {
                const $ = cheerio.load(response.data)
                const element = $(".product-page")


                let ongoing = []
                let title, thumb, episode, endpoint

                element.find(".filter__gallery a").each((index, el) => {
                    title = $(el).find(".sidebar-title-h5").text().trim()
                    episode = $(el).find(".ep > span").text().trim()
                    thumb = $(el).find(".set-bg").attr("data-setbg")
                    endpoint = $(el).attr("href").replace(`${BASEURL}`, "").replace("/", "")

                    ongoing.push({
                        title,
                        episode,
                        thumb,
                        endpoint
                    })
                })

                return res.send({
                    status: true,
                    message: response.status,
                    currentPage: Number(page),
                    ongoing: ongoing,
                })
            }

            return res.send({
                status: true,
                message: response.status,
                ongoing: [],
            })
        } catch (e) {
            console.log(e)
            res.send({
                status: false,
                message: e.error,
                ongoing: [],
            })
        }
    },
    getCompleted: async (req, res) => {
        const page = req.params.page
        let url = page === 1 ? `${BASEURL}/quick/finished?order_by=ascending&page=1` : `${BASEURL}/quick/finished?order_by=ascending&page=${page}`
        try {
            const response = await service.fetchService(url, res)
            if (response.status === 200) {
                const $ = cheerio.load(response.data)
                const element = $(".product-page")

                let completed = []
                let title, thumb, endpoint

                element.find(".filter__gallery a").each((index, el) => {
                    title = $(el).find(".sidebar-title-h5").text().trim()
                    endpoint = $(el).attr("href").replace(`${BASEURL}`, "").replace("/", "")
                    thumb = $(el).find(".set-bg").attr("data-setbg")

                    completed.push({
                        title,
                        thumb,
                        endpoint
                    })
                })

                return res.send({
                    status: true,
                    message: response.status,
                    currentPage: Number(page),
                    ongoing: completed
                })
            }

            return res.send({
                status: true,
                message: response.status,
                ongoing: [],
            })
        }catch (e){
            console.log(e)
            return res.send({
                status: false,
                message: e.error,
                ongoing: [],
            })
        }
    },
    getAnimeList: async (req, res) => {
        const page = req.query.page ?? 1
        const q = req.query.q
        let url = q === undefined ? `${BASEURL}/anime?page=${page}` : `${BASEURL}/anime?search=${q}&page=${page}`
        try {
            const response = await service.fetchService(url, res)
            console.log(response.status)
            if (response.status === 200) {
                const $ = cheerio.load(response.data)
                const element = $(".product-page")
                let data = []
                let title, thumb, endpoint


                element.find(".filter__gallery a").each((index, el) => {
                    title = $(el).find(".sidebar-title-h5").text().trim()
                    endpoint = $(el).attr("href").replace(`${BASEURL}`, "").replace("/", "")
                    thumb = $(el).find(".set-bg").attr("data-setbg")

                    data.push({
                        title,
                        thumb,
                        endpoint
                    })
                })

                return res.status(200).json({
                    status: true,
                    message: "success",
                    currentPage: Number(page),
                    data

                })
            }
            return res.send({
                message: response.status,
                data: [],
            })
        } catch (error) {
            console.log(error)
            return res.send({
                status: false,
                message: error,
                data: [],
            })
        }
    },
    getAnimeDetail: async (req, res) => {
        const id = req.params.id
        const name = req.params.name
        let url = `${BASEURL}/anime/${id}/${name}`
        try {
            const response = await service.fetchService(url, res)
            if (response.status === 200) {
                const $ = cheerio.load(response.data)
                const infoElement = $(".anime__details__content__mobile")
                let anime_detail = {}
                let episode_list = []
                let  detail = {}, pict_detail = {}
                let genres = []

                pict_detail.thumb = infoElement.find(".set-bg").attr("data-setbg")
                pict_detail.skor = infoElement.find(".set-bg > .ep").text().trim()

                infoElement.find(".anime__details__widget ul > li").each((index, el) => {
                    const key = $(el).find(".col-3 span").text().trim().replace(":", "").toLowerCase() // Mengambil teks dari span .col-3 dan menghapus tanda ":"
                    let value

                    if (key === "genre") {
                        genres = $(el).find(".col-9 a").map((i, a) => $(a).text().trim()).get()
                        detail[key] = genres.join(", ")
                    } else {
                        // Jika key bukan "genre"
                        if ($(el).find(".col-9 a").length > 0) {
                            value = $(el).find(".col-9 a").map((i, a) => $(a).text().trim()).get().join(", ")
                        } else {
                            value = $(el).find(".col-9").text().trim()
                        }
                        detail[key] = value
                    }

                    detail[key] = value
                })

                const content = infoElement.find("#episodeLists").attr("data-content")

                const episodeContent = cheerio.load(content)

                episodeContent("a.btn").each((index, el) => {
                    const episodeTitle = episodeContent(el).text().trim()

                    const episodeEndpoint = episodeContent(el).attr("href").replace(`${BASEURL}`, "").replace("/", "")

                    episode_list.push({
                        episode_title: episodeTitle,
                        episode_endpoint: episodeEndpoint,
                    })
                })


                anime_detail.title = infoElement.find(".anime__details__title h3").text().trim()
                anime_detail.subtitle = infoElement.find(".anime__details__title span").text().trim()
                anime_detail.synopsis = infoElement.find(".anime__details__text #synopsisField").html().trim()
                anime_detail.detail = detail
                anime_detail.pict_detail = pict_detail
                detail.genres = genres


                return res.status(200).json({
                    status: true,
                    message: "success",
                    anime_detail,
                    episode_list,
                    endpoint: `anime/${id}/${name}`
                })
            }

            return res.send({
                message: response.status,
                anime_detail: [],
                episode_list: []
            })
        } catch (error) {
            console.log(error)
            return res.send({
                status: false,
                message: error,
                anime_detail: [],
                episode_list: []
            })
        }
    }
}

module.exports = Services