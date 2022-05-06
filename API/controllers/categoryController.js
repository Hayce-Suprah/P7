const Category = require("../models/Category");
const fs = require("fs");
const path = require("path");

// Retourne la liste des categories
const list = async (_, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .send(`Unable to retrieves the list of categories. Error : ${error}`);
  }
};

// Retourne le détails d'une categorie
const details = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res
      .status(500)
      .send(`Unable to retrieves the details of category. Error : ${error}`);
  }
};

// Créer une categorie dans la base de données et retourne la categorie
const create = async (req, res) => {
  try {
    const category = await Category.create({
      ...req.body,
      thumbnail: req.body.filename,
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).send(`Unable to create category. Error : ${error}`);
  }
};

// Supprime une categorie dans la base de données
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.role !== 1) {
      res.status(401).json("You are unauthorized to make this request");
    }
    const category = await Category.findByPk(id);
    await category.destroy();
    res.status(200).json("Category is deleted");
  } catch (error) {
    res.status(500).send(`Unable to remove category ${id}. Error : ${error}`);
  }
};

// Modifie une categorie dans la base de données et la retourne
const update = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.role !== 1) {
      res.status(401).json("You are unauthorized to make this request");
    }
    let category = await Category.findByPk(id);
    if (req.body.filename) {
      const picturePath = path.join(path.resolve("./"), category.thumbnail);
      if (!picturePath.includes("static")) {
        fs.unlinkSync(picturePath);
      }
      req.body.thumbnail = req.body.filename;
    }
    await category.update(req.body);
    category = await Category.findByPk(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).send(`Unable to update category ${id}. Error : ${error}`);
  }
};

module.exports = {
  list,
  create,
  remove,
  update,
  details,
};
