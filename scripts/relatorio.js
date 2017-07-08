'use strict'

/*{Boolean} true is this is between or equal to the start and end dates, else false

Example
var past = new Date(2000, 4, 5); var future = new Date(2010, 11, 25) Date.today().between(past, future); // true|false*/

var valorTodasAsVendas = 0;
var comprasEncerradas = [];
var comprasAposFiltro = [];
var botaoFiltrarRelatorio = document.getElementById("botaoFiltrarRelatorio");
var dataInicial = document.getElementById("dataInicial");
var dataFinal = document.getElementById("dataFinal");

retrieveFromLocalDBComprasEncerradas();
gerarRelatorioDeVendas();
configurarDataInicialFiltroVendas();

function configurarDataInicialFiltroVendas() {
  let agora = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  console.log(agora);
  let d1 = Date.parse(agora);
  console.log(d1);
  dataInicial.valueAsDate = d1;
  dataFinal.valueAsDate = d1;
  console.log(dataInicial.valueAsDate.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }))
  console.log(dataFinal.valueAsDate.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }))
}

function gerarRelatorioDeVendas() {
  valorTodasAsVendas = 0;
  if (comprasEncerradas !== null) {
    let i = 0;
    for (i = 0; i < comprasEncerradas.length; i++) {
        insereCarrinhoNaTabela(comprasEncerradas[i]);
    }
    geraLinhaFinalComValorTotalDasVendas();
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
  let valorIndividualDaVenda = 10 * quantidade; 
  valorTodasAsVendas = valorTodasAsVendas + valorIndividualDaVenda;
  let tabela = document.querySelector("#tabelaRelatorio");
  let novaVenda = "<tr>" +
    "<td>" + data + "</td>" +
    "<td>" + quantidade + "</td>" +
    "<td>" + nomeLivro + "</td>" +
    "<td>" + "R$ " + valorIndividualDaVenda + "</td>" +
    "</tr>";

  tabela.innerHTML = tabela.innerHTML + novaVenda;
}

function geraLinhaFinalComValorTotalDasVendas() {
  let tabelaFinal = document.querySelector("#tabelaValorFinal");

  let valorFinal = "<tr>" +
    "<td>" + "R$ " + valorTodasAsVendas + "</td>" +
    "</tr>";

  tabelaFinal.innerHTML = tabelaFinal.innerHTML + valorFinal;
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