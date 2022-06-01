const express = require("express");
const router = express.Router();
const {
  authorsGet,
  authorUpdate,
  authorDelete,
  authorCreate,
  fetchAuthor,
  postsCreate,
} = require("./authors.controllers");

router.param("authorId", async (req, res, next, authorId) => {
  const author = await fetchAuthor(authorId, next);
  if (author) {
    req.author = author;
    next();
  } else {
    const err = new Error("Author Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", authorsGet);
router.post("/", authorCreate);

router.delete("/:authorId", authorDelete);

router.put("/:authorId", authorUpdate);

//addition
router.post("/:authorId/posts", postsCreate);

module.exports = router;
