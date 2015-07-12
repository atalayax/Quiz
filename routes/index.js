var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/* GET página de pregunta */
router.get('/quizes/pregunta', quizController.pregunta);

/* GET página de respuesta */
router.get('/quizes/respuesta', quizController.respuesta);

module.exports = router;
