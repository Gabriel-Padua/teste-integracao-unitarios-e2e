import knex from 'knex';
export function criaConexaoDB(config) {
  console.debug(`Criando conexão com o banco de dados ${config.connection}...`);
  const connection = knex(config);

  connection[Symbol.dispose] = () => {
    console.log('Fechando conexão com o banco de dados...');
    return connection.destroy();
  };

  return connection;
}
