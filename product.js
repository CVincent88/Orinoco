// Récupération de l'Id produit
let regex = /id=(.*)/g;
let url = window.location.href.match(regex)
let idProduct = url[0].substring(3);


// *** Construction du product.html *** //
// ------------------------------------ //
obtenirData("http://localhost:3000/api/cameras/" + idProduct) // Appel de la promesse
    .then((article) => {
        
        let articleSelected = new Product(article.name, article.lenses, article._id, article.price, article.description, article.imageUrl);

        articleSelected.image();
        articleSelected.customizeProduct(article)
        articleSelected.productName();
        articleSelected.productDescription();
        articleSelected.productPrice();

        // Ajout du produit dans le panier (localStorage) grâce au bouton
        let addCart = document.getElementById('add-cart');

        addCart.addEventListener('click', function(){
            localStorage.setItem(`${article.name}`, `${article._id}`);
            alert('Le produit a bien été ajouté au panier');
            location.reload();

        });
            
        
    });