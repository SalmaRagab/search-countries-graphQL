const CurrencyExchangeRateMapper = require("../mappers/CurrencyExchangeRateMapper");
const CurrencyService = require("../services/CurrencyService");
const SearchService = require("../services/SearchService");

const searchService = new SearchService();
const currencyService = new CurrencyService();
const currencyExchangeRateMapper = new CurrencyExchangeRateMapper();

module.exports = class CountryController {
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
