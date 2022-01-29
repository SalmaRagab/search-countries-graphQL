import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries($countryName: String!) {
    countries(countryName: $countryName) {
      name
      population
      currencies {
        code
        name
        symbol
        exchangeRateWithSEK
      }
    }
  }
`;

export const LOGIN = gql`
  query Login($userName: String!) {
    login(userName: $userName) {
      userName
      token
    }
  }
`;
