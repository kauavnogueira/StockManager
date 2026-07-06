const express = require("express");
const ProdutosController = require("../controllers/ProdutosController");

const router = express.Router();

router.get("/", ProdutosController.ListarProdutos);
router.post("/", ProdutosController.CadastrarProduto);

module.exports = router;
