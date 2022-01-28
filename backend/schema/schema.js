const graphql = require("graphql");
const CurrencyService = require("../services/CurrencyService");
const SearchService = require("../services/SearchService");
const CurrencyExchangeRateMapper = require("../mappers/CurrencyExchangeRateMapper");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
} = graphql;

const searchService = new SearchService();
const currencyService = new CurrencyService();
const currencyExchangeRateMapper = new CurrencyExchangeRateMapper();

const Currency = new GraphQLObjectType({
  name: "CurrencyItemType",
  fields: () => ({
    code: { type: GraphQLString },
    name: { type: GraphQLString },
    symbol: { type: GraphQLString },
    exchangeRateWithSEK: { type: GraphQLFloat },
  }),
});

const Country = new GraphQLObjectType({
  name: "CountryItemType",
  fields: () => ({
    name: { type: GraphQLString },
    currencies: { type: GraphQLList(Currency) },
    population: { type: GraphQLFloat },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "SearchByNameQueryType",
  fields: {
    countries: {
      args: {
        countryName: { type: GraphQLString },
      },
      type: GraphQLList(Country),
      async resolve(parent, args) {
        const countries = await searchService.search(args.countryName);
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
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
