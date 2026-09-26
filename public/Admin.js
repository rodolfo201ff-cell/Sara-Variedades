const form = document.getElementById('formProduto');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('id', document.getElementById('prodId').value);
  formData.append('nome', document.getElementById('nome').value);
  formData.append('preco', document.getElementById('preco').value);
  formData.append('estoque', document.getElementById('estoque').value);
  formData.append('descricao', document.getElementById('descricao').value);

  const fotoInput = document.getElementById('foto');
  if (fotoInput.files[0]) {
    formData.append('foto', fotoInput.files[0]);
  }

  await fetch('/api/produtos', {
    method: 'POST',
    body: formData
  });

  form.reset();
  document.getElementById('prodId').value = '';
  carregarProdutosAdmin();
});

async function carregarProdutosAdmin() {
  const res = await fetch('/api/produtos');
  const produtos = await res.json();

  const container = document.getElementById('listaAdmin');
  container.innerHTML = '';

  produtos.forEach(p => {
    const div = document.createElement('div');
    div.className = 'item-admin';
    div.innerHTML = `
      <img src="${p.foto}" alt="${p.nome}">
      <div>
        <strong>${p.nome}</strong><br>
        R$ ${p.preco.toFixed(2)} | Qtd: ${p.estoque}
      </div>
      <button class="btn-del" onclick="deletar(${p.id})">Excluir</button>
    `;
    container.appendChild(div);
  });
}

async function deletar(id) {
  if (confirm('Deseja excluir este produto?')) {
    await fetch(`/api/produtos/${id}`, { method: 'DELETE' });
    carregarProdutosAdmin();
  }
}

carregarProdutosAdmin();
