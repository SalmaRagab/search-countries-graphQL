const {
  SchemaDirectiveVisitor,
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");
const jwt = require("jsonwebtoken");

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args) {
      // extract bearerHeader from context
      const { bearerHeader } = args[2];
      if (!bearerHeader) {
        throw new ForbiddenError(
          "Please first signup, and then add your token in the request headers in order to perform the request!"
        );
      }
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      try {
        const decoded = jwt.verify(bearerToken, process.env.TOKEN_KEY);
        return resolve.apply(this, args);
      } catch (err) {
        throw new AuthenticationError("Invalid token");
      }
    };
  }
}

module.exports = IsAuthenticatedDirective;
