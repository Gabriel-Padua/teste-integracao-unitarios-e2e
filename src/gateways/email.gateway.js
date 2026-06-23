export class EmailGateway {
    async enviarEmail({remetente, destinatario, assunto, mensagem }){
        console.log(`Enviando Email de ${remetente} para ${destinatario} com assunto de ${assunto} e a mensagem ${mensagem}`);
        
    }
}