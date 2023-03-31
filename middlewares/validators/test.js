const { body } = require("express-validator");

const testPost = () => {
  return body("title", "Error en el title")
    .exists()
    .withMessage("El titulo no existe")
    .isString()
    .withMessage("El title no es un string")
    .notEmpty()
    .withMessage("EL titulo esta vacio")
    .trim()
    .escape();
};

const testPut = () => {
  return body("title")
    .if(body("title").exists())
    .isString()
    .withMessage("El title no es un string")
    .notEmpty()
    .withMessage("EL titulo esta vacio")
    .trim()
    .escape()
};

module.exports = {
  testPost,
  testPut
};
