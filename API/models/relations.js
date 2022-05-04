const Post = require("./Post");
const Comment = require("./Comment");
const User = require("./User");
const Category = require("./Category");

// Relation entre les articles et les commentaires
Post.hasMany(Comment, {
  onDelete: "CASCADE",
  hooks: true,
});
Comment.belongsTo(Post);

// Relation entre les articles et les utilisateurs
User.hasMany(Post, {
  onDelete: "CASCADE",
  hooks: true,
});
Post.belongsTo(User);

// Relation entre les articles et les categories
Category.hasMany(Post, {
  onDelete: "CASCADE",
  hooks: true,
});
Post.belongsTo(Category);

// Relation entre les commentaires et les utilisateurs
User.hasMany(Comment, {
  onDelete: "CASCADE",
  hooks: true,
});
Comment.belongsTo(User);
