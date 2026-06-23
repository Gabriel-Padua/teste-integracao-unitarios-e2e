import { calcularValorVenda } from "#domain/calcular-valor-venda.js";
import assert from "node:assert";
import test, { describe } from "node:test";

describe("calcularValorVenda", () => {
  const casosTeste = [
    {
      valor: 100,
      modoPagamento: "CARTAO_CREDITO",
      valorEsperado: 105,
    },
    {
      valor: 100,
      modoPagamento: "CARTAO_DEBITO",
      valorEsperado: 102,
    },
    {
      valor: 100,
      modoPagamento: "PIX",
      valorEsperado: 95,
    },
    {
      valor: 100,
      modoPagamento: "BOLETO",
      valorEsperado: 100,
    },
    {
      valor: 100,
      modoPagamento: "DINHEIRO",
      valorEsperado: 100,
    },
  ];

  casosTeste.forEach(({ valor, modoPagamento, valorEsperado }) => {
    test(`Quando o valor é ${valor} e o modo de pagamento é ${modoPagamento}, o valor final deve ser ${valorEsperado}`, () => {
      const valorFinal = calcularValorVenda(valor, modoPagamento);
      assert.strictEqual(valorFinal, valorEsperado);
    });
  });
  // test("Adiciona um taxa de 5% para CARTAO_CREDITO", () => {
  //   //ARRANGE

  //   const valor = 100;
  //   const modoPagamento = "CARTAO_CREDITO";

  //   //ACT

  //   const valorFinal = calcularValorVenda(valor, modoPagamento);

  //   // ASSERT

  //   assert.strictEqual(valorFinal, 105);
  // });
  // test("Adiciona um taxa de 2% para CARTAO_DEBITO", () => {
  //   const valor = 100;
  //   const modoPagamento = "CARTAO_DEBITO";

  //   //ACT

  //   const valorFinal = calcularValorVenda(valor, modoPagamento);

  //   // ASSERT

  //   assert.strictEqual(valorFinal, 102);
  // });
  // test("Aplica desconto de 5% para PIX", () => {
  //   const valor = 100;
  //   const modoPagamento = "PIX";

  //   //ACT

  //   const valorFinal = calcularValorVenda(valor, modoPagamento);

  //   // ASSERT

  //   assert.strictEqual(valorFinal, 95);
  // });
  // test("Não adiciona taxa para BOLETO", () => {
  //   const valor = 100;
  //   const modoPagamento = "BOLETO";

  //   //ACT

  //   const valorFinal = calcularValorVenda(valor, modoPagamento);

  //   // ASSERT

  //   assert.strictEqual(valorFinal, 100);
  // });
  // test("Não adiciona taxa para DINHERO", () => {
  //   const valor = 100;
  //   const modoPagamento = "DINHEIRO";

  //   //ACT

  //   const valorFinal = calcularValorVenda(valor, modoPagamento);

  //   // ASSERT

  //   assert.strictEqual(valorFinal, 100);
  // });

  test("Lança erro para modo de pagamento invalido", () => {
    // Arrange
    const valor = 100;
    const modoPagamento = "CHEQUE";

    //ACT

    const callbackQueLancaErro = () => calcularValorVenda(valor, modoPagamento);

    // Assert

    assert.throws(callbackQueLancaErro, {
      message: `Modo de pagamento inválido: ${modoPagamento}`,
    });
  });
});
