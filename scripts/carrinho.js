'use strict'

var carrinhoCompras = [];
var comprasEncerradas = [];
const botaoConcluirCompra = document.getElementById("botaoConcluirCompra");

retrieveFromLocalDBCarrinhoCompras();
retrieveFromLocalDBComprasEncerradas();
atualizarTabelaDeCompras();

function atualizarTabelaDeCompras() {
  if (carrinhoCompras !== null) {
    var i = 0;
    for (i = 0; i < carrinhoCompras.length; i++) {
      insereLinha(i);
    }
  }
}

function insereLinha(itemIndex) {
  let nomeLivro = getNomeLivroUsandoId(carrinhoCompras[itemIndex][0].id);
  let quantidade = carrinhoCompras[itemIndex][0].quantidade;
  let valorTotal = 10 * quantidade;
  let tabela = document.querySelector("table");
  let novoProduto = "<tr>" +
    "<td>" + quantidade + "</td>" +
    "<td>" + nomeLivro + "</td>" +
    "<td>" + "R$ " + valorTotal + "</td>" +
    "<td><input type='button' value='Remover' onclick='apagarLinha(this)'></td>" +
    "</tr>";

  tabela.innerHTML = tabela.innerHTML + novoProduto;
}

function apagarLinha(row) {
  let nomeLivroRemovido = row.parentNode.parentNode.firstChild.nextSibling.firstChild;
  let idLivro = getIdLivroUsandoNome(nomeLivroRemovido);
  deleteFromLocalDB(idLivro);
  let i = row.parentNode.parentNode.rowIndex;
  document.querySelector("table").deleteRow(i);
}

botaoConcluirCompra.addEventListener("click", function () {
  executaAcaoDoBotaoConcluirCompra();
});

function executaAcaoDoBotaoConcluirCompra() {
  if (confirm("Deseja realmente finalizar a compra?")) {

    if (carrinhoCompras.length != 0) {
      retrieveFromLocalDBComprasEncerradas();
      let dataDaCompra = new Date().toLocaleDateString();
      let valorTotal = calculaValorFinalDoCarrinho();
      let itemCompraEncerrada = [{ "dataDaCompra": dataDaCompra, "valorTotal": valorTotal }, { carrinhoCompras }];
      comprasEncerradas.push(itemCompraEncerrada);
      saveOnLocalDBComprasEncerradas();
      carrinhoCompras = [];
      saveOnLocalDBCarrinhoDeCompras();
      location.reload();
    } else {
      alert("Por favor, inclua algum item no carrinho antes de encerrar as suas compras!")
    }
  }
}

function calculaValorFinalDoCarrinho() {
  var valorTotal = 0;
  var i = 0;
  for (i = 0; i < carrinhoCompras.length; i++) {
    let qtde = carrinhoCompras[i][0].quantidade;
    valorTotal = valorTotal + qtde * 10;
  }
  return valorTotal;
}

function getNomeLivroUsandoId(id) {
  switch (id) {
    case 1: return "Livro Agile";
    case 2: return "Livro CSS Eficiente";
    case 3: return "Livro Guia Front-End";
    case 4: return "Livro JavaFX";
  }
}

function getIdLivroUsandoNome(nomeLivro) {
  switch (nomeLivro.textContent) {
    case "Livro Agile": return 1;
    case "Livro CSS Eficiente": return 2;
    case "Livro Guia Front-End": return 3;
    case "Livro JavaFX": return 4;
  }
}

function retrieveFromLocalDBCarrinhoCompras() {
  let json = window.localStorage.getItem("carrinhoCompras")
  if (json !== null) {
    carrinhoCompras = JSON.parse(json);
  }
}

function retrieveFromLocalDBComprasEncerradas() {
  let json = window.localStorage.getItem("comprasEncerradas")
  if (json !== null) {
    comprasEncerradas = JSON.parse(json);
  }
}

function saveOnLocalDBCarrinhoDeCompras() {
  let json = JSON.stringify(carrinhoCompras)
  if (json !== null) {
    window.localStorage.setItem("carrinhoCompras", json);
  }
}

function saveOnLocalDBComprasEncerradas() {
  let json = JSON.stringify(comprasEncerradas)
  if (json !== null) {
    window.localStorage.setItem("comprasEncerradas", json);
  }
}

function deleteFromLocalDB(idLivro) {
  retrieveFromLocalDBCarrinhoCompras;
  var i = 0;
  for (i = 0; i < carrinhoCompras.length; i++) {
    if (idLivro === carrinhoCompras[i][0].id) {
      carrinhoCompras.splice(i, 1);
      saveOnLocalDBCarrinhoDeCompras();
    }
  }
}