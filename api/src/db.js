require('dotenv').config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

// Obtén las variables de entorno desde tu archivo .env
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

const sequelize = new Sequelize(
  DB_DATABASE, // Utiliza la variable de entorno DB_DATABASE para el nombre de la base de datos
  DB_USER,     // Utiliza la variable de entorno DB_USER para el usuario
  DB_PASSWORD, // Utiliza la variable de entorno DB_PASSWORD para la contraseña
  {
    host: DB_HOST,
    port: parseInt(DB_PORT), // Convierte DB_PORT a un número entero
    dialect: 'postgres', // Usa el dialecto 'postgres' para PostgreSQL
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexión (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos, por ejemplo, product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos, hacemos un destructuring
const { Videogame, Genre } = sequelize.models;

// Aquí vendrían las relaciones
// Product.hasMany(Reviews);
Videogame.belongsToMany(Genre, { through: "VideogameGenre" });
Genre.belongsToMany(Videogame, { through: "VideogameGenre" });

module.exports = {
  ...sequelize.models, // Para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // Para importar la conexión { conn } = require('./db.js');
};
