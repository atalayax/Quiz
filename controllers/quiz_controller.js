var models = require("../models/models.js");

/* Autoload - factoriza el código si la ruta incluye :quizId */
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(function(quiz) {
    if(quiz) {
      req.quiz = quiz;
      next();
    }
    else {
      next(new Error("No existe quizId = " + quizId));
    }
  }).catch(function(error) {
    next(error);
  });
};

/* GET /quizes */
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quizes) {
    res.render(
      "quizes/index",
      { quizes: quizes}
    );
  }).catch(function(error) {
    next(error);
  });
};

/* GET /quizes/:id */
exports.pregunta = function(req, res) {
  res.render(
    'quizes/pregunta',
    { quiz: req.quiz }
  );
};

/* GET /quizes/:id/respuesta */
exports.respuesta = function(req, res) {
  var resultado = "Incorrecto";
  if (req.query.respuesta && req.query.respuesta.toLowerCase() === quiz.respuesta.toLowerCase()) {
    resultado = "Correcto!";
  }
  res.render(
    "quizes/respuesta",
    { quiz: req.quiz, respuesta: resultado}
  );
};
