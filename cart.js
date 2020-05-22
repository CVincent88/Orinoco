// *** Récupération des données *** //
// -------------------------------- //
function obtenirData(url) {
    return new Promise((resolve, reject) => {
        const myRequest = new XMLHttpRequest();
        myRequest.open("GET", url);
        myRequest.onload = () => resolve(JSON.parse(myRequest.responseText));
        myRequest.onerror = () => reject(JSON.parse(myRequest.statusText));
        myRequest.send();
    });
}

// Définition d'une variable pour renvoyer le contenu de localStorage
let cart = localStorage;

// *** Création page panier *** //
// -------------------------- //
obtenirData("http://localhost:3000/api/cameras") // Appel de la promesse
    .then((cameras) => {

        if(cart.length > 0){ // Si il y a au moins un élément dans le panier
            
            // Définition d'une variable pour le coût total du panier
            let totalCost = 0;  
            
            // Parcours des données du fichier JSON
            for(i=0; i<cameras.length; i++){    
                
                // Si l'un des objet du panier match un objet du fichier JSON, alors:
                if(cart.getItem(`${cameras[i].name}`) === cameras[i]._id){ 

                    // Récupération et affichage du tableau
                    const cartTable = document.getElementById('in-cart')
                    cartTable.style.display = 'table';

                    // Création ligne de tableau pour produit dans le panier
                    const cartRow = document.createElement('tr');
                    cartRow.classList.add('in-cart_product');
                    cartTable.prepend(cartRow);

                    // Case + Image produit
                    let imgTD = document.createElement('td');
                    imgTD.classList.add('in-cart_product_img');
                    cartRow.appendChild(imgTD);
                    let img = document.createElement('img');
                    img.setAttribute('src', `${cameras[i].imageUrl}`);
                    imgTD.appendChild(img);
                    
                    // Nom produit
                    let name = document.createElement('td');
                    name.classList.add('in-cart_product_name');
                    name.innerText = cameras[i].name;
                    cartRow.appendChild(name);
                    
                    // Prix produit
                    let price = document.createElement('td');
                    price.classList.add('in-cart_product_price');
                    price.innerText = `$ ${cameras[i].price / 100}`;
                    cartRow.appendChild(price);

                    // Quantité
                    let quantityTD = document.createElement('td');
                    quantityTD.classList.add('in-cart_product_quantity');
                    cartRow.appendChild(quantityTD);
                    // +form
                    let formQuantity = document.createElement('form');
                    formQuantity.setAttribute('action', 'POST');
                    formQuantity.setAttribute('method', '#');
                    quantityTD.appendChild(formQuantity);
                    // +label
                    let labelQuantity = document.createElement('label');
                    labelQuantity.setAttribute('for', 'quantity');
                    labelQuantity.textContent = 'Quantité: ';
                    formQuantity.appendChild(labelQuantity);
                    // +input
                    let inputQuantity = document.createElement('input');
                    inputQuantity.setAttribute('type', 'number');
                    inputQuantity.setAttribute('min', '1');
                    inputQuantity.setAttribute('max', '50');
                    inputQuantity.setAttribute('id', 'quantity');
                    inputQuantity.setAttribute('name', 'quantity');
                    inputQuantity.setAttribute('value', '1');
                    inputQuantity.setAttribute('class', 'input-quantity');
                    formQuantity.appendChild(inputQuantity);

                    // Prise en compte de la quantité de produit
                    let camName = cameras[i].name;
                    inputQuantity.addEventListener('change', function() {
                        cart.setItem(`Number of ${camName}`, this.value)
                        console.log(cart);
                        // Ajouter des noms au clé de LocalStorage
                      });
                    


                    // Bouton supprimer produit
                    let deleteProductTD = document.createElement('td');
                    deleteProductTD.classList.add('in-cart_product_delete');
                    cartRow.appendChild(deleteProductTD);
                    let deleteButton = document.createElement('button');
                    deleteButton.classList.add('delete-item');
                    deleteButton.textContent = 'X';
                    deleteProductTD.appendChild(deleteButton);
                
                    // Prix total
                    totalCost += cameras[i].price;
                    let totalCostDisplayed = document.getElementById('total-cost_number')
                    totalCostDisplayed.textContent = `${totalCost / 100}`;

                    // *** Suppression d'un élément du panier *** //
                    // ------------------------------------------ //
                    
                    let deleteProduct = document.getElementsByClassName('delete-item')[0];
                    deleteProduct.addEventListener('click', function(){
                        cart.removeItem(`${camName}`);
                        location.reload();
                    });

                    // Afficher formulaire
                    let form = document.getElementById('form');
                    form.style.display = 'block';

                }
            }
        }else{ // Si le panier est vide
            
            let emptyCart = document.getElementById('empty-cart');
            if(emptyCart){ // Condition présente uniquement pour éxecuter le code uniquement sur la page panier.
                emptyCart.style.display = 'block';

                let page = document.getElementById('homepage');
                homepage.style.display = 'block';
            }
            
        }
    });
        
// *** Affichage nombre d'éléments dans le panier dans les notifications *** //
// ------------------------------------------------------------------------- //
let nombreEltPanier = cart.length;
let notifications = document.getElementById('notifications');

if(notifications){ // Condition présente uniquement pour ne pas éxecuter le code sur les pages où le bouton panier est présent
    if(nombreEltPanier > 0){
        notifications.style.display = 'inline-block';
        notifications.textContent = nombreEltPanier;
    }else{
        notifications.style.display = 'none';
    }
}
