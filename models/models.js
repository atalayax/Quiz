var path = require("path");

// Postgres DATABASE_URL = postgres://user:password@host:port/DATABASE_URL
// SQLite   DATABASE_IRL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

// Cargarl Modelo ORM
var Sequelize = require("sequelize");

// Usar DB SQLite
var sequelize = new Sequelize(
  DB_name,
  user,
  pwd,
  {
    dialect: dialect,
    protocol: protocol,
    port: port,
    host: host,
    storage: storage,
    omitNull: true
  }
);

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, "quiz"));

// Exportar la definición de tabla Quiz
exports.Quiz = Quiz;

// Inicializar BD
sequelize.sync().success(function() {
  Quiz.count().success(function(count) {
    if (count === 0) {
      Quiz.create({
        pregunta: "Capital de Italia?",
        respuesta: "roma"
      }).success(function() {
        console.log("Base de datos inicializada");
      });
    }
  });
});
