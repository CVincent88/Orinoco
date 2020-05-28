// Création de la variable pour le coût total du panier
let totalCartPrice = 0;
itemsInCart = JSON.parse(localStorage.getItem('cart'));
let itemsId = Object.keys(itemsInCart) 

if(localStorage.length > 0){ // Si il y a au moins un élément dans localStorage, on afiche le contenu et le formulaire.

          
    
    for(i=0; i<itemsId.length; i++){
        let cartRow = document.createElement('tr');
        let newItemInCart = itemsInCart[itemsId[i]]

        newItemInCart = new CartProduct(newItemInCart.name, newItemInCart.id, newItemInCart.price, newItemInCart.imageUrl, newItemInCart.quantity);

        newItemInCart.tableRow(cartRow);
        newItemInCart.tableProductImg(cartRow);
        newItemInCart.tableProductName(cartRow);
        newItemInCart.tableProductPrice(cartRow);
        newItemInCart.tableProductQuantity(cartRow, newItemInCart.quantity, newItemInCart);
        newItemInCart.tableDeleteProduct(cartRow, newItemInCart, newItemInCart);

        totalCartPrice += newItemInCart.totalPrice(newItemInCart.quantity, newItemInCart.price);
    }

    // Affichage prix total
    let totalCartPriceDisplay = document.getElementById('total-cost_number');
    totalCartPriceDisplay.innerText = totalCartPrice;

    localStorage.setItem('totalPrice', `${totalCartPrice}`);

    // Afficher le formulaire
    let form = document.getElementById('form');
    form.style.display = 'block';

}else{ // Si le panier est vide, on propose le retour au menu principal
            
    let emptyCart = document.getElementById('empty-cart');
    if(emptyCart){ // Condition présente uniquement pour éxecuter le code uniquement sur la page panier.
        emptyCart.style.display = 'block';

        let homepage = document.getElementById('homepage');
        homepage.style.display = 'block';
    }
    
}

