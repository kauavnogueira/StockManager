import { Router } from "express";
import {
  cadastrarProduto,
  editarProduto,
  excluirProduto,
  listarProdutos,
} from "../controllers/produtosController";

const router = Router();

router.get("/", listarProdutos);
router.post("/", cadastrarProduto);
router.put("/:id", editarProduto);
router.delete("/:id", excluirProduto);

export default router;
