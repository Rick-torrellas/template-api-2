const { body, header } = require("express-validator");
const {validate,notEmptyBody} = require('./index.js');


const validatePost = () => {
  return body("title")
    .exists()
    .withMessage("El titulo no existe")
    .bail()
    .isString()
    .withMessage("El title no es un string")
    .bail()
    .notEmpty()
    .withMessage("EL titulo esta vacio")
    .bail()
    .trim()
    .escape();
};
const validatePost_ = [notEmptyBody,validatePost(),validate];


const validatePut = () => {
  return body("title")
    .if(body("title").exists())
    .isString()
    .withMessage("El title no es un string")
    .notEmpty()
    .withMessage("EL titulo esta vacio")
    .trim()
    .escape()
};
const validatePut_ = [notEmptyBody,validatePut(),validate];

const validateSignin = () => {
  return [
    body("email")
    .exists()
    .withMessage("No se introdujo el email")
    .isEmail()
    .withMessage("No se ingreso un email valido")
    .normalizeEmail(),
    body("password")
    .exists()
    .withMessage("El password no existe")
    .trim()
    .escape()
  ]
}
const validateSignin_ = [notEmptyBody,validateSignin(),validate];

const validateSignup = () => {
  return [
    body("email")
    .exists()
    .withMessage("No se introdujo el email")
    .bail()
    .isEmail()
    .withMessage("No se ingreso un email valido")
    .normalizeEmail(),
    body("password")
    .exists({
      checkNull: true
    })
    .withMessage("El password no existe o es null")
    .bail()
    .notEmpty()
    .withMessage("El password esta vacio")
    .bail()
    .trim()
    .escape(),
    body("username")
    .exists({
      checkNull: true
    })
    .withMessage("El username no existe o es null")
    .bail()
    .notEmpty()
    .withMessage("El username esta vacio")
    .bail()
    .trim()
    .escape()
  ]
}

const validateSignup_ = [notEmptyBody,validateSignup(),validate];

const validateToken = () => {
  return header("core-access-token")
  .exists()
  .withMessage("No se proporciono ningun token")
  .bail()
  .isJWT()
  .withMessage("No se entrego un JWT valido")
}

const validateToken_ = [validateToken(),validate];



module.exports = {
  validatePost_,
  validatePut_,
  validateSignin_,
  validateToken_,
  validateSignup_
};
