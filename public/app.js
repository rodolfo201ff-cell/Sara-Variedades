async function carregarProdutos() {
  const res = await fetch('/api/produtos');
  const produtos = await res.json();

  const container = document.getElementById('catalogo');
  container.innerHTML = '';

  // Filtra apenas os produtos com estoque disponível (> 0)
  const produtosDisponiveis = produtos.filter(p => p.estoque > 0);

  if (produtosDisponiveis.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">Nenhum produto disponível no momento.</p>';
    return;
  }

  produtosDisponiveis.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.foto}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p>${p.descricao}</p>
      <div class="preco">R$ ${p.preco.toFixed(2)}</div>
      <button onclick="comprar(${p.id})">Comprar / Dar Baixa</button>
    `;
    container.appendChild(card);
  });
}

async function comprar(id) {
  const res = await fetch('/api/produtos/dar-baixa', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, quantidade: 1 })
  });

  const data = await res.json();
  if (data.sucesso) {
    alert('Compra realizada! O estoque foi atualizado.');
    carregarProdutos(); // Atualiza a tela imediatamente
  } else {
    alert(data.erro || 'Erro ao processar compra.');
  }
}

carregarProdutos();
