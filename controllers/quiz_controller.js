var models = require("../models/models.js");

/* GET /quizes */
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quizes) {
    res.render(
      "quizes/index",
      { quizes: quizes}
    );
  });
};

/* GET /quizes/:id */
exports.pregunta = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    res.render(
      'quizes/pregunta',
      { quiz: quiz }
    );
  })
};

/* GET /quizes/:id/respuesta */
exports.respuesta = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    var respuesta;
    if (req.query.respuesta && req.query.respuesta.toLowerCase() === quiz.respuesta.toLowerCase()) {
      respuesta = "Correcto!";
    }
    else {
      respuesta = "Incorrecto";
    }
    res.render(
      "quizes/respuesta",
      { quiz: quiz, respuesta: respuesta}
    );
  });
};
