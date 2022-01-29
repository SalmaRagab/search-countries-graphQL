const CurrencyExchangeRateMapper = require("../mappers/CurrencyExchangeRateMapper");
const CurrencyService = require("./CurrencyService");
const SearchService = require("./SearchService");

const searchService = new SearchService();
const currencyService = new CurrencyService();
const currencyExchangeRateMapper = new CurrencyExchangeRateMapper();

module.exports = class CountriesService {
  async getCountries(countryName) {
    const countries = await searchService.search(countryName);
    if (countries) {
      let currenciesCodesSet = countries.map((country) =>
        country.currencies.map((currency) => currency.code)
      );
      const currencyExchangeRates =
        await currencyService.getCurrencyExchangeRate(currenciesCodesSet);
      const result =
        currencyExchangeRateMapper.mapExchangeRateToDefaultCurrency(
          countries,
          currencyExchangeRates
        );
      return result;
    } else {
      return [];
    }
  }
};
