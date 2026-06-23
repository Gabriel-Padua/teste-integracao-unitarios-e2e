import test, { after, describe } from "node:test";
import { LivrosController } from "#controllers/livros.controller.js";
import conexao from "#db/singleton-connection.js";
import { criarLivro } from "#test/factories/livro.factory.js";
import { assertMock } from "#test/utils/mock.assertions.js";
import { mock } from "node:test";

describe("LivrosController", () => {
  after(async () => {
    await conexao.destroy();
  });

  const sut = new LivrosController(conexao);

  describe("listarLivros", () => {
    test("Retorna um alista de livros", async () => {
      //Arrange
      const livro = await criarLivro({ titulo: "Livro Teste" });
      const req = {};
      const resSpy = {
        status: mock.fn(() => resSpy),
        json: mock.fn(() => resSpy),
        send: mock.fn(() => resSpy),
      };
      
      // Act
      await sut.listarLivros(req, resSpy);

      // Arrange
      assertMock(resSpy.status).wasCalledWith(200);
      assertMock(resSpy.send).wasCalledWith([livro]);
    });
  });
  describe("buscarLivroPorId", () => {});
  describe("cadastrarLivro", () => {});
});
