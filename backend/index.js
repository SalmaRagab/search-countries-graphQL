const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const bodyParser = require("body-parser");

const { getBearerToken, verifyToken } = require("./middlewares/auth");
const schema = require("./schema/schema.js");
const LoginService = require("./services/LoginService.js");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const loginService = new LoginService();

app.use(
  "/graphql",
  getBearerToken,
  verifyToken,
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.post("/login", (req, res) => {
  const user = loginService.login(req.body.userName);
  res.status(200).json(user);
});

app.listen(3005, () => {
  console.log("Server started on port 3005");
});
