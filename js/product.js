// Récupération de l'Id produit
let regex = /id=(.*)/g;
let url = window.location.href.match(regex);
let idProduct = url[0].substring(3);

// Attribution d'une quantité
let productQuantity = 0;

let cart = {};

// *** Construction du product.html *** //
// ------------------------------------ //
getData("http://localhost:3000/api/cameras/" + idProduct) // Appel de la promesse
    .then((article) => {
        
        // Appel du constructeur
        let articleSelected = new Product(article.name, article.lenses, article._id, article.price, article.description, article.imageUrl);

        articleSelected.image();
        articleSelected.customizeProduct(article);
        articleSelected.productName();
        articleSelected.productDescription();
        articleSelected.productPrice();
        
        // Garde la notification active lorsqu'on arrive sur la page produit
        cartNotifications();

        // Ajout du produit dans le panier (localStorage) grâce au bouton
        let addCart = document.getElementById('add-cart');

        addCart.addEventListener('click', function(){

            // Ajout du produit au panier
            addToCart(cart, articleSelected);

            // Mise à jour de la notification après ajout du produit au panier
            cartNotifications();     
            
            let notif = document.getElementById('notifications');
            notif.style.animationPlayState = 'running';
            setTimeout(()=>{
                notif.style.animationPlayState = 'paused';
            }, 1500);
        });   
    });









