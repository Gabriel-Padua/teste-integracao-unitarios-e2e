class Editora {
  static db;

  static configurarDB(db) {
    this.db = db;
  }

  constructor({ id, nome, cidade, email, created_at, updated_at }) {
    this.id = id;
    this.nome = nome;
    this.cidade = cidade;
    this.email = email;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  static async pegarEditoras() {
    return this.db.select('*').from('editoras');
  }

  static async pegarPeloId(id) {
    const resultado = await this.db.select('*').from('editoras').where({ id });
    return resultado[0];
  }

  async criar() {
    const resultado = await Editora.db('editoras').insert(this, '*');
    return resultado[0];
  }

  async atualizar(id) {
    // o update retorna a quantidade de rows atualizados e não o objeto do registro atualizado
    await Editora.db('editoras')
      .where({ id })
      .update({ ...this, updated_at: new Date().toISOString() });

    return Editora.db.select('*').from('editoras').where({ id });
  }

  static async excluir(id) {
    // o del retorna a quantidade de rows deletados
    await this.db('editoras').where({ id }).del();
  }

  async salvar() {
    // verificar se o id existe no banco
    // se não existir é create
    // se existir é update
    if (this.id) {
      const resultado = await this.atualizar(this.id);
      return resultado;
    }
    const resultado = await this.criar();
    return resultado;
  }

  static async pegarLivrosPorEditora(editoraId) {
    return this.db('livros').where({ editora_id: editoraId });
  }
}

export default Editora;
