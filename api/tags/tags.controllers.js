const Tag = require("../../models/Tag");

exports.tagsGet = async (req, res) => {
  try {
    const tags = await Tag.find().populate("posts");
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

exports.tagsCreate = async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    next(error);
  }
};
