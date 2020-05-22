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

// *** Construction du index.html *** //
// ---------------------------------- //
obtenirData("http://localhost:3000/api/cameras/")
    .then((cameras) => {

        for(i=0; i<cameras.length; i++){
            let newArticle = new Product(cameras[i].name, cameras[i].lenses, cameras[i]._id, cameras[i].price, cameras[i].description, cameras[i].imageUrl);
            newArticle.createElt();
            newArticle.createImg();
            newArticle.createText();
            newArticle.createPrice();
        }
    })
    .catch((error) => {
        console.log(error);
    });













