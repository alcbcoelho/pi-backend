const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Crie uma playlist com suas músicas favoritas ~ 🎶");
});

module.exports = router;