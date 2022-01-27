const axios = require("axios");
const config = process.env;

module.exports = class SearchService {
  async search(countryName) {
    const endpoint = this.constructSearchEndpoint(countryName);
    try {
      let response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  constructSearchEndpoint(countryName) {
    return `${config.REST_COUNTRIES_SEARCH_BY_NAME_ENDPOINT}/${countryName}?fields=${config.DEFAULT_FIELDS_TO_RETRIEVE}`;
  }
};
