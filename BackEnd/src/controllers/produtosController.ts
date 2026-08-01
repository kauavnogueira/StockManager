import type { Request, Response } from "express";
import prisma from "../lib/prisma";
import { converterId, type ProdutoBody, validarProduto } from "./produtoValidation";

type ProdutoParams = { id: string };

function erroInterno(response: Response, error: unknown): void {
  console.error(error);
  response.status(500).json({ mensagem: "Erro interno do servidor." });
}

export async function listarProdutos(_request: Request, response: Response): Promise<void> {
  try {
    const produtos = await prisma.produtos.findMany({ orderBy: { id: "desc" } });
    response.json(produtos);
  } catch (error) {
    erroInterno(response, error);
  }
}

export async function cadastrarProduto(
  request: Request<object, object, ProdutoBody>,
  response: Response,
): Promise<void> {
  const validacao = validarProduto(request.body);
  if ("erro" in validacao) {
    response.status(400).json({ mensagem: validacao.erro });
    return;
  }

  try {
    const produto = await prisma.produtos.create({ data: validacao.data });
    response.status(201).json(produto);
  } catch (error) {
    erroInterno(response, error);
  }
}

export async function editarProduto(
  request: Request<ProdutoParams, object, ProdutoBody>,
  response: Response,
): Promise<void> {
  const id = converterId(request.params.id);
  if (id === null) {
    response.status(400).json({ mensagem: "Identificador inválido." });
    return;
  }

  const validacao = validarProduto(request.body);
  if ("erro" in validacao) {
    response.status(400).json({ mensagem: validacao.erro });
    return;
  }

  try {
    const existente = await prisma.produtos.findUnique({ where: { id } });
    if (!existente) {
      response.status(404).json({ mensagem: "Produto não encontrado." });
      return;
    }
    const produto = await prisma.produtos.update({ where: { id }, data: validacao.data });
    response.json(produto);
  } catch (error) {
    erroInterno(response, error);
  }
}

export async function excluirProduto(
  request: Request<ProdutoParams>,
  response: Response,
): Promise<void> {
  const id = converterId(request.params.id);
  if (id === null) {
    response.status(400).json({ mensagem: "Identificador inválido." });
    return;
  }

  try {
    const existente = await prisma.produtos.findUnique({ where: { id } });
    if (!existente) {
      response.status(404).json({ mensagem: "Produto não encontrado." });
      return;
    }
    await prisma.produtos.delete({ where: { id } });
    response.status(204).send();
  } catch (error) {
    erroInterno(response, error);
  }
}
