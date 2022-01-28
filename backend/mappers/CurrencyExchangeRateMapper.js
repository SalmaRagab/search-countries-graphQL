/**
 * This is a map having the ratios to the default currency defined in the environment file
 * The key is the foreign currency code and the value is the ratio to the default currency
 * Map<string (currency code), number (ratio to default currency)>
 */
var foreignToDefaultCurrencyRatioMap = new Map();
module.exports = class CurrencyExchangeRateMapper {
  mapExchangeRateToDefaultCurrency(
    countries,
    currencies,
    defaultCurrency = process.env.DEFAULT_MAP_CURRENCY
  ) {
    const defaultCurrencyValue = currencies.rates[defaultCurrency];
    countries.forEach((country) => {
      country.currencies.forEach((currency) => {
        currency.exchangeRateWithSEK = this.getForeignToDefaultCurrencyRatio(
          currency.code,
          currencies.rates[currency.code],
          defaultCurrencyValue
        );
      });
    });
    return countries;
  }

  getForeignToDefaultCurrencyRatio(
    foreignCurrencyCode,
    foreignCurrencyValue,
    defaultCurrencyValue
  ) {
    if (foreignToDefaultCurrencyRatioMap.has(foreignCurrencyCode)) {
      return foreignToDefaultCurrencyRatioMap.get(foreignCurrencyCode);
    } else {
      const foreignToDefaultCurrencyRatio =
        defaultCurrencyValue / foreignCurrencyValue;
      foreignToDefaultCurrencyRatioMap.set(
        foreignCurrencyCode,
        foreignToDefaultCurrencyRatio
      );
      return foreignToDefaultCurrencyRatio;
    }
  }
};
