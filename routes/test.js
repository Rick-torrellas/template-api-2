const express = require("express");
const router = express.Router();
const {test,testPost,getOne,edit,getAll,delete_} = require('./../controllers/test');

router
    .route("/")
        .get(test)
router
    .route("/post")
        .post(testPost);
router
    .route("/get")
        .get(getAll);
router
    .route("/get/:id")
        .get(getOne);
router
    .route("/edit/:id")
        .put(edit);
router
    .route("/delete/:id")
        .delete(delete_)
module.exports = router;