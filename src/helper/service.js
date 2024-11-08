// fetchService
const axios = require('axios')

const Service = {
    fetchService: async (url) => {
        try {
            return await axios.get(url,{
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
                }
            });
        } catch (e) {
            return {
                status: e.response ? e.response.status : 500,
                message: e.message,
            };
        }
    },
};

module.exports = Service;
