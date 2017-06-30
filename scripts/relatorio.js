'use strict'

var comprasEncerradas = [];

retrieveFromLocalDBComprasEncerradas();
gerarRelatorioDeVendas();

function gerarRelatorioDeVendas() {
  if (comprasEncerradas !== null) {
    let i = 0;
    for (i = 0; i < comprasEncerradas.length; i++) {
        insereCarrinhoNaTabela(comprasEncerradas[i]);
    }
  }
}

function insereCarrinhoNaTabela(mapaDataCompraConteudoCarrinho) {
    var data = mapaDataCompraConteudoCarrinho[0].dataDaCompra;
    var conteudoCarrinho = mapaDataCompraConteudoCarrinho[1].carrinhoCompras;

    let j = 0;
    for (j = 0; j < conteudoCarrinho.length; j++) {
        let compraRegistrada = conteudoCarrinho[j];
        insereCompraNaTabela(compraRegistrada, data);
    }
}

function insereCompraNaTabela(compra, data) {
  let nomeLivro = getNomeLivroUsandoId(compra[0].id);
  let quantidade = compra[0].quantidade;
  let valorTotal = 10 * quantidade; 
  let tabela = document.querySelector("table");
  let novaVenda = "<tr>" +
    "<td>" + data + "</td>" +
    "<td>" + quantidade + "</td>" +
    "<td>" + nomeLivro + "</td>" +
    "<td>" + "R$ " + valorTotal + "</td>" +
    "</tr>";

  tabela.innerHTML = tabela.innerHTML + novaVenda;
}

function getNomeLivroUsandoId(id) {
  switch (id) {
    case 1: return "Livro Agile";
    case 2: return "Livro CSS Eficiente";
    case 3: return "Livro Guia Front-End";
    case 4: return "Livro JavaFX";
  }
}

function retrieveFromLocalDBComprasEncerradas() {
  let json = window.localStorage.getItem("comprasEncerradas")
  if (json !== null) {
    comprasEncerradas = JSON.parse(json);
  }
}