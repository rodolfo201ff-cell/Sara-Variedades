const produtos = [
 {id:1,nome:"Kit Organizador",preco:25.00},
 {id:2,nome:"Pote Hermético",preco:15.00},
 {id:3,nome:"Lixeira Inox",preco:45.00},
 {id:4,nome:"Tapete Antiderrapante",preco:30.00},
 {id:5,nome:"Porta Temperos",preco:22.00},
 {id:6,nome:"Cesto Multiuso",preco:18.00}
];
let carrinho=[];
const lista=document.getElementById("produtos")||document.querySelector(".produtos");
produtos.forEach(p=>{
 lista.innerHTML+=`<div class=prod><h4>${p.nome}</h4><p>R$ ${p.preco.toFixed(2).replace(".",",")}</p><button onclick="add(${p.id})">Adicionar</button></div>`;
});
function add(id){
 let item=carrinho.find(i=>i.id===id);
 if(item) item.qtd++; else{let prod=produtos.find(p=>p.id===id); carrinho.push({...prod,qtd:1})}
 atualizar();
}
function atualizar(){
 document.getElementById("contador").innerText=carrinho.reduce((s,i)=>s+i.qtd,0);
 let total=0,html="";
 carrinho.forEach(i=>{total+=i.preco*i.qtd; html+=`<p>${i.nome} x${i.qtd} - R$ ${(i.preco*i.qtd).toFixed(2)}</p>`});
 document.getElementById("lista-carrinho").innerHTML=html;
 document.getElementById("total").innerText=total.toFixed(2).replace(".",",");
}
function abrirCarrinho(){document.getElementById("carrinho").classList.add("ativo")}
function fecharCarrinho(){document.getElementById("carrinho").classList.remove("ativo")}
function finalizarWhats(){
 let msg="Olá Sara Variedades! Quero:%0A"; let total=0;
 carrinho.forEach(i=>{msg+=`- ${i.nome} x${i.qtd}%0A`; total+=i.preco*i.qtd});
 msg+=`%0ATotal: R$ ${total.toFixed(2)}`;
 window.open(`https://wa.me/5591999999999?text=${msg}`,"_blank");
}
