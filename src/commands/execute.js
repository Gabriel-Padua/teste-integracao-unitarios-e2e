import { limparBanco } from './limpar-banco.command.js';

async function executar(nomeFuncao) {
  switch (nomeFuncao) {
    case 'limpar-banco':
      await limparBanco();
      break;
    default:
      console.error(`Função "${nomeFuncao}" não encontrada.`);
      process.exit(1);
  }
}

const nomeFuncao = process.argv[2];
if (!nomeFuncao) {
  console.error('Por favor, forneça o nome da função a ser executada.');
  process.exit(1);
}

executar(nomeFuncao);
