//We import dotenv to get all secret info
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import { Sequelize } from "sequelize"; //Import the ORM
import fs from "fs";
import path from "path"; //provides a way to interact with file paths (such as extracting the file name or extension)

//This data comes from dotenv
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

//Now we create and config our db

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  },
);

//__filename is a special global variable in Node.js that represents the path to the file containing
//the code that is being executed.
//By passing __filename to path.basename, the file name is extracted from
// the full file path and assigned to the constant basename.
const basename = path.basename(__filename); // So, we asigned te name of the file to the constant basename

const modelDefiners: any[] = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
Object.assign(sequelize.models, Object.fromEntries(capsEntries));

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Recipe, Diet } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Recipe.belongsToMany(Diet, { through: "RecipesDiet" });
Diet.belongsToMany(Recipe, { through: "RecipesDiet" });
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importarte la conexión { conn } = require('./db.js');
};
