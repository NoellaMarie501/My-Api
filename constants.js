require('dotenv').config();
const secret = "My BaseCamp";
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  PARTIAL_CONTENT: 206
};
const PATH = "/resources/uploads/"
let __basedir = __dirname;

// const connection = {
//  databaseName : process.env.DATABASE,
//  dbDailect : process.env.DB_DIALECT,
//  dbUser : process.env.DB_USER,
//  dbPassword : process.env.DB_PASSWORD,
//  host : process.env.HOST,
//  port : process.env.PORT
// }




const connection = {
  databaseName :"my_api",
  dbDailect :"mysql",
  dbUser :"root",
  dbPassword : "root",
  host : "localhost" ,
  port : 3306
 }
//console.log(connection)

module.exports = { secret, HTTP_STATUS, __basedir, PATH, connection };
