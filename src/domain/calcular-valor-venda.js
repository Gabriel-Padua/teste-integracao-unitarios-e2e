const percentuais = {
  CARTAO_CREDITO: 0.05,
  CARTAO_DEBITO: 0.02,
  PIX: -0.05,
  BOLETO: 0,
  DINHEIRO: 0,
};

export function calcularValorVenda(valor, modoPagamento) {
  const percentual = percentuais[modoPagamento];

  if (percentual === undefined) {
    throw new Error(`Modo de pagamento inválido: ${modoPagamento}`);
  }

  return Math.round(Number(valor) * (1 + percentual));
}
