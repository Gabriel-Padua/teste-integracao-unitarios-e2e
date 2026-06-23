import { describe, test, after } from "node:test";
import request from "supertest";
import { criarAppTeste } from "#test/utils/create-test-app.js";
import conexao from "#db/singleton-connection.js";
// import { assert } from "node:console";
import assert from "node:assert";
import { criarLivro } from "#test/factories/livro.factory.js";

describe("Buscar livro por ID", () => {
  const app = criarAppTeste();
  after(async () => {
    await conexao.destroy();
  });

  test("Retorna os dados de um livro existente (200).", async () => {
    //PRIMEIRO - CADASTRAR para garantir id valido
    const livro = await criarLivro();

    // SEGUNDO - Buscamos livro por ID
    await request(app)
      .get(`/livros/${livro.id}`)
      .expect(200)
      .expect((response) => {
        // TERCEIRO - Verificamos se os dados retornados estão corretos

        const dadosResposta = response.body;
        assert.strictEqual(dadosResposta.id, livro.id);
        assert.strictEqual(dadosResposta.titulo, livro.titulo);
        assert.strictEqual(dadosResposta.paginas, livro.paginas);
      });
  });

  test("Retorna um erro quando o livro não existe (404).", async () => {
    await request(app)
      .get("/livros/9898989")
      .expect(404)
      .expect((response) => {
        const codigoErro = response.body.type;
        assert.strictEqual(codigoErro, "NOT_FOUND");
      });
  });
});
