const axios = require('axios');

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
    return `${process.env.REST_COUNTRIES_SEARCH_BY_NAME_ENDPOINT}/${countryName}?fields=${process.env.DEFAULT_FIELDS_TO_RETRIEVE}`
  }
}
