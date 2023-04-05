const express = require("express");
const router = express.Router();
const {test,testPost,getOne,edit,getAll,delete_, signup, me, signin} = require('./../controllers/test');
const { validatePost,validatePut, checkEmailPassword,validateSignin, validateToken, validateSignup} = require("./../middlewares/validators/test.js");
const {test: testMidleware} = require("./../middlewares/test.js");
const {validate,notEmptyBody} = require("./../middlewares/validators");
const {authenticateToken, checkSecretToken} = require('../middlewares/tokens.js');

router
    .route("/")
        .get(testMidleware, test)
router
    .route("/post")
        .post(validatePost(),validate,testPost);
router
    .route("/get")
        .get(getAll);
router
    .route("/get/:id")
        .get(getOne);
router
    .route("/edit/:id")
        .put(validatePut(),notEmptyBody,validate,edit);
router
    .route("/delete/:id")
        .delete(delete_);
router
    .route("/signup")
        .post(validateSignup(),
        validate, 
        checkSecretToken,
        signup
    )
router
    .route("/signin")
        .post(
        validateSignin(),
        validate,
        checkSecretToken,
        checkEmailPassword,
        signin
    )
router
    .route("/me")
        .get(
            validateToken(),
            validate, 
            checkSecretToken,
            authenticateToken, 
            me
        )    

module.exports = router;