const graphql = require('graphql');
const SearchService = require('../services/SearchService');

const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLSchema } = graphql;

const searchService = new SearchService();

const Currency = new GraphQLObjectType({
    name: 'CurrencyItemType',
    fields: () => ({
        code: { type: GraphQLString },
        name: { type: GraphQLString },
        symbol: { type: GraphQLString },
    })
})

const Country = new GraphQLObjectType({
    name: 'CountryItemType',
    fields: () => ({
        name: { type: GraphQLString },
        currencies: { type: GraphQLList(Currency) },
        population: { type: GraphQLFloat },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'SearchByNameQueryType',
    fields: {
        countries: {
            args: {
                countryName: { type: GraphQLString }
            },
            type: GraphQLList(Country),
            resolve(parent, args){
                const result = searchService.search(args.countryName);
                return result;
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});