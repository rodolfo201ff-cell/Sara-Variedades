function gerarProdutos() {
  const categorias = [
    { nome: "Utilidades Domésticas", itens: [{ n: "Pote Hermético 1L", p: 14.90 }, { n: "Jogo de Copos Vidro", p: 29.90 }, { n: "Garrafa Térmica 1L", p: 59.90 }] },
    { nome: "Papelaria", itens: [{ n: "Caderno 10 Matérias", p: 22.90 }, { n: "Kit Canetas Azul", p: 12.00 }, { n: "Mochila Escolar", p: 79.90 }] },
    { nome: "Eletrônicos", itens: [{ n: "Carregador USB-C", p: 35.00 }, { n: "Fone Bluetooth", p: 69.90 }, { n: "Caixa de Som", p: 89.90 }] },
    { nome: "Beleza", itens: [{ n: "Escova Polvo", p: 16.00 }, { n: "Kit Pincéis Maquiagem", p: 28.90 }, { n: "Espelho LED", p: 39.90 }] },
    { nome: "Brinquedos", itens: [{ n: "Jogo de Uno", p: 24.90 }, { n: "Cubo Mágico 3x3", p: 19.90 }, { n: "Lousa LCD 8.5", p: 29.90 }] }
  ];

  let lista = [];
  let id = 1;

  for (let i = 1; i <= 24; i++) {
    categorias.forEach(cat => {
      cat.itens.forEach(item => {
        const estoqueSatis = Math.floor(Math.random() * 66) + 15;
        lista.push({
          id: id++,
          nome: `${item.n} (Mod. ${i})`,
          preco: item.p,
          estoque: estoqueSatis,
          categoria: cat.nome,
          foto: `https://via.placeholder.com/200?text=${encodeURIComponent(item.n)}`
        });
      });
    });
  }
  return lista;
}

function renderizar() {
  const catalogo = document.getElementById("catalogo");
  let produtos = JSON.parse(localStorage.getItem("produtos"));

  if (!produtos || produtos.length === 0) {
    produtos = gerarProdutos();
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }

  catalogo.innerHTML = produtos.map(p => `
    <div class="card">
      <img src="${p.foto}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p class="preco">R$ ${parseFloat(p.preco).toFixed(2)}</p>
      <p><small>Estoque: ${p.estoque} un</small></p>
      <button onclick="comprar('${p.nome}')">Comprar no WhatsApp</button>
    </div>
  `).join("");
}

function comprar(nome) {
  const fone = "5591980000000"; // Insira seu número com DDD
  const msg = encodeURIComponent(`Olá! Quero comprar: ${nome}`);
  window.open(`https://wa.me/${fone}?text=${msg}`, "_blank");
}

document.addEventListener("DOMContentLoaded", renderizar);
