const express = require("express");
const excluirControllers = require("../controllers/excluirControllers");

const router = express.Router();

router.post("/:id/excluir", excluirControllers.ExcluirProduto);

module.exports = router;
