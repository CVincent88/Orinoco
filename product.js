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

// *** Construction du product.html *** //
// ------------------------------------ //
obtenirData("http://localhost:3000/api/cameras/") // Appel de la promesse
    .then((cameras) => {
        for(i=0; i<cameras.length; i++){    // Parcours des données
            if(window.location.href.includes(cameras[i]._id)){ // Si l'url de la page chargée match un objet, alors:
                
                //Récupération du contenant
                let productWrapper = document.getElementById('product-wrapper');

                // Création + hiérarchisation des éléments dans le contenant

                // Image produit
                let img = document.createElement('img');
                img.setAttribute('src', `${cameras[i].imageUrl}`);
                img.classList.add('product-container_img');
                productWrapper.prepend(img);
                
                // Personalisation du produit
                let customizationWrapper = document.getElementById("customization-wrapper");
                let customizationText = document.getElementById('customization-text');
                let customizationOptionsContainer = document.getElementById("customization-options");
                for(j=0; j<cameras[i].lenses.length; j++){
                    let customizationOptionNumber = cameras[i].lenses.length;

                    if(customizationOptionNumber <= 1){ // Si une seule lentille disponible, message différent
                        customizationText.textContent = "Nous n'avons que cette lentille pour le moment: "
                    }else{
                        customizationText.textContent = "Choisissez une lentille: "
                    }
                    // Options disponibles
                    let customizationOption = document.createElement('option')
                    customizationOption.innerText = cameras[i].lenses[j];
                    customizationOptionsContainer.appendChild(customizationOption);
                }

                // Nom produit
                let name = document.createElement('span');
                name.classList.add('product-container_text_name');
                name.innerText = cameras[i].name;
                customizationWrapper.insertAdjacentElement('afterend', name);
                
                // Description produit
                let description = document.createElement('p');
                description.classList.add('product-container_text_description');
                description.innerText = cameras[i].description;
                name.insertAdjacentElement('afterend', description);

                // Prix produit
                let price = document.getElementById('product-price');
                price.textContent = `$ ${cameras[i].price / 100}`;
            
                // Ajout du produit dans le localStorage grâce au bouton
                let idCam = cameras[i]._id;
                let nomCam = cameras[i].name;
                let addCart = document.getElementById('add-cart');

                addCart.addEventListener('click', function(){
                    localStorage.setItem(`${nomCam}`, `${idCam}`);
                    alert('Le produit a bien été ajouté au panier');
                    location.reload();
                });
            }
        }
    });