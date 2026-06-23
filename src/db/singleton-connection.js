import { databaseConfig } from '#config/database.config.js';
import { criaConexaoDB } from './connection.factory.js';

const conexao = criaConexaoDB(databaseConfig);

export default conexao;
