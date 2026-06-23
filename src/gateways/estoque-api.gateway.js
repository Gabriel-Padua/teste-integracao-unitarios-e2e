export class EstoqueApiGateway {
  async temEstoque(idLivro) {
    // Simula um chamada a um servico externo
    const apiEndpoint = `https://livraria.com/api/livros/${idLivro}/estoque`;

    const resposta = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const sucesso = resposta.ok;
    return sucesso;
  }
}
