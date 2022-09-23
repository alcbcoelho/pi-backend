const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("", usersController.showAll);

router.get("/:id", usersController.show);

router.post("/", usersController.create);

router.put("/:id", usersController.update);

router.delete("/:id", usersController.remove);

module.exports = router;