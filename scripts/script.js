'use strict'

var carrinhoCompras = [];

const botaoComprar1 = document.getElementById("botaoComprarItem1");
const botaoComprar2 = document.getElementById("botaoComprarItem2");
const botaoComprar3 = document.getElementById("botaoComprarItem3");
const botaoComprar4 = document.getElementById("botaoComprarItem4");
var qtdeItem1 = document.getElementById("qtdeItem1");
var qtdeItem2 = document.getElementById("qtdeItem2");
var qtdeItem3 = document.getElementById("qtdeItem3");
var qtdeItem4 = document.getElementById("qtdeItem4");

botaoComprar1.addEventListener("click", function() {
    let id = 1;
    let dataDaCompra = new Date;
    let qtde = qtdeItem1.value;

    var itemCarrinho = [{id : id, quantidade : qtde, dataDaCompra : dataDaCompra}];

    if (confirm("Tem certeza que deseja inserir no carrinho " + qtde + " livro(s) Agile?")) {
        carrinhoCompras.push(itemCarrinho);
        console.log(carrinhoCompras);
        window.location.href = "carrinho.html"; 
    }
});

botaoComprar2.addEventListener("click", function() {
    let id = 2;
    let dataDaCompra = new Date;
    let qtde = qtdeItem2.value;

    var itemCarrinho = [{id : id, quantidade : qtde, dataDaCompra : dataDaCompra}];

    if (confirm("Tem certeza que deseja inserir no carrinho " + qtde + " livro(s) CSS Eficiente?")) {
        window.location.href = "carrinho.html"; 
        carrinhoCompras.push(itemCarrinho);
        console.log(carrinhoCompras);
    }
});

botaoComprar3.addEventListener("click", function() {
    let id = 3;
    let dataDaCompra = new Date;
    let qtde = qtdeItem3.value;

    var itemCarrinho = [{id : id, quantidade : qtde, dataDaCompra : dataDaCompra}];

    if (confirm("Tem certeza que deseja inserir no carrinho " + qtde + " livro(s) Guia Front-End?")) {
        window.location.href = "carrinho.html"; 
        carrinhoCompras.push(itemCarrinho);
        console.log(carrinhoCompras);
    }
});

botaoComprar4.addEventListener("click", function() {
    let id = 4;
    let dataDaCompra = new Date;
    let qtde = qtdeItem4.value;

    var itemCarrinho = [{id : id, quantidade : qtde, dataDaCompra : dataDaCompra}];

    if (confirm("Tem certeza que deseja inserir no carrinho " + qtde + " livro(s) JavaFX?")) {
        window.location.href = "carrinho.html"; 
        carrinhoCompras.push(itemCarrinho);
        console.log(carrinhoCompras);
    }
});