// Création de la variable pour le coût total du panier
let totalCartPrice = 0;
let itemsInCart = [];

if(localStorage.length > 0){ // Si il y a au moins un élément dans localStorage, on afiche le contenu et le formulaire.

    // Boucle sur le nombre d'élément dans localStorage
    for(i=0; i<localStorage.length; i++){
        
        // Récupéraion d'un élément dans le localStorage
        let elementInLocalStorage = JSON.parse(window.localStorage.getItem(i + 1));

        // Si l'élément n'est pas au panier, on l'y ajoute; s'il y est déjà, on incrémente la quantité.
        addToCart(itemsInCart, elementInLocalStorage);
    }        
    
    for(i=0; i<itemsInCart.length; i++){
        let cartRow = document.createElement('tr');

        itemsInCart[i] = new CartProduct(itemsInCart[i].name, itemsInCart[i].lenses, itemsInCart[i].id, itemsInCart[i].price, itemsInCart[i].description, itemsInCart[i].imageUrl, itemsInCart[i].quantity);

        itemsInCart[i].tableRow(cartRow);
        itemsInCart[i].tableProductImg(cartRow);
        itemsInCart[i].tableProductName(cartRow);
        itemsInCart[i].tableProductPrice(cartRow);
        itemsInCart[i].tableProductQuantity(cartRow, itemsInCart[i].quantity, itemsInCart[i]);
        itemsInCart[i].tableDeleteProduct(cartRow, itemsInCart, itemsInCart[i]);

        console.log(totalCartPrice);

        totalCartPrice += itemsInCart[i].totalPrice(itemsInCart[i].quantity, itemsInCart[i].price);
        
        console.log(totalCartPrice);
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

