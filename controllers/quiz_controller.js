var models = require("../models/models.js");

/* GET /quizes/pregunta */
exports.pregunta = function(req, res) {
  models.Quiz.findAll().success(function(quiz) {
    res.render(
      "quizes/pregunta",
      { pregunta: quiz[0].pregunta}
    );
  });
};

/* GET /quizes/respuesta */
exports.respuesta = function(req, res) {
  models.Quiz.findAll().success(function(quiz) {
    var respuesta;
    if (req.query.respuesta && req.query.respuesta.toLowerCase() === quiz[0].respuesta.toLowerCase()) {
      respuesta = "Correcto!";
    }
    else {
      respuesta = "Incorrecto";
    }
    res.render(
      "quizes/respuesta",
      { respuesta: respuesta}
    );
  });
};
