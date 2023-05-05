const express = require("express");
const router = express.Router();
const {test,testPost,getOne,edit,getAll,delete_, signup, me, signin} = require('./../controllers/test');
const { validatePost_, validatePut_, validateSignup_, validateSignin_, validateToken_} = require("./../middlewares/validators/test.js");
const {test: testMidleware,initTestObject} = require("./../middlewares/test.js");
const { checkSecretToken, checkEmailPassword, authenticateToken_} = require('../middlewares/auth.js');

router.use(initTestObject);

const root_ = [testMidleware,test];
router
    .route("/")
        .get(root_);
const post_ = [validatePost_,testPost];
router
    .route("/post")
        .post(post_);
router
    .route("/get")
        .get(getAll);
router
    .route("/get/:id")
        .get(getOne);
const editOneTest_ = [validatePut_,edit];
router
    .route("/edit/:id")
        .put(editOneTest_);
router
    .route("/delete/:id")
        .delete(delete_);
const signup_ = [validateSignup_,checkSecretToken,signup];
router
    .route("/signup")
        .post(signup_);
const signin_ = [validateSignin_,checkSecretToken,checkEmailPassword,signin];
router
    .route("/signin")
        .post(signin_);
const acessMe_ = [validateToken_,authenticateToken_,me]
router
    .route("/me")
        .get(acessMe_);    

module.exports = router;