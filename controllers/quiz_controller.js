/* GET /quizes/pregunta */
exports.pregunta = function(req, res) {
  res.render('quizes/pregunta', { pregunta: "¿Capital de Italia?"});
};

/* GET /quizes/respuesta */
exports.respuesta = function(req, res) {
  var respuesta;
  if (req.query.respuesta && req.query.respuesta.toLowerCase() === "roma") {
    respuesta = "Correcto!";
  }
  else {
    respuesta = "Incorrecto";
  }
  res.render('quizes/respuesta', { respuesta: respuesta });
};
