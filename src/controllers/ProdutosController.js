const prisma = require("../lib/prisma");

exports.ListarProdutos = async (req, res) => {
  try {
    const produtos = await prisma.produtos.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return res.render("index", {
      produtos,
      mensagem: null,
      form: null,
      pageTitle: "Produtos",
      activePage: "produtos",
    });
  } catch (erro) {
    console.log(erro);
    return res.status(500).send("Falha ao carregar produtos");
  }
};

exports.CadastrarProduto = async (req, res) => {
  const { nome, preco, quantidade } = req.body;

  try {
    const produtos = await prisma.produtos.findMany({
      orderBy: {
        id: "desc",
      },
    });

    if (!nome || !nome.trim() || preco === "" || quantidade === "") {
      return res.status(400).render("index", {
        produtos,
        mensagem: {
          tipo: "erro",
          texto: "Produto não cadastrado. Preencha todos os campos.",
        },
        form: { nome, preco, quantidade },
        pageTitle: "Produtos",
        activePage: "produtos",
      });
    }

    const precoConvertido = Number(preco);
    const quantidadeConvertida = Number(quantidade);

    if (!Number.isFinite(precoConvertido) || !Number.isInteger(quantidadeConvertida)) {
      return res.status(400).render("index", {
        produtos,
        mensagem: {
          tipo: "erro",
          texto: "Produto não cadastrado. Informe preço e quantidade válidos.",
        },
        form: { nome, preco, quantidade },
        pageTitle: "Produtos",
        activePage: "produtos",
      });
    }

    await prisma.produtos.create({
      data: {
        nome: nome.trim(),
        preco: precoConvertido,
        quantidade: quantidadeConvertida,
      },
    });

    return res.redirect("/produtos");
  } catch (erro) {
    console.log(erro);
    return res.status(500).send("Falha ao cadastrar produto");
  }
};
