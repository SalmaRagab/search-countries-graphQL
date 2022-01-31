import "./App.css";
import CountriesListing from "./components/CountriesListing/CountriesListing";
import { Signup } from "./components/Signup/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/countries" element={<CountriesListing />} />
          <Route path="/" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
