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

// *** Fonction de création de contenu *** //
// --------------------------------------- //
function Product(name, lenses, id, price, description, imageUrl){
    this.name = name;
    this.lenses = lenses;
    this.id = id;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;

    // Récupération des éléments du DOM de la page index
    let defineList = document.getElementById('define-list');
    let newListElt = document.createElement('li');
    let newLinkElt = document.createElement('a');
    let textContainer = document.createElement('div');

    // Récupération des éléments du DOM de la page produit
    let productWrapper = document.getElementById('product-wrapper');
    let customizationWrapper = document.getElementById("customization-wrapper");
    let customizationText = document.getElementById('customization-text');
    let customizationOptionsContainer = document.getElementById("customization-options");
        
    this.listElt = function(){
        // création des <li> et assignation propriétés
        newListElt.classList.add('list-element');
        newListElt.setAttribute('data-id', `${this.id}`);
        defineList.appendChild(newListElt);

        // Création du lien vers la page produit
        // let newLinkElt = document.createElement('a');
        newLinkElt.setAttribute('href', `product.html?id=${this.id}`);
        newLinkElt.classList.add('list-element_link');
        newListElt.appendChild(newLinkElt);
    }
    
    this.image = function(){
        if(defineList){ // Si on se trouve sur la page index

            // Contenant pour la photo du produit
            let imgContainer = document.createElement('div');
            imgContainer.classList.add('list-element_link_img');
            newLinkElt.appendChild(imgContainer);
            
            // Photo du produit
            let img = document.createElement('img');
            img.setAttribute('src', this.imageUrl);
            imgContainer.appendChild(img);

        }else if(productWrapper){ // Si on se trouve sur la page poduit
            // Image produit
            let img = document.createElement('img');
            img.setAttribute('src', `${this.imageUrl}`);
            img.classList.add('product-container_img');
            productWrapper.prepend(img);
        }
        
    }

    this.textContainer = function(){
        // Contenant pour le texte
        textContainer.classList.add('list-element_link_text');
        newLinkElt.appendChild(textContainer);        
    }

    this.productName = function(){
        if(defineList){
            // Nom du produit
            let productName = document.createElement('span');
            productName.classList.add('list-element_link_text_name');
            productName.textContent = this.name;
            textContainer.appendChild(productName);

        }else if(productWrapper){
            // Nom produit
            let name = document.createElement('span');
            name.classList.add('product-container_text_name');
            name.innerText = this.name;
            customizationWrapper.insertAdjacentElement('afterend', name);
        }

    }

    this.productDescription = function(){
        if(defineList){
            // Description du produit
            let productDescription = document.createElement('p');
            productDescription.classList.add('list-element_link_text_description');
            productDescription.textContent = this.description;
            textContainer.appendChild(productDescription);

        }else if(productWrapper){
            // Description produit
            let description = document.createElement('p');
            description.classList.add('product-container_text_description');
            description.innerText = this.description;
            customizationWrapper.insertAdjacentElement('afterend', description);
        }
        
    }

    this.productPrice = function(){
        if(defineList){
            // Prix du produit
            let productPrice = document.createElement('span');
            productPrice.classList.add('list-element_link_price');
            productPrice.textContent = `$ ${this.price / 100}`;
            newLinkElt.appendChild(productPrice);
        
        }else if(productWrapper){
            // Prix produit
            let price = document.getElementById('product-price');
            price.textContent = `$ ${this.price / 100}`;
        }
        
    }

    this.customizeProduct = function(article){
        for(j=0; j<article.lenses.length; j++){
            let customizationOptionNumber = article.lenses.length;

            if(customizationOptionNumber <= 1){ // Si une seule lentille disponible, message différent
                customizationText.textContent = "Nous n'avons que cette lentille pour le moment: "
            }else{
                customizationText.textContent = "Choisissez une lentille: "
            }
            // Options disponibles
            let customizationOption = document.createElement('option')
            customizationOption.innerText = article.lenses[j];
            customizationOptionsContainer.appendChild(customizationOption);
        }
    }
    
}
