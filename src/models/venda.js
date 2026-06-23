class Venda {
  static db;

  static configurarDB(db) {
    this.db = db;
  }

  static calcularValorFinal(valor, modoPagamento) {
    const percentual =
      {
        CARTAO_CREDITO: 0.05,
        CARTAO_DEBITO: 0.02,
        PIX: -0.05,
        BOLETO: 0,
        DINHEIRO: 0,
      }[modoPagamento] ?? 0;

    return Math.round(Number(valor) * (1 + percentual));
  }

  constructor({
    id,
    livro_id,
    idLivro,
    valor,
    tipo_pagamento,
    modoPagamento,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.livro_id = livro_id ?? idLivro;
    this.valor = valor;
    this.tipo_pagamento = tipo_pagamento ?? modoPagamento;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  async criar() {
    const [resultado] = await Venda.db("vendas").insert(this, "*");
    return resultado;
  }

  async salvar() {
    return this.criar();
  }
}

export default Venda;
