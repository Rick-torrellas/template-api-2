const express = require("express");
const router = express.Router();
const {test,testPost,getOne,edit,getAll,delete_, signup, me, signin} = require('./../controllers/test');
const { testPost: testPostValidator,testPut} = require("./../middlewares/validators/test.js");
const {test: testMidleware} = require("./../middlewares/test.js");
const {validate,notEmptyBody} = require("./../middlewares/validators");
const {authenticateToken} = require('./../middlewares/auth.js');

router
    .route("/")
        .get(testMidleware, test)
router
    .route("/post")
        .post(testPostValidator(),validate,testPost);
router
    .route("/get")
        .get(getAll);
router
    .route("/get/:id")
        .get(getOne);
router
    .route("/edit/:id")
        .put(testPut(),notEmptyBody,validate,edit);
router
    .route("/delete/:id")
        .delete(delete_);
router
    .route("/signup")
        .post(signup)
router
    .route("/signin")
        .post(signin)
router
    .route("/me")
        .get(authenticateToken, me)    

module.exports = router;