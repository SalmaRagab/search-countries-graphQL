import { Button, Form, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import "./CountriesListing.css";
import { GET_COUNTRIES } from "../../graphQL/queries";

export default function CountriesListing() {
  const client = useApolloClient();
  let navigate = useNavigate();

  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState();
  const [amount, setAmount] = useState("");
  const [disableAmountField, setDisableAmountField] = useState(true);

  useEffect(() => {
    if (countries === undefined || countries.length === 0) {
      setDisableAmountField(true);
    }
  }, [countries]);

  function reset() {
    setCountryName("");
    setCountries([]);
    setAmount("");
    setDisableAmountField(true);
  }

  async function searchCountries() {
    if (countryName.trim() !== "") {
      console.log(
        `calling the search endpoint, with country name: ${countryName}`
      );
      try {
        const { data } = await client.query({
          query: GET_COUNTRIES,
          variables: { countryName },
        });
        setDisableAmountField(false);
        setCountries(data.countries);
      } catch (error) {
        alert("You need to login first!");
        navigate("../login", { replace: true });
      }
    }
  }

  return (
    <div>
      <div className="search">
        <Form.Control
          value={countryName}
          className="text-input"
          placeholder="Country name"
          onChange={(event) => setCountryName(event.target.value)}
        />
        <Button className="button" variant="primary" onClick={searchCountries}>
          Search
        </Button>
      </div>
      <div className="search">
        <Form.Control
          disabled={disableAmountField}
          value={amount}
          className="text-input"
          placeholder="Amount in SEK"
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>
      <Button className="button" variant="danger" onClick={reset}>
        RESET
      </Button>
      {countries && countries.length > 0 ? (
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
                          <br />
                          {amount > 0 && (
                            <span className="amount-coversion">
                              {amount} SEK ={" "}
                              {amount / currency.exchangeRateWithSEK}{" "}
                              {currency.name}
                            </span>
                          )}
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
