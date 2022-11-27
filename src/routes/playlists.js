const express = require("express");
const playlistsController = require("../controllers/playlists");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// GET
router.get("/", playlistsController.showAll);

router.get("/:id", playlistsController.show);

// POST
router.post("/", authMiddleware, playlistsController.create);

// PUT
router.put("/:id", authMiddleware, playlistsController.update);

// DELETE
router.delete("/:id", authMiddleware, playlistsController.remove);

module.exports = router;