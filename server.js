require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const REDIS_PORT = process.env.REDIS_PORT;
const host = process.env.HOST;
const UsersController = require("./apiCore/controllers/users.controller");
const AnimalsController = require("./apiCore/controllers/animals.controller");
const cors = require("cors"); //Cross-Origin Resource Sharing (CORS)
const redis = require("redis");

// Create Redis client
const redisClient = redis.createClient({ host: host, port: REDIS_PORT });

// Event listeners for Redis client
(() => {
  redisClient.on("ready", () => console.log(`Redis client ready`));
  redisClient.on("error", (error) =>
    console.log(`Redis client error: ${error}`)
  );
  redisClient.on("connect", () =>
    console.log(`Connected to Redis on Port: ${REDIS_PORT}`)
  );
  redisClient.on("reconnect", () => console.log(`Redis client reconnected`));
})();

app.use(cors("*")); // Enabling connection from another domain or server such as the front end
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", UsersController);
app.use("/animals", AnimalsController);
app.get("/", function (req, res) {
  res.send("Welcome");
});

app.listen(PORT, host, () => {
  console.log(`Listening on port = ${PORT}`);
});

module.exports = app;
