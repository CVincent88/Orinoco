// Récupération de l'Id produit
let regex = /id=(.*)/g;
let url = window.location.href.match(regex);
let idProduct = url[0].substring(3);

// Attribution d'une quantité
let productQuantity = 0;

let cart = {};

// *** Construction du product.html *** //
// ------------------------------------ //
buildProductPage();
