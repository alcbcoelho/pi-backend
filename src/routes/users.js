const express = require("express");
const {
  showAll,
  show,
  create,
  update,
  remove,
} = require("../controllers/users");
const router = express.Router();

router.get("", showAll);

router.get("/:id", show);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);

module.exports = router;
