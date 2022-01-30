const CountryController = require("../controllers/CountryController");
const UserController = require("../controllers/UserController");
const { getRateLimiterErrorMessage } = require("../middlewares/rateLimiter");

const countryController = new CountryController();
const userController = new UserController();

const Query = {
  countries: async (parent, { countryName }, context, info) => {
    const errorMessage = await getRateLimiterErrorMessage(
      parent,
      args,
      context,
      info
    );
    if (errorMessage) throw new Error(errorMessage);
    return countryController.getCountries(countryName);
  },
};

const Mutation = {
  signup: (root, { userName }) => userController.signup(userName),
};
module.exports = { Query, Mutation };
