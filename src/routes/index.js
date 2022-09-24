const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Crie uma playlist com suas músicas favoritas ~ 🎶");
});

module.exports = router;