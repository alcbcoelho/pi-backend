const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/users");

router.get("", usuariosController.listar);

router.get("/:id", usuariosController.exibir);

router.post("/", usuariosController.criar);

router.put("/:id", usuariosController.atualizar);

router.delete("/:id", usuariosController.remover);

module.exports = router;
