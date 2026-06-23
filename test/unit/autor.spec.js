import test, { describe } from "node:test";
import Autor from "#models/autor.js";
import assert from "node:assert";

describe("Autor", () => {
  describe("constructor", () => {
    test("Cria uma instancia de Autor com todos campos", () => {
      // Arrange
      const dadosDoAutor = {
        id: 1,
        nome: "C. S. Lewis",
        nacionalidade: "Britânica",
        created_at: "2026-06-01T00:00:00.000Z",
        updated_at: "2026-06-01T00:00:00.000Z",
      };

      //Act
      const autor = new Autor(dadosDoAutor);

      // Assert

      assert.strictEqual(autor.id, dadosDoAutor.id);
      assert.strictEqual(autor.nome, dadosDoAutor.nome);
      assert.strictEqual(autor.nacionalidade, dadosDoAutor.nacionalidade);
      assert.strictEqual(autor.created_at, dadosDoAutor.created_at);
      assert.strictEqual(autor.updated_at, dadosDoAutor.updated_at);
    });
    test("Cria uma instancia de Autor com campos opcionais faltando", () => {
      //Arrange
      const dadosDoAutor = {
        id: 1,
        nome: "C.S. Lewis",
        nacionalidade: "Britânica",
      };
      //Act
      const newAutor = new Autor(dadosDoAutor);
      //Assert
      assert.strictEqual(newAutor.id, dadosDoAutor.id);
      assert.strictEqual(newAutor.nome, dadosDoAutor.nome);
      assert.strictEqual(newAutor.nacionalidade, dadosDoAutor.nacionalidade);
      assert(typeof newAutor.created_at === "string");
      assert(typeof newAutor.updated_at === "string");
    });
  });

  describe("pegarAutores", () => {
    test("Retorna uma lista de autores", async () => {
      //Arrange

      const mockedDb = {
        select: () => {
          return {
            from: () => Promise.resolve(autoresEsperados),
          };
        },
      };

      Autor.configurarDB(mockedDb);

      const autoresEsperados = [
        {
          id: 1,
          nome: "C. S. Lewis",
          nacionalidade: "Britânica",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      // ACT

      const autoresDoBanco = await Autor.pegarAutores();

      //ASSERT

      assert.deepStrictEqual(autoresDoBanco, autoresEsperados);
    });
  });
});
