'use strict'

var carrinhoCompras = [];
retrieveFromLocalDB();

/*window.addEventListener("load", function(){
    retrieveFromLocalDB();
});;*/

function retrieveFromLocalDB() {
  let json = window.localStorage.getItem("carrinhoCompras")
  carrinhoCompras = JSON.parse(json);
  console.log(carrinhoCompras);
}