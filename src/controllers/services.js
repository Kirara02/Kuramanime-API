const cheerio = require('cheerio')
const service = require("../helper/service")
const BASEURL = require("../constant/url")

const Services = {
    getOngoing: async (req, res) => {
        const page = req.params.page
        let url = page === 1 ? `${BASEURL}/quick/ongoing?order_by=updated&amp;page=1` : `${BASEURL}/quick/ongoing?order_by=updated&amp;page=${page}`
        try {
            const response = await service.fetchService(url, res)
            // console.log(response.headers);
            if (response.status === 200) {
                const $ = cheerio.load(response.data)
                const element = $(".product-page")


                let ongoing = []
                let title, thumb, episode, updated_on, updated_day, endpoint

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
                    message: response.status,
                    ongoing: ongoing,
                })
            }

            return res.send({
                message: response.status,
                ongoing: [],
            })
        } catch (e) {
            console.log(e);
            res.send({
                status: false,
                message: e.error,
                ongoing: [],
            });
        }
    },
}

module.exports = Services