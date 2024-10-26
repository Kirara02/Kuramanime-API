const axios = require('axios')

const Service = {
    fetchService: async (url, res) => {
        try {
            const response = await axios.get(url)

            return new Promise((resolve, reject) => {
                if(response.status === 200) resolve(response)
                reject(response)
            })
        }catch (e) {
            res.send({
                "status" : false,
                "code" : e.code,
                "message" : e.message
            })
        }
    }
}

module.exports = Service