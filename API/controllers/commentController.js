const Comment = require("../models/Comment");

// Retourne la liste des commentaires pour un article
const list = async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.findAll({ where: { postId: id } });
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .send(
        `Unable to retrieves the list of comments about post ${id}. Error : ${error}`
      );
  }
};

// Créer un commentaire dans la base de données et retourne le commentaire
const create = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.create({
      ...req.body,
      postId: id,
      userId: req.userId,
    });
    res.status(200).json(comment);
  } catch (error) {
    res
      .status(500)
      .send(`Unable to create comment for this post ${id}. Error : ${error}`);
  }
};

// Supprime un commentaire de la base de données
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id, { include: ["post"] });
    if (
      req.role !== 1 &&
      req.userId.toString() !== comment.userId.toString() &&
      req.userId.toString() !== comment.postId.userId.toString()
    ) {
      res.status(401).json("You are not authorized to make this action");
    } else {
      await comment.destroy();
      res.status(200).json("Comment is deleted");
    }
  } catch (error) {
    res
      .status(500)
      .send(`Unable to remove this comment ${id}. Error : ${error}`);
  }
};

// Modifie un commentaire de la base de données et retourne le commentaire
const update = async (req, res) => {
  const { id } = req.params;
  try {
    let comment = await Comment.findByPk(id, { include: ["postId"] });
    if (req.userId.toString() !== comment.userId.toString()) {
      res.status(401).json("You are not authorized to make this action");
    }
    await Comment.update(req.body, { where: { id: id } });
    comment = await Comment.findByPk(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).send(`Unable to update comment ${id}. Error : ${error}`);
  }
};

module.exports = {
  list,
  create,
  remove,
  update,
};
