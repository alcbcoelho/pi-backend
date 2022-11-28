const express = require("express");
const playlistsController = require("../controllers/playlists");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", playlistsController.showAll);

router.get("/:id", playlistsController.show);

router.post("/", authMiddleware, playlistsController.create);

router.put("/:id", authMiddleware, playlistsController.update);

router.delete("/:id", authMiddleware, playlistsController.remove);

module.exports = router;