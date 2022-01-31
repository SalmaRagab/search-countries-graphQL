const CountryController = require("../controllers/CountryController");
const UserController = require("../controllers/UserController");

const countryController = new CountryController();
const userController = new UserController();

const Query = {
  countries: async (parent, { countryName }) =>
    countryController.getCountries(countryName),
};

const Mutation = {
  signup: (root, { userName }) => userController.signup(userName),
};
module.exports = { Query, Mutation };
