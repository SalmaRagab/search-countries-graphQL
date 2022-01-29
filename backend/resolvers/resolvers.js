const CountryController = require("../controllers/CountryController");
const UserController = require("../controllers/UserController");

const countryController = new CountryController();
const userController = new UserController();

const Query = {
  login: (root, args) => userController.login(args.userName),
  countries: (root, args) => countryController.getCountries(args.countryName),
};
module.exports = { Query };
