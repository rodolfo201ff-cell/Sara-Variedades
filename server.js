const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Configurações do Proprietário e da API WhatsApp
const TELEFONE_PROPRIETARIO = '5511999999999'; // Número no formato internacional
const WHATSAPP_API_URL = 'https://api.seu-provedor-whatsapp.com/send-message';
const WHATSAPP_API_TOKEN = 'SEU_TOKEN_DE_AUTENTICACAO';

// Função utilitária para disparar a mensagem no WhatsApp
async function enviarNotificacaoWhatsApp(mensagem) {
  try {
    await axios.post(
      WHATSAPP_API_URL,
      {
        number: TELEFONE_PROPRIETARIO,
        message: mensagem
      },
      {
        headers: {
          'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Notificação enviada ao WhatsApp do proprietário!');
  } catch (error) {
    console.error('Erro ao enviar mensagem no WhatsApp:', error.message);
  }
}

// Rota para processar a baixa de produto (compra ou alteração manual)
app.post('/api/produtos/dar-baixa', async (req, res) => {
  const { produtoId, quantidadeBaixa } = req.body;

  // 1. Busca o produto no Banco de Dados
  const produto = await BancoDeDados.buscarPorId(produtoId);

  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  // 2. Calcula o novo estoque e desativa se zerar
  const novoEstoque = Math.max(0, produto.estoque - quantidadeBaixa);
  const ativo = novoEstoque > 0;

  // 3. Atualiza o banco de dados imediatamente
  await BancoDeDados.atualizar(produtoId, {
    estoque: novoEstoque,
    ativo: ativo
  });

  // 4. Notifica o proprietário no WhatsApp se o estoque zerar ou ficar baixo
  if (novoEstoque === 0) {
    const mensagem = `🔴 *ATENÇÃO - PRODUTO FORA DE ESTOQUE!*\n\n` +
                     `📦 *Produto:* ${produto.nome}\n` +
                     `❌ Status: Removido do catálogo automaticamente.\n` +
                     `📲 Acesse o painel para atualizar a foto, valor ou recomputar o estoque.`;

    await enviarNotificacaoWhatsApp(mensagem);
  } else if (novoEstoque <= 2) {
    const mensagem = `⚠️ *ALERTA DE ESTOQUE BAIXO*\n\n` +
                     `📦 *Produto:* ${produto.nome}\n` +
                     `📊 Restam apenas *${novoEstoque}* unidade(s) no catálogo.`;

    await enviarNotificacaoWhatsApp(mensagem);
  }

  return res.json({
    sucesso: true,
    produto: produto.nome,
    novoEstoque: novoEstoque,
    statusCatalogo: ativo ? 'Visível' : 'Oculto (Fora de Estoque)'
  });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
