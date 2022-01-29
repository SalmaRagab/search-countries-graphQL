const UserController = require("../controllers/UserController");
const CountriesService = require("../services/CountriesService");

const countriesService = new CountriesService();
const userController = new UserController();

const Query = {
  login: (root, args) => userController.login(args.userName),
  countries: (root, args) => countriesService.getCountries(args.countryName),
};
module.exports = { Query };
