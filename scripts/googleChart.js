'use strict'

var comprasEncerradas = [];
var numVendasLivroAgile = 0;
var numVendasLivroCSS = 0;
var numVendasLivroFrontEnd = 0;
var numVendasLivroJavaFX = 0;

retrieveFromLocalDBComprasEncerradas();
percorreComprasRealizadas();

function retrieveFromLocalDBComprasEncerradas() {
    let json = window.localStorage.getItem("comprasEncerradas")
    if (json !== null) {
        comprasEncerradas = JSON.parse(json);
    }
}

function percorreComprasRealizadas() {
    let i = 0;
    for (i = 0; i < comprasEncerradas.length; i++)
        percorreCarrinhosDeCompras(comprasEncerradas[i][1].carrinhoCompras);
}

function percorreCarrinhosDeCompras(carrinho) {
    let j = 0;
    for (j = 0; j < carrinho.length; j++) {
        let item = carrinho[j];
        let z = 0;
        for (z = 0; z < item.length; z++) {
            atualizaValoresDasVariaveis(item[z].id, item[z].quantidade);
        }
    }
    console.log(numVendasLivroAgile);
}

function atualizaValoresDasVariaveis(idLivro, quantidadeVendida) {
    console.log("id: " + idLivro + " qtde: " + quantidadeVendida)
    switch (idLivro) {
        case 1: numVendasLivroAgile = parseInt(numVendasLivroAgile) + parseInt(quantidadeVendida);
            break;
        case 2: numVendasLivroCSS = parseInt(numVendasLivroCSS) + parseInt(quantidadeVendida);
            break;
        case 3: numVendasLivroFrontEnd = parseInt(numVendasLivroFrontEnd) + parseInt(quantidadeVendida);
            break;
        case 4: numVendasLivroJavaFX = parseInt(numVendasLivroJavaFX) + parseInt(quantidadeVendida);
            break;
    }
}

google.charts.load('current', { 'packages': ['corechart'] });

google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['Agile', numVendasLivroAgile],
        ['CSS Eficiente', numVendasLivroCSS],
        ['Guia Front-End', numVendasLivroFrontEnd],
        ['JavaFX', numVendasLivroJavaFX],
    ]);

    var options = {
        'title': 'Gráfico de venda dos livros',
        'width': 500,
        'height': 400,
        'backgroundColor': '#F2FFFC',
        titleTextStyle: { color: '#851944', fontName: "Arial", fontSize: '20', bold: 'true' }
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}