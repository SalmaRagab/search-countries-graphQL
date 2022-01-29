const CountriesService = require("../services/CountriesService");
const UserService = require("../services/UserService");

const countriesService = new CountriesService();
const userService = new UserService();

const Query = {
  login: (root, args) => userService.login(args.userName),
  countries: (root, args) => countriesService.getCountries(args.countryName),
};
module.exports = { Query };
