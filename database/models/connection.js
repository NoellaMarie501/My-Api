const { Sequelize, DataTypes } = require("sequelize");
const {connection} = require("../../constants");
const csv = require('csv-parser');
const fs = require('fs');
require('dotenv').config();

 const db = {};
// const databaseName = process.env.DATABASE;
// const dbDailect = process.env.DB_DIALECT
// const dbUser = process.env.DB_USER
// const dbPassword = process.env.DB_PASSWORD
// const host = process.env.HOST
// const port = process.env.PORT
 

// const sequelize = new Sequelize(

//   {
//     dialect: "sqlite",
//     storage: " /home/jorelmarc/my_basecamp.db",
//   }
// );

const sequelize = new Sequelize(connection.databaseName, connection.dbUser, connection.dbPassword, {
  host: connection.host,
  dialect: connection.dbDailect,
  port: connection.port
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//calling the model functions to execute table creation
db.users = require("./user.model.js")(sequelize, DataTypes);
db.animals = require("./animal.model")(sequelize, DataTypes);


  //users and animals
  db.users.hasMany(db.animals);
  db.animals.belongsTo(db.users);

//checking if database can connect
sequelize
  .authenticate()
  .then(() => {
   // console.log("== Data Base connection successfull===");
  })
  .catch((err) => {
    console.log("===Error in Data Base connection : " + err + " ====");
  });

//connecting to database
sequelize
  .sync()
  .then(() => {
   // console.log("== Data Base synchronised===");
  })
  .catch((err) => {
    console.log("===Error in Data Base synchronisation): " + err + " ====");
  });


module.exports = db;
