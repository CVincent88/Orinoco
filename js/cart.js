// Création de la variable pour le coût total du panier
let totalCartPrice = 0;
// Récupération des éléments dans le panier
let itemsInCart = JSON.parse(localStorage.getItem('cart'));


if(localStorage.length > 0){ // Si il y a au moins un élément dans localStorage, on afiche le contenu du panier et le formulaire.
    // Stockage de l'ID des objets dans le panier dans un tableau
    let itemsId = Object.keys(itemsInCart)

    for(i=0; i<itemsId.length; i++){
        let cartRow = document.createElement('div');
        let newItemInCart = itemsInCart[itemsId[i]]

        newItemInCart = new CartProduct(newItemInCart.name, newItemInCart.id, newItemInCart.price, newItemInCart.imageUrl, newItemInCart.quantity);

        newItemInCart.articleRow(cartRow);
        newItemInCart.tableProductImg(cartRow);
        newItemInCart.tableProductName(cartRow);
        newItemInCart.tableProductPrice(cartRow);
        newItemInCart.tableProductQuantity(cartRow);
        newItemInCart.tableDeleteProduct(cartRow, newItemInCart.id);

        totalCartPrice += newItemInCart.totalPrice(newItemInCart.quantity, newItemInCart.price);
    }   

    // Affichage prix total
    let totalCartPriceDisplay = document.getElementById('total-cost_number');
    totalCartPriceDisplay.innerText = totalCartPrice;

    localStorage.setItem('totalPrice', `${totalCartPrice}`);

    // Affichage du formulaire
    let form = document.getElementById('form');
    form.style.display = 'block';

}else{ // Si le panier est vide, on propose le retour au menu principal

    // On cache la div coût total si le panier est vide
    let totalCost = document.getElementById('totalCost');
    totalCost.style.display = 'none';

    // On cache la div cartContainer si le panier est vide
    let cartContainer = document.getElementById('cartContainer');
    cartContainer.style.display = 'none';

    // On affiche les éléments indiquant que le panier est vide
    let emptyCart = document.getElementById('empty-cart');
    if(emptyCart){ // Condition présente uniquement pour éxecuter le code uniquement sur la page panier.
        emptyCart.style.display = 'block';

        let homepage = document.getElementById('homepage');
        homepage.style.display = 'block';
    }
    
}

