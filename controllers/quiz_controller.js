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
  if (req.query.search) {
    var search = "%" + req.query.search.replace(" ", "%") + "%";
    models.Quiz.findAll({where: ["pregunta like ?", search]}).then(function(quizes) {
      res.render(
        "quizes/index",
        { quizes: quizes, errors: []}
      );
    }).catch(function(error) {
      next(error);
    });
  }
  else {
    models.Quiz.findAll().then(function(quizes) {
      res.render(
        "quizes/index",
        { quizes: quizes, errors: []}
      );
    }).catch(function(error) {
      next(error);
    });
  }
};

/* GET /quizes/:id */
exports.pregunta = function(req, res) {
  res.render(
    'quizes/pregunta',
    { quiz: req.quiz, errors: [] }
  );
};

/* GET /quizes/:id/respuesta */
exports.respuesta = function(req, res) {
  var resultado = "Incorrecto";
  if (req.query.respuesta && req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase()) {
    resultado = "Correcto!";
  }
  res.render(
    "quizes/respuesta",
    { quiz: req.quiz, respuesta: resultado, errors: []}
  );
};

/* GET /quizes/nueva */
exports.nueva = function(req, res) {
  var quiz = models.Quiz.build(
    {pregunta: "", respuesta: ""}
  );
  res.render('quizes/nueva', {quiz: quiz, errors: []});
};

/* POST /quizes/crear */
exports.crear = function(req, res) {
  var quiz = models.Quiz.build(req.body.quiz);
  var errors = quiz.validate();
  if (errors) {
    var errorArray = [];
    for (var prop in errors) {
      errorArray.push({message: errors[prop]});
    }
    res.render("quizes/nueva", {quiz: quiz, errors: errorArray});
  }
  else {
    quiz
    .save(
      {fields: ["pregunta", "respuesta"]}
    )
    .then(function() {
      res.redirect('/quizes');
    });
  }
};
