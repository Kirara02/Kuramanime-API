// fetchService
const axios = require('axios')

const Service = {
    fetchService: async (url) => {
        try {
            return await axios.get(url,{
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Cache-Control': 'no-cache',
                    'Referer': 'https://www.google.com/', // Bisa coba ubah ke referer yang sesuai
                    'Connection': 'keep-alive',
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
