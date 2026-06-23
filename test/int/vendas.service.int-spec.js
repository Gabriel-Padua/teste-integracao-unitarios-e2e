import test, { describe, after, mock } from "node:test";
import conexao from "#db/singleton-connection.js";
import { criarLivro } from "#test/factories/livro.factory.js";
import { VendasServices } from "#services/vendas.service.js";
import assert from "node:assert";
import { assertMock } from "#test/utils/mock.assertions.js";
import { criarEditora } from "#test/factories/editora.factory.js";

describe("VendasService", () => {
  after(async () => {
    await conexao.destroy();
  });

  describe("registrarVenda", () => {
    test("Registra uma venda com sucesso e enviar email para editora ", async () => {
      //  Arrange

      const emailGatewayMock = {
        enviarEmail: mock.fn(), // Mock
      };

      const estoqueGatewayMock = {
        temEstoque: mock.fn(() => Promise.resolve(true)), // Stub
      };

      const sut = new VendasServices(
        conexao,
        emailGatewayMock,
        estoqueGatewayMock,
      );
      const editora = await criarEditora({
        email: "editora@teste.com",
      });
      const livro = await criarLivro({
        titulo: "Livro para venda",
        editora_id: editora.id,
      });

      //   Act

      const resposta = await sut.registrarVenda({
        idLivro: livro.id,
        modoPagamento: "PIX",
        valor: 100,
      });

      //   Assert

      assert.strictEqual(resposta.livro_id, livro.id);
      assert.strictEqual(resposta.valor, 95);
      assert.strictEqual(resposta.tipo_pagamento, "PIX");

      assertMock(emailGatewayMock.enviarEmail).wasCalledWith({
        destinatario: "editora@teste.com",
        remetente: "no-reply@livrario.com",
        assunto: "Nova venda registrada",
        mensagem:
          'Uma nova venda do livro "Livro para venda" foi registrada com valor de R$ 95',
      });
    });
    test("Lança um erro quando o livro não tem estoque disponível", async () => {
      //  Arrange

      const emailGatewayMock = {
        enviarEmail: mock.fn(), // Mock
      };

      const estoqueGatewayMock = {
        temEstoque: mock.fn(() => Promise.resolve(false)), // Stub
      };

      const sut = new VendasServices(
        conexao,
        emailGatewayMock,
        estoqueGatewayMock,
      );

      const livro = await criarLivro({
        titulo: "Livro para venda",
      });

      //   Act

      const resposta = () =>
        sut.registrarVenda({
          idLivro: livro.id,
          modoPagamento: "PIX",
          valor: 100,
        });

      //   Assert

      assert.rejects(resposta, {
        message: "Livro sem estoque disponivel",
      });
    });
  });
});
