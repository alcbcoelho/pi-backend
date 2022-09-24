const express = require("express");
const { showAll, show, create, update, remove } = require("../controllers/playlists");
const router = express.Router();

let idGen = 0;

// GET
router.get("/", showAll);
router.get("/:id", show);

// POST
router.post("/", create);

// PUT
router.put("/:id", update);

// DELETE
router.delete("/:id", remove);

module.exports = router;