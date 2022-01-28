import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries($countryName: String!) {
    countries(countryName: $countryName) {
      name
      population
      currencies {
        name
        symbol
        exchangeRateWithSEK
      }
    }
  }
`;
