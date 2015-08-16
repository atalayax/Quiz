var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

/* Autoload de comandos con :quizID */
router.param("quizId", quizController.load);

/* Definición de ruta de quizes */
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.pregunta);
router.get('/quizes/:quizId(\\d+)/respuesta', quizController.respuesta);
router.get('/quizes/nueva', quizController.nueva);
router.post('/quizes/crear', quizController.crear);

/* GET página de créditos */
router.get('/autor', function(req, res) {
  res.render('autor', { title: 'Autor', errors: []});
});

module.exports = router;
