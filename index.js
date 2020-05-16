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
obtenirData("http://localhost:3000/api/cameras")
    .then((cameras) => {

        // Récupération de l'élément HTML parent
        let defineList = document.getElementById('define-list');

        // Début de la boucle pour associer chaque objet à un contentant HTML
        for(let i = 0; i < cameras.length; i++){
            // création des <li> et assignation propriétés
            let newListElt = document.createElement('li');
            newListElt.classList.add('list-element');
            newListElt.setAttribute('data-id', `${cameras[i]._id}`);
            defineList.appendChild(newListElt);

            // Création du lien vers la page produit
            let newLinkElt = document.createElement('a');
            newLinkElt.setAttribute('href', `product.html?id=${cameras[i]._id}`);
            newLinkElt.classList.add('list-element_link');
            newListElt.appendChild(newLinkElt);

            // Contenant pour le texte
            let textContainer = document.createElement('div');
            textContainer.classList.add('list-element_link_text');
            newLinkElt.appendChild(textContainer);

            // Contenant pour la photo du produit
            let imgContainer = document.createElement('div');
            imgContainer.classList.add('list-element_link_img');
            newLinkElt.appendChild(imgContainer);
           
            // Photo du produit
            let img = document.createElement('img');
            img.setAttribute('src', cameras[i].imageUrl);
            imgContainer.appendChild(img);

            // Nom du produit
            let name = document.createElement('span');
            name.classList.add('list-element_link_text_name');
            name.textContent = cameras[i].name;
            textContainer.appendChild(name);

            // Description du produit
            let description = document.createElement('p');
            description.classList.add('list-element_link_text_description');
            description.textContent = cameras[i].description;
            textContainer.appendChild(description);

            // Prix du produit
            let price = document.createElement('span');
            price.classList.add('list-element_link_price');
            price.textContent = `$ ${cameras[i].price / 100}`;
            newLinkElt.appendChild(price);
        }  
    })
    .catch((error) => {
        console.log(error);
    });


















