// fetchService
const axios = require('axios')

const Service = {
    fetchService: async (url) => {
        try {
            return await axios.get(url);
        } catch (e) {
            return {
                status: e.response ? e.response.status : 500,
                message: e.message,
            };
        }
    },
};

module.exports = Service;
