// fetchService
const axios = require('axios')

const Service = {
    fetchService: async (url) => {
        try {
            return await axios.get(url,{
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
                    'Accept': 'application/json',
                    // 'Accept-Encoding': 'gzip, deflate, br, zstd',
                    'Accept-Language': 'en-US,en;q=0.9,ja;q=0.8,id;q=0.7,ru;q=0.6',
                    'Cache-Control': 'no-cache',
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
