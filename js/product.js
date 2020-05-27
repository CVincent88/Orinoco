// Récupération de l'Id produit
let regex = /id=(.*)/g;
let url = window.location.href.match(regex);
let idProduct = url[0].substring(3);

// Attribution d'une quantité
let productQuantity = 0;

// *** Construction du product.html *** //
// ------------------------------------ //
getData("http://localhost:3000/api/cameras/" + idProduct) // Appel de la promesse
    .then((article) => {
        
        let articleSelected = new Product(article.name, article.lenses, article._id, article.price, article.description, article.imageUrl);

        articleSelected.image();
        articleSelected.customizeProduct(article);
        articleSelected.productName();
        articleSelected.productDescription();
        articleSelected.productPrice();

        cartNotifications();

        // Ajout du produit dans le panier (localStorage) grâce au bouton
        let addCart = document.getElementById('add-cart');

        addCart.addEventListener('click', function(){

            localStorage.setItem(localStorage.length + 1, JSON.stringify(articleSelected));
            alert('Le produit a bien été ajouté au panier');
            // Appel de la fonction de notification pour mettre à jour la pastille
            cartNotifications();
            
        });   
    });






    // let cart = {};

    // let itemtest = new Product('test', 'id:4')

    // cart[itemtest.id] = itemtest

    // Object.keys(cart)



