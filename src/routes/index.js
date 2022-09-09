const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("<h1>Faça uma playlist com suas músicas favoritas!</h1>");
});

module.exports = router;