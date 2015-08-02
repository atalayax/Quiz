var path = require("path");

// Cargarl Modelo ORM
var Sequelize = require("sequelize");

// Usar DB SQLite
var sequelize = new Sequelize(
  null,
  null,
  null,
  { dialect: "sqlite", storage: "quiz.sqlite"}
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
