const { validationResult } = require('express-validator');


const validate = (req,res,next) => {

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ errors: errors.array() });
}

/**
 * Verifica que el req.body no este vacio
 */
const notEmptyBody = (req,res,next) => {
  const {body} = req
  const checkBody = Object.keys(body).length === 0;
  const errorMessage = {
    msg: "EL req.body esta vacio"
  }
  if (checkBody) {
    return res.status(400).send(errorMessage);
  }
  return next();
}

module.exports = {
    validate,
    notEmptyBody
}