import conexao from "#db/singleton-connection.js";
import { LivrosService } from "#src/services/livros.service.js";
import { criarLivro } from "#test/factories/livro.factory.js";
import assert from "node:assert";

import test, { after, beforeEach, describe } from "node:test";

describe("LivrosService", () => {
  const sut = new LivrosService(conexao);

  after(async () => {
    await conexao.destroy();
  });
  beforeEach(async () => {
    await conexao("livros").delete();
  });

  describe("listarLivros", () => {
    test("Retorna uma lista de livros", async () => {
      // Arrange
      const livro1 = await criarLivro({ titulo: "Livro de Teste 1" });
      const livro2 = await criarLivro({ titulo: "Livro de Teste 2" });

      //Act
      const resultado = await sut.listarLivros();

      //Assert
      assert.deepStrictEqual(resultado, [livro1, livro2]);
    });
    test("Retorna uma lista vazia quando não ha livros cadastrados", async () => {
      const resultado = await sut.listarLivros();

      assert.deepStrictEqual(resultado, []);
    });
  });

  describe("buscarLivroPorId", () => {
    test("Retorna Undefined quando o livro não existe", async () => {
      const resultado = await sut.pegarPeloId(989898);
      assert.strictEqual(resultado, undefined);
    });
    test("Retorna os dados do livro quando ele existe", async () => {
      const livro = await criarLivro({ titulo: "Livro Teste 3" });
      const resultado = await sut.pegarPeloId(livro.id);
      assert.deepStrictEqual(resultado, livro);
    });
  });
});
