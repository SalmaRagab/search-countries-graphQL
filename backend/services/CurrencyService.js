const axios = require("axios");
const config = process.env;

module.exports = class CurrencyService {
  async getCurrencyExchangeRate(currencyNames) {
    const endpoint = this.constructCurrencyChangeEndpoint(currencyNames);
    try {
      let response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  constructCurrencyChangeEndpoint(currencyNames) {
    const constantURLPart = `${config.FIXER_API_GET_LATEST_CURRENCY_CHANGE}?access_key=${config.FIXER_API_KEY}&base=${config.FIXER_BASE_CURRENCY}`;
    const url =
      constantURLPart +
      `&symbols=${currencyNames.join(",")},${config.DEFAULT_MAP_CURRENCY}`;
    return url;
  }
};
