const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const bodyParser = require("body-parser");

const { getBearerToken, verifyToken } = require("./middlewares/auth");
const schema = require("./schema/schema.js");
const LoginService = require("./services/LoginService.js");

require("dotenv").config();

const PORT = process.env.PORT || 3005;

const app = express();
app.use(bodyParser.json());

const loginService = new LoginService();

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
