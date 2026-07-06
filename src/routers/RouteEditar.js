const express = require("express");
const EditarControllers = require("../controllers/EditarControllers");

const router = express.Router();

router.get("/:id/editar", EditarControllers.FormularioEditarProduto);
router.put("/:id", EditarControllers.EditarProduto);

module.exports = router;
