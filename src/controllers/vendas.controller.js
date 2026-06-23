import Venda from "#models/venda.js";

export class VendasController {
  constructor(databaseConnection, vendasService) {
    Venda.configurarDB(databaseConnection);
    this.vendasService = vendasService;
  }

  async registrarVenda(req, res) {
    const { idLivro, valor, modoPagamento } = req.body;

    if (!idLivro || valor === undefined || !modoPagamento) {
      return res.status(400).json({
        message: "Dados inválidos para cadastro de venda.",
        type: "INVALID_DATA",
      });
    }

    try {
      const resposta = await this.vendasService.registrarVenda({
        idLivro,
        modoPagamento,
        valor,
      });

      const livro = await Venda.db("livros").where({ id: idLivro }).first();
      const editora = await Venda.db("editoras")
        .where({ id: livro?.editora_id })
        .first();

      if (editora?.email) {
        console.info(
          `E-mail enviado para ${editora.email} sobre a venda do livro ${livro?.titulo ?? idLivro}.`,
        );
      }

      return res.status(201).json({
        message: "venda registrada",
        content: {
          id: resposta.id,
          idLivro: resposta.livro_id,
          valor: resposta.valor,
          modoPagamento: resposta.tipo_pagamento,
          createdAt: resposta.created_at,
          updatedAt: resposta.updated_at,
        },
      });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}
