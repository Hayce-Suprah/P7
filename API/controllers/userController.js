const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// Retourne la liste des utilisateurs
const list = async (req, res) => {
  try {
    if (req.role !== 1) {
      res.status(401).json("You are not authorized to make this action");
    }
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(`Unable to find users. Error : ${error}`);
  }
};

// Créer un utilisateur et retourne ses informations de connexions
const create = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    // Si l'image n'est pas dans le body, on en choisit une par defaut
    let picture;
    if (!req.body.filename) {
      picture = `/uploads/static/user.svg`;
    } else {
      picture = req.body.filename;
    }

    const user = await User.create({ ...req.body, picture, password: hash });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(`Unable to create user. Error : ${error}`);
  }
};

// Retourne le token d'un utilisateur
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      const isSamePassword = await bcrypt.compare(password, user.password);
      if (isSamePassword) {
        res.status(200).json({
          user,
          token: jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_TOKEN,
            {
              expiresIn: "24h",
            }
          ),
        });
      } else {
        res.status(401).json("Email and/or password are incorrect");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Retourne le détails d'un utilisateur
const details = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      include: [{ all: true, nested: true }],
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(`Unable to find user ${id}. Error : ${error}`);
  }
};

// Modifie un utilisateur dans la base de données
const update = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findByPk(id);
    if (req.userId.toString() !== user.id.toString()) {
      res.status(401).json("You are not authorized to make this action");
    }
    if (req.body.filename) {
      const picturePath = path.join(path.resolve("./"), user.picture);
      if (!picturePath.includes("/uploads/static/")) {
        fs.unlinkSync(picturePath);
      }
    }

    await User.update(req.body, { where: { id: id } });
    user = await User.findByPk(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(`Unable to find user ${id}. Error : ${error}`);
  }
};

// Supprime un utilisateur dans la base de données
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (req.userId.toString() !== user.id.toString() && req.role !== 1) {
      res.status(401).json("You are not authorized to make this action");
    }
    if (user.picture !== "/uploads/static/user.svg") {
      fs.unlinkSync(path.join(__dirname, user.picture));
    }
    await user.destroy();
    res.status(200).json("User is deleted");
  } catch (error) {
    res.status(500).send(`Unable to remove post ${id}. Error : ${error}`);
  }
};

module.exports = { create, list, login, remove, details, update };
