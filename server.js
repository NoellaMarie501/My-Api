require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const host = "localhost";
const UsersController = require("./apiCore/controllers/users.controller");
const AnimalsController = require("./apiCore/controllers/animals.controller");
const cors = require("cors"); //Cross-Origin Resource Sharing (CORS)
//var serveIndex = require("serve-index");

app.use(cors("*")); //enabling connection from another domain or server such as the front end
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("resources/uploads"));
//app.use('/resources', serveIndex(path.join(__dirname, 'resources/')));
app.use("/users", UsersController);
app.use("/animals", AnimalsController);
app.get("/", function (req, res) {
  res.send("Welcome");
});

app.listen(PORT, host, () => {
   console.log(`listening on port = ${PORT}`);
});

module.exports = app;
