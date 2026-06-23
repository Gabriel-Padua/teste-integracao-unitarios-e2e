import { describe, test, after } from "node:test";
import request from "supertest";
import { criarAppTeste } from "#test/utils/create-test-app.js";
import conexao from "#db/singleton-connection.js";
import assert from "node:assert";

describe("Cadastrar Autor", () => {
  const app = criarAppTeste();

  after(async () => {
    await conexao.destroy();
  });

  test("Retorna os dados do autor cadastrados quando os dados são válidos (201).", async () => {
    // Enviar uma request POST /autores

    const resposta = await request(app)
      .post("/autores")
      .send({
        nome: "H.P. Lovecraft Novo",
        nacionalidade: "Ingles",
      })
      .expect(201)
      .expect((response) => {
        const dadosResposta = response.body.content;
        assert.strictEqual(typeof dadosResposta.id, "number");
        assert.strictEqual(dadosResposta.nome, "H.P. Lovecraft Novo");
        assert.strictEqual(dadosResposta.nacionalidade, "Ingles");
      })
      .then((response) => response.body.content);

    const autorNoBanco = await conexao("autores")
      .where({ id: resposta.id })
      .first();

    assert.ok(autorNoBanco);
    assert.strictEqual(autorNoBanco.nome, "H.P. Lovecraft Novo");
    assert.strictEqual(autorNoBanco.nacionalidade, "Ingles");

    // Verificar se o status code é 201
    // Verificar se o corpo da resposta está correto
  });

  test("Retorna um erro ao tentar cadastrar um autor com dados inválidos (400)", async () => {
    await request(app)
      .post("/autores")
      .send({
        nome: "",
        nacionalidade: "",
      })
      .expect(400)
      .expect((response) => {
        const codigoErro = response.body.type;
        assert.strictEqual(codigoErro, "INVALID_DATA");

        //Resistencia a Refatoracao
      });
  });
});
