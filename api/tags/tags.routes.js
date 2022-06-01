const express = require("express");
const router = express.Router();
const { tagsGet, tagsCreate } = require("./tags.controllers");

router.get("/", tagsGet);
//router.post("/", postsCreate);

router.post("/", tagsCreate);
module.exports = router;
