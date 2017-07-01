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

botaoComprar1.addEventListener("click", function () {
    executaAcaoDoBotaoDeCompra(1);
});

botaoComprar2.addEventListener("click", function () {
    executaAcaoDoBotaoDeCompra(2);
});

botaoComprar3.addEventListener("click", function () {
    executaAcaoDoBotaoDeCompra(3);
});

botaoComprar4.addEventListener("click", function () {
    executaAcaoDoBotaoDeCompra(4);
});

function executaAcaoDoBotaoDeCompra(numeroBotao) {
    var qtdeItensComprados = recuperaValorDeItensComprados(numeroBotao);

    if (qtdeItensComprados >= 1) {

        var itemCarrinho = [{ id: numeroBotao, quantidade: qtdeItensComprados }];

        if (confirm("Tem certeza que deseja inserir no carrinho " + qtdeItensComprados + " " + recuperaNomeDoLivro(numeroBotao))) {

            var posicaoDoItemNoCurrentDB = retornaPosicaoDoItemNoCurrentDB(numeroBotao);

            if (posicaoDoItemNoCurrentDB !== -1) {
                let qtdeAtual = carrinhoCompras[posicaoDoItemNoCurrentDB][0].quantidade;
                let qtdeAtualizada = parseInt(qtdeAtual) + parseInt(qtdeItensComprados);
                itemCarrinho = [{ id: numeroBotao, quantidade: qtdeAtualizada }];
                carrinhoCompras.splice(posicaoDoItemNoCurrentDB, 1, itemCarrinho);
                saveOnLocalDB();
                limpaEntradaDeDados();
                window.location.href = "carrinho.html";
            }
            else {
                carrinhoCompras.push(itemCarrinho);
                saveOnLocalDB();
                limpaEntradaDeDados();
                window.location.href = "carrinho.html";
            }
        }
    }
    else {
        alert("Por favor, insira uma quantidade maior ou igual a uma unidade!");
        limpaEntradaDeDados();
    }

}

function recuperaValorDeItensComprados(numeroInput) {
    switch (numeroInput) {
        case 1: return qtdeItem1.value;
        case 2: return qtdeItem2.value;
        case 3: return qtdeItem3.value;
        case 4: return qtdeItem4.value;
    }
}

function retornaPosicaoDoItemNoCurrentDB(itemId) {
    retrieveFromLocalDB();
    let i = 0;
    for (i = 0; i < carrinhoCompras.length; i++) {
        if (itemId === carrinhoCompras[i][0].id) {
            return i;
        }
    }
    return -1;
}

function recuperaNomeDoLivro(id) {
    switch (id) {
        case 1: return "Livro(s) Agile";
        case 2: return "Livro(s) CSS Eficiente";
        case 3: return "Livro(s) Guia Front-End";
        case 4: return "Livro(s) JavaFX";
    }
}

function limpaEntradaDeDados() {
    qtdeItem1.value = 1;
    qtdeItem2.value = 1;
    qtdeItem3.value = 1;
    qtdeItem4.value = 1;
}

function saveOnLocalDB() {
    let json = JSON.stringify(carrinhoCompras)
    if (json !== null) {
        window.localStorage.setItem("carrinhoCompras", json);
    }
}

function retrieveFromLocalDB() {
    let json = window.localStorage.getItem("carrinhoCompras")
    if (json !== null) {
        carrinhoCompras = JSON.parse(json);
    }
}