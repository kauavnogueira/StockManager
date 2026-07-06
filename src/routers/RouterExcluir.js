const express = require("express");
const excluirControllers = require("../controllers/excluirControllers");

const router = express.Router();

router.delete("/:id/excluir", excluirControllers.ExcluirProduto);

module.exports = router;
