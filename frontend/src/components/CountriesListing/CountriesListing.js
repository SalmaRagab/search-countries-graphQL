import { Button, Form, Table } from "react-bootstrap";
import { useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import "./CountriesListing.css";

export default function CountriesListing() {
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState();
  const client = useApolloClient();

  const GET_COUNTRIES = gql`
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

  async function searchCountries() {
    if (countryName.trim() !== "") {
      console.log(
        `calling the search endpoint, with country name: ${countryName}`
      );
      const { data } = await client.query({
        query: GET_COUNTRIES,
        variables: { countryName },
      });
      setCountries(data.countries);
    }
  }

  return (
    <div>
      <div className="search">
        <Form.Control
          value={countryName}
          className="search-input"
          placeholder="Country name"
          onChange={(event) => setCountryName(event.target.value)}
        />
        <Button
          className="search-button"
          variant="primary"
          onClick={searchCountries}
        >
          Search
        </Button>
      </div>
      {countries ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Country Name</th>
              <th>Population</th>
              <th>Currencies</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => {
              return (
                <tr key="index">
                  <td>{country.name}</td>
                  <td>{country.population}</td>
                  <td>
                    {country.currencies.map((currency, currencyIndex) => {
                      return (
                        <p key="currencyIndex">
                          {currency.name} ({currency.symbol})
                          <br />1 {currency.name} ={" "}
                          {currency.exchangeRateWithSEK} SEK
                        </p>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <h3>No countries to show, type a name and start searching!</h3>
      )}
    </div>
  );
}
