const Post = require("../models/Post");
const fs = require("fs");
const path = require("path");

// Retourne la liste des articles
const list = async (_, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ all: true, nested: true }],
    });
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .send(`Unable to retrieves the list of posts. Error : ${error}`);
  }
};

// Créer un poste dans la base de données et retourne l'article
const create = async (req, res) => {
  try {
    const post = await Post.create({
      ...req.body,
      userId: req.userId,
      thumbnail: req.body.filename,
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).send(`Unable to create post. Error : ${error}`);
  }
};

// Retourne le détails d'un article
const details = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id, { include: ["comments"] });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).send(`Unable to find post ${id}. Error : ${error}`);
  }
};

// Supprime un article dans la base de données
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (req.userId.toString() !== post.userId.toString()) {
      res.status(401).json("You are not authorized to make this action");
    }
    if (post.thumbnail) {
      fs.unlinkSync(path.join(path.resolve("./"), post.thumbnail));
    }
    await post.destroy();
    res.status(200).json("Post is deleted");
  } catch (error) {
    res.status(500).send(`Unable to remove post ${id}. Error : ${error}`);
  }
};

// Modifie un article dans la base de données et le retourne
const update = async (req, res) => {
  const { id } = req.params;
  try {
    let post = await Post.findByPk(id);
    if (req.userId.toString() !== post.userId.toString()) {
      res.status(401).json("You are not authorized to make this action");
    }
    if (req.body.filename) {
      const picturePath = path.join(path.resolve("./"), post.thumbnail);
      if (!picturePath.includes("static")) {
        fs.unlinkSync(picturePath);
      }
      req.body.thumbnail = req.body.filename;
    }
    await Post.update(req.body, { where: { id: id } });
    post = await Post.findByPk(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).send(`Unable to update post ${id}. Error : ${error}`);
  }
};

module.exports = {
  list,
  create,
  details,
  remove,
  update,
};
