const express = require("express");
const songsController = require("../controllers/songs");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", songsController.showAllOrFilter);

router.get("/:id", songsController.show);

router.post("/", authMiddleware, songsController.create);

router.put("/:id", authMiddleware, songsController.update);

router.delete("/:id", authMiddleware, songsController.remove);

module.exports = router;