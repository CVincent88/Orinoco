// *** Récupération des données *** //
// -------------------------------- //
function obtenirInfo(url) {
    return new Promise((resolve, reject) => {
        const myRequest = new XMLHttpRequest();
        myRequest.open("GET", url);
        myRequest.onload = () => resolve(JSON.parse(myRequest.responseText));
        myRequest.onerror = () => reject(JSON.parse(myRequest.statusText));
        myRequest.send();
    });
}

// *** Construction du HTML *** //
// ---------------------------- //
obtenirInfo("http://localhost:3000/api/cameras")
    .then((value) => {

        // Récupération de l'élément HTML parent
        let defineList = document.getElementById('define-list');

        // Début de la boucle pour associer chaque objet à un contentant HTML
        for(let i = 0; i < value.length; i++){
            // création des <li> et assignation propriétés
            let newListElt = document.createElement('li');
            newListElt.classList.add('list-element');
            newListElt.setAttribute('id', 'list-element' + value[i]);
            defineList.appendChild(newListElt);

            // + une div à l'intérieur pour le texte
            let textContainer = document.createElement('div');
            textContainer.classList.add('list-element_text');
            newListElt.appendChild(textContainer);

            // Ajout image produit + container
            let imgContainer = document.createElement('div');
            imgContainer.classList.add('list-element_img');
            newListElt.appendChild(imgContainer);
            // +
            let img = document.createElement('img');
            img.setAttribute('src', value[i].imageUrl);
            imgContainer.appendChild(img);

            // Ajout nom produit
            let name = document.createElement('span');
            name.classList.add('list-element_text_name');
            name.textContent = value[i].name;
            textContainer.appendChild(name);

            // Ajout description produit
            let description = document.createElement('p');
            description.classList.add('list-element_text_description');
            description.textContent = value[i].description;
            textContainer.appendChild(description);

            // Ajout prix produit
            let price = document.createElement('span');
            price.classList.add('list-element_price');
            price.textContent = '$ ' + value[i].price / 100;
            newListElt.appendChild(price);
        }  
    })
    .catch((error) => {
        console.log(error("Erreur du serveur"));
    });



















