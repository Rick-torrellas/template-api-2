const express = require("express");
const router = express.Router();
const {test,testPost,getOne,edit,getAll,delete_} = require('./../controllers/test');
const { testPost: testPostValidator,testPut} = require("./../middlewares/validators/test.js");
const {test: testMidleware} = require("./../middlewares/test.js");
const {validate,notEmptyBody} = require("./../middlewares/validators");

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

module.exports = router;