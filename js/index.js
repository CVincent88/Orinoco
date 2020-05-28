// *** Construction du index.html *** //
// ---------------------------------- //
getData("http://localhost:3000/api/cameras/")
    .then((cameras) => {

        for(i=0; i<cameras.length; i++){
            let newArticle = new Product(cameras[i].name, cameras[i].lenses, cameras[i]._id, cameras[i].price, cameras[i].description, cameras[i].imageUrl);
            
            newArticle.listElt();
            newArticle.image();
            newArticle.textContainer();
            newArticle.productName();
            newArticle.productDescription();
            newArticle.productPrice();
        }
        // cartNotifications();
    })
    .catch((error) => {
        console.log(error);
    });













