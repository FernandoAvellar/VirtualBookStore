'use strict'

var carrinhoCompras1 = [];

window.addEventListener("load", function(){
    retrieveFromLocalDB();
});;

function retrieveFromLocalDB() {
  let json = window.localStorage.getItem("carrinhoCompras")
  carrinhoCompras1 = JSON.parse(json);
  console.log(carrinhoCompras1);
}