document.addEventListener("DOMContentLoaded", () => {
  const catalogo = document.getElementById("catalogo");
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  if (produtos.length === 0) {
    catalogo.innerHTML = "<p>Nenhum produto cadastrado no momento.</p>";
    return;
  }

  catalogo.innerHTML = produtos.map(p => `
    <div class="card">
      <img src="${p.foto || 'https://via.placeholder.com/180'}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p class="preco">R$ ${parseFloat(p.preco).toFixed(2)}</p>
      <p><small>Estoque: ${p.estoque}</small></p>
      <p>${p.descricao || ''}</p>
      <button onclick="comprar('${p.nome}')">Comprar via WhatsApp</button>
    </div>
  `).join("");
});

function comprar(nome) {
  const fone = "5591980000000"; // Substitua pelo seu número do WhatsApp com DDD
  const mensagem = encodeURIComponent(`Olá! Tenho interesse no produto: ${nome}`);
  window.open(`https://wa.me/${fone}?text=${mensagem}`, "_blank");
}
