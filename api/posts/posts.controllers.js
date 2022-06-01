const Post = require("../../models/Post");
const Tag = require("../../models/Tag");

exports.fetchPost = async (postId, next) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    next(error);
  }
};
/*
exports.postsCreate = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};
*/

exports.postsDelete = async (req, res) => {
  try {
    await Post.findByIdAndRemove({ _id: req.post.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsUpdate = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.post.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsGet = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("author").populate("tags");
    res.json(posts);
  } catch (error) {
    next(error);
  }
};
///:postId/:tagId
exports.tagPostAdd = async (req, res) => {
  try {
    const { tagId } = req.params;
    await Post.findByIdAndUpdate(req.post.id, {
      $push: { tags: tagId },
    });
    await Tag.findByIdAndUpdate(tagId, {
      $push: { posts: req.post.id },
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
