const express = require("express");
const { showAllOrFilter, show, create, update, remove } = require("../controllers/songs");
const router = express.Router();

router.get("/", showAllOrFilter);

router.get("/:id", show);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);

module.exports = router;