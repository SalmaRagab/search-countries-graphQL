import { Button, Form, Table } from "react-bootstrap";
import { useState } from "react";
import "./CountriesListing.css";

export default function CountriesListing() {
  let countries = [
    {
      name: "Egypt",
      population: 102334403,
      currencies: [
        {
          name: "Egyptian pound",
          symbol: "£",
        },
        {
          name: "Euro",
          symbol: "€",
        },
      ],
    },
    {
      name: "Germany",
      population: 83240525,
      currencies: [
        {
          name: "Euro",
          symbol: "€",
        },
      ],
    },
  ];

  const [countryName, setCountryName] = useState("");

  function search() {
    if (countryName.trim() !== "") {
      console.log(
        `calling the search endpoint, with country name: ${countryName}`
      );
      // call endpoint
      setCountryName("");
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
        <Button className="search-button" variant="primary" onClick={search}>
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
                        <li key="currencyIndex">
                          {currency.name}({currency.symbol})
                        </li>
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
