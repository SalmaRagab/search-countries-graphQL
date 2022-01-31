const fs = require("fs");
const resolvers = require("./resolvers/resolvers");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { createRateLimitDirective } = require("graphql-rate-limit");
const IsAuthenticatedDirective = require("./directives/IsAuthenticatedDirective");

require("dotenv").config();

const rateLimitDirective = createRateLimitDirective({
  identifyContext: (ctx) => ctx.id,
});

const corsOptions = {
  origin: process.env.FRONTEND_HOST,
  optionsSuccessStatus: 200,
};

async function startApolloServer() {
  const typeDefs = gql(
    fs.readFileSync("./schema/schema.graphql", { encoding: "utf8" })
  );
  const app = express();

  const server = new ApolloServer({
    schemaDirectives: {
      isAuthenticated: IsAuthenticatedDirective,
      rateLimit: rateLimitDirective,
    },
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      bearerHeader: req.headers["authorization"],
    }),
  });
  app.use(bodyParser.json());
  app.use(cors(corsOptions));

  await server.start();

  server.applyMiddleware({ app });

  app.use((req, res) => {
    res.status(200);
    res.send("Countries application is up and running!");
    res.end();
  });

  await new Promise((resolve) =>
    app.listen({ port: process.env.PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
  return { server, app };
}

startApolloServer();
