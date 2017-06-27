'use strict'

var carrinhoCompras = [];

retrieveFromLocalDB();
atualizarTabelaDeCompras();


function retrieveFromLocalDB() {
  let json = window.localStorage.getItem("carrinhoCompras")
  carrinhoCompras = JSON.parse(json);
}

function atualizarTabelaDeCompras() {
  if(carrinhoCompras !== null) {
    var i = 0;
    for (i = 0; i < carrinhoCompras.length; i++) {
      insereLinha(i);
    }
  }
}

function insereLinha(itemIndex) {
  let nomeLivro = getNomeLivro(carrinhoCompras[itemIndex][0].id);
  let quantidade = carrinhoCompras[itemIndex][0].quantidade;
  let valorTotal = 10 * quantidade;

  let novoProduto = "<tr>" +
    "<td>" + quantidade + "</td>" +
    "<td>" + nomeLivro + "</td>" +
    "<td>" + "R$ " + valorTotal + "</td>" +
    "<td><input type='button' value='Remover' onclick='apagarLinha(this)'></td>" +
    "</tr>";

  let tabela = document.querySelector("table");
  tabela.innerHTML = tabela.innerHTML + novoProduto;
}

function apagarLinha(row) {
  console.log(row.parentNode.parentNode);
  let i = row.parentNode.parentNode.rowIndex;
  document.querySelector("table").deleteRow(i);
}

function getNomeLivro(id) {

  let nomeLivro = null;

  switch (id) {
    case 1: nomeLivro = "Livro Agile";
      break;
    case 2: nomeLivro = "Livro CSS Eficiente";
      break;
    case 3: nomeLivro = "Livro Guia Front-End";
      break;
    case 4: nomeLivro = "Livro JavaFX";
  }

  return nomeLivro;
}