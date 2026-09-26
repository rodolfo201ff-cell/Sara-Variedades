document.getElementById("formProduto").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const estoque = document.getElementById("estoque").value;
  const descricao = document.getElementById("descricao").value;
  const fotoInput = document.getElementById("foto");

  const salvarNoStorage = (fotoBase64) => {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos.push({ nome, preco, estoque, descricao, foto: fotoBase64 });
    localStorage.setItem("produtos", JSON.stringify(produtos));
    alert("Produto salvo com sucesso!");
    location.reload();
  };

  if (fotoInput.files && fotoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => salvarNoStorage(e.target.result);
    reader.readAsDataURL(fotoInput.files[0]);
  } else {
    salvarNoStorage("");
  }
});

function carregarListaAdmin() {
  const lista = document.getElementById("listaAdmin");
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  lista.innerHTML = produtos.map((p, index) => `
    <div class="item-admin">
      <img src="${p.foto || 'https://via.placeholder.com/50'}" alt="${p.nome}">
      <div>
        <strong>${p.nome}</strong> - R$ ${parseFloat(p.preco).toFixed(2)} (${p.estoque} un)
      </div>
      <button class="btn-del" onclick="removerProduto(${index})">Excluir</button>
    </div>
  `).join("");
}

function removerProduto(index) {
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  produtos.splice(index, 1);
  localStorage.setItem("produtos", JSON.stringify(produtos));
  carregarListaAdmin();
}

document.addEventListener("DOMContentLoaded", carregarListaAdmin);
