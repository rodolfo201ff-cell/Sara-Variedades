// Lista base para geração automática dos 350 produtos
function gerarProdutosIniciais() {
  const categorias = [
    {
      nome: "Utilidades Domésticas",
      itens: [
        { n: "Pote Plástico Hermético 1L", p: 14.90 },
        { n: "Jogo de Copos de Vidro (6 unid)", p: 29.90 },
        { n: "Organizador de Geladeira", p: 18.50 },
        { n: "Escorredor de Pratos Inox", p: 45.00 },
        { n: "Lixeira com Pedal 5L", p: 32.90 },
        { n: "Kit Utensílios de Silicone (5 peças)", p: 49.90 },
        { n: "Garrafa Térmica 1L", p: 59.90 }
      ]
    },
    {
      nome: "Papelaria e Escritório",
      itens: [
        { n: "Caderno Espiral 10 Matérias", p: 22.90 },
        { n: "Caneta Esferográfica Azul (Caixa com 10)", p: 12.00 },
        { n: "Kit Bloco de Notas Adesivas", p: 8.50 },
        { n: "Organizador de Mesa Acrílico", p: 25.00 },
        { n: "Mochila Escolar Resistente", p: 79.90 },
        { n: "Estojo Multiuso com Zíper", p: 15.00 },
        { n: "Calculadora de Mesa 12 Digítos", p: 34.90 }
      ]
    },
    {
      nome: "Eletrónicos e Acessórios",
      itens: [
        { n: "Carregador Rápido USB-C", p: 35.00 },
        { n: "Cabo USB-C para Lightning 1m", p: 25.00 },
        { n: "Fone de Ouvido Bluetooth", p: 69.90 },
        { n: "Suporte de Celular para Carro", p: 19.90 },
        { n: "Caixa de Som Portátil Bluetooth", p: 89.90 },
        { n: "Película de Vidro Temperado", p: 10.00 },
        { n: "Ring Light de Mesa com Trepador", p: 42.00 }
      ]
    },
    {
      nome: "Beleza e Cuidados Pessoais",
      itens: [
        { n: "Escova de Cabelo Polvo", p: 16.00 },
        { n: "Kit Pincéis de Maquiagem (8 peças)", p: 28.90 },
        { n: "Espelho de Mesa com LED", p: 39.90 },
        { n: "Necessaire de Viagem Impermeável", p: 24.50 },
        { n: "Kit Cortador de Unha Inox", p: 18.00 },
        { n: "Touca de Satim Anti-Frizz", p: 12.90 },
        { n: "Saboneteira de Silicone", p: 7.50 }
      ]
    },
    {
      nome: "Brinquedos e Variedades",
      itens: [
        { n: "Jogo de Uno Clássico", p: 24.90 },
        { n: "Cubo Mágico Profissional 3x3", p: 19.90 },
        { n: "Pop It Anti-stress Quadrado", p: 14.00 },
        { n: "Carrinho de Controle Remoto", p: 58.00 },
        { n: "Lousa Mágica Digital LCD 8.5\"", p: 29.90 },
        { n: "Kit Massinha de Modelar (12 cores)", p: 16.50 },
        { n: "Baralho Copag 100% Plástico", p: 21.00 }
      ]
    }
  ];

  const produtosGerais = [];
  let id = 1;

  // Multiplica as variações para atingir exatamente 350 itens diversificados
  for (let i = 1; i <= 10; i++) {
    categorias.forEach(cat => {
      cat.itens.forEach(item => {
        const variacao = i > 1 ? ` (Modelo / Cor ${i})` : "";
        // Define estoque satisfatório aleatório entre 15 e 80 unidades
        const estoqueSatis = Math.floor(Math.random() * 66) + 15; 
        
        produtosGerais.push({
          id: id++,
          nome: `${item.n}${variacao}`,
          preco: item.p,
          estoque: estoqueSatis,
          categoria: cat.nome,
          descricao: `Item de alta qualidade da categoria ${cat.nome}. Pronta entrega na Sara Variedades.`,
          foto: "https://via.placeholder.com/200?text=" + encodeURIComponent(item.n)
        });
      });
    });
  }

  return produtosGerais;
}

// Inicializa no localStorage se estiver vazio
if (!localStorage.getItem("produtos") || JSON.parse(localStorage.getItem("produtos")).length === 0) {
  const lista350 = gerarProdutosIniciais();
  localStorage.setItem("produtos", JSON.stringify(lista350));
}
