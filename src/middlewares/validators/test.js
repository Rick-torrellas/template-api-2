const { body, header } = require("express-validator");
const UserTest = require("./../../models/UserTest");

const validatePost = () => {
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

const validateToken = () => {
  return header("core-access-token")
  .exists()
  .withMessage("No se proporciono ningun token")
  .bail()
  .isJWT()
  .withMessage("No se entrego un JWT valido")
}

const checkEmailPassword = async (req,res,next) => {
  const {email,password} = req.body
  const user = await UserTest.findOne({email});

  if (!user) {
    return res.status(404).send("The email doesn't exists");
} 
const validatePassword = await user.validatePassword(password);
if (!validatePassword) return res.status(401).json({
  auth: false,
  msg: "Invalid Password"
});
  req.test.user = user;
return next();
}

module.exports = {
  validatePost,
  validatePut,
  checkEmailPassword,
  validateSignin,
  validateToken,
  validateSignup
};
