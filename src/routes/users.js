const express = require("express");
const usersController = require("../controllers/users");
const authMiddleware = require("../middlewares/authMiddleware");
const hashMiddleware = require("../middlewares/hashMiddleware");
const router = express.Router();

router.get("", usersController.showAll);

router.get("/:id", usersController.show);

router.post("/register", usersController.register);

router.post("/login", usersController.authenticate)

router.put("", authMiddleware/* [authMiddleware, hashMiddleware] */, usersController.update);

router.put("/:id", authMiddleware, usersController.updateById);

router.delete("", authMiddleware, usersController.remove);

router.delete("/:id", authMiddleware, usersController.removeById);

module.exports = router;