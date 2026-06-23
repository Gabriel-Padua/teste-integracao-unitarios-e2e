import { describe, test, after, beforeEach } from "node:test";
import request from "supertest";
import { criarAppTeste } from "#test/utils/create-test-app.js";
import conexao from "#db/singleton-connection.js";
// import { assert } from "node:console";
// import assert from "node:assert";

describe("Listar Autores", () => {
  const app = criarAppTeste();
  after(async () => {
    await conexao.destroy();
  });

  beforeEach(async () => {
    await conexao("autores").delete();
  });

  test("Retorna uma lista contendo os dados dos autores quando existe ao menos um autor cadastrado (200).", async () => {
    const hpLovecraft = await request(app)
      .post("/autores")
      .send({
        nome: "H.P Lovecraft",
        nacionalidade: "Americana",
      })
      .expect(201)
      .then((response) => response.body.content);

    const isaacAsimov = await request(app)
      .post("/autores")
      .send({
        nome: "Isaac Asimov",
        nacionalidade: "Americana",
      })
      .expect(201)
      .then((data) => data.body.content);

    await request(app)
      .get("/autores")
      .expect([hpLovecraft, isaacAsimov])
      .expect(200);
  });

  test("Retorna uma lista vazia quando não existem autores cadastrados (200).", async () => {
    await request(app).get("/autores").expect(200).expect([]);
  });
});
