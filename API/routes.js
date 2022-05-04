const router = require("express").Router();
const postController = require("./controllers/postController");
const commentController = require("./controllers/commentController");
const userController = require("./controllers/userController");
const categoryController = require("./controllers/categoryController");
const multer = require("./config/multer");
const auth = require("./middleware/auth");

router.get("/users", auth, userController.list);
router.post("/users", userController.create);
router.post("/users/login", userController.login);
router.get("/users/:id", userController.details);
router.put("/users/:id", auth, multer, userController.update);
router.delete("/users/:id", auth, userController.remove);

router.get("/posts", postController.list);
router.post("/posts", auth, multer, postController.create);
router.get("/posts/:id", postController.details);
router.delete("/posts/:id", auth, postController.remove);
router.put("/posts/:id", auth, multer, postController.update);

router.get("/posts/:id/comments", commentController.list);
router.post("/posts/:id/comments", auth, commentController.create);
router.delete("/comments/:id", auth, commentController.remove);
router.put("/comments/:id", auth, commentController.update);

router.get("/categories", categoryController.list);
router.get("/categories/:id", categoryController.details);
router.post("/categories", auth, multer, categoryController.create);
router.delete("/categories/:id", auth, categoryController.remove);
router.put("/categories/:id", auth, multer, categoryController.update);

module.exports = router;
