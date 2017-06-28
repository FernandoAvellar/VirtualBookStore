'use strict'

var carrinhoCompras = [];

retrieveFromLocalDB();
atualizarTabelaDeCompras();

function atualizarTabelaDeCompras() {
  if(carrinhoCompras !== null) {
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
  let nomeLivroRemovido = row.parentNode.parentNode.firstChild.nextSibling.firstChild;
  let idLivro = getIdLivroUsandoNome(nomeLivroRemovido);
  deleteFromLocalDB(idLivro);
  let i = row.parentNode.parentNode.rowIndex;
  document.querySelector("table").deleteRow(i);
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

function retrieveFromLocalDB() {
  let json = window.localStorage.getItem("carrinhoCompras")
  carrinhoCompras = JSON.parse(json);
}

function saveOnLocalDB() {
    let json = JSON.stringify(carrinhoCompras)
    window.localStorage.setItem("carrinhoCompras", json);
}

function deleteFromLocalDB(idLivro){
  retrieveFromLocalDB;
  var i = 0;
  for(i=0 ; i<carrinhoCompras.length; i++) {
    if(idLivro === carrinhoCompras[i][0].id) {
      carrinhoCompras.splice(i,1);
      console.log(carrinhoCompras);
      saveOnLocalDB();
    }
  }
}