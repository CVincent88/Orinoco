// *** Récupération des données *** //
// -------------------------------- //
function getData(url) {
    return new Promise((resolve, reject) => {
        const myRequest = new XMLHttpRequest();
        myRequest.open("GET", url);
        myRequest.onload = () => resolve(JSON.parse(myRequest.responseText));
        myRequest.onerror = () => reject(JSON.parse(myRequest.statusText));
        myRequest.send();
    });
}

// *** Envoi de données *** //
// -------------------------------- //
function postData(url, objectToPost) {
    return new Promise((resolve, reject) =>{
        const myRequest = new XMLHttpRequest();
        myRequest.open("POST", url + '/order');
        myRequest.setRequestHeader("Content-Type", "application/json");
        myRequest.onload = () => resolve(JSON.parse(myRequest.responseText))
        myRequest.onerror = () => reject(JSON.parse(myRequest.statusText));
        myRequest.send(JSON.stringify(objectToPost));
    });
}

// *** Constructeur pour l'affichage de index.html et page produit *** //
// ------------------------------------------------------------------- //
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

    this.homePage = function(){
        
        let homePageButton = document.createElement('a');
        homePageButton.classList.add('homePage-button');
        homePageButton.setAttribute('href', 'index.html');
        homePageButton.textContent = '←'
        productWrapper.appendChild(homePageButton);

    }

}

// *** constructeur pour l'affichage du panier *** //
// ----------------------------------------------- //
function CartProduct(name, id, price, imageUrl, quantity){
    this.name = name;
    this.id = id;
    this.price = price;
    this.imageUrl = imageUrl;
    this.quantity = quantity;


    this.tableRow = function(cartRow){
        // Récupération et affichage du tableau
        const cartTable = document.getElementById('inCart-table')
        cartTable.style.display = 'table';

        // Création ligne de tableau pour produit dans le panier
        cartRow.classList.add('inCart-table_product');
        cartTable.prepend(cartRow);
    }

    this.tableProductImg = function(cartRow){
        // Case + Image produit
        let imgTD = document.createElement('td');
        imgTD.classList.add('inCart-table_product_img');
        cartRow.appendChild(imgTD);
        
        let img = document.createElement('img');
        img.setAttribute('src', `${this.imageUrl}`);
        imgTD.appendChild(img);
    }

    this.tableProductName = function(cartRow){
        // Nom produit
        let productName = document.createElement('td');
        productName.classList.add('inCart-table_product_name');
        productName.innerText = this.name;
        cartRow.appendChild(productName);
    }
    
    this.tableProductPrice = function(cartRow){
        // Prix produit
        let productPrice = document.createElement('td');
        productPrice.classList.add('inCart-table_product_price');
        productPrice.innerText = `$ ${this.price / 100}`;
        cartRow.appendChild(productPrice);
    }

    this.tableProductQuantity = function(cartRow){

        // Case tableau quantité
        let quantityTD = document.createElement('td');
        quantityTD.classList.add('inCart-table_product_quantity');
        cartRow.appendChild(quantityTD);

        // Quantité actuelle
        let quantityNumber = document.createElement('span');
        quantityNumber.classList.add('inCart-table_product_quantity_number');
        quantityNumber.textContent = `Quantité: ${this.quantity}`;
        quantityTD.appendChild(quantityNumber);

        let buttonBox = document.createElement('div');
        buttonBox.classList.add('button-box');
        quantityTD.appendChild(buttonBox);

        // Bouton ajout de produit
        let addProduct = document.createElement('button');
        addProduct.classList.add('add-product');
        addProduct.setAttribute('data-id', this.id)
        addProduct.textContent = '+'
        buttonBox.appendChild(addProduct);

        // Bouton retrait de produit
        let substractProduct = document.createElement('button');
        substractProduct.classList.add('substract-product');
        substractProduct.setAttribute('data-id', this.id)
        substractProduct.textContent = '-'
        buttonBox.appendChild(substractProduct);



        // Ajout produit au clic sur le bouton
        addProduct.addEventListener('click', function(){
            let dataId = addProduct.getAttribute('data-id');
            let notifNumber = localStorage.getItem('notificationNumber');

            if(itemsInCart[dataId].quantity < 15 && itemsInCart[dataId].quantity >= 0){

                itemsInCart[dataId].quantity ++;
                notifNumber ++;
                localStorage.setItem('notificationNumber', notifNumber);
                localStorage.setItem('cart', JSON.stringify(itemsInCart));

                quantityNumber.textContent = `Quantité: ${itemsInCart[dataId].quantity}`;
                window.location.reload();

            }else{
                alert('Si vous souhaitez commander un tel nombre d\'appareils photo, veuillez nous contacter pour confirmer les stocks disponibles. Merci.');
            }
        });

        // Retrqit produit au clic sur le bouton
        substractProduct.addEventListener('click', function(){
            let dataId = substractProduct.getAttribute('data-id');
            let notifNumber = localStorage.getItem('notificationNumber');

                itemsInCart[dataId].quantity --;
                notifNumber --;

                if(itemsInCart[dataId].quantity === 0){
                     // Suppression de l'article dans le panier
                    delete itemsInCart[dataId];

                    // Si le panier est vide, on nettoie le LocalStorage pour ne plus afficher la notification ou le formulaire
                    if(notifNumber === 0){
                        localStorage.clear();

                    // Sinon, on renvoie le reste des élément dans le panier pour l'actualisation de la page.
                    }else{
                        localStorage.setItem('notificationNumber', notifNumber);
                        localStorage.setItem('cart', JSON.stringify(itemsInCart));  
                    }  
                    window.location.reload();
                }

                if(notifNumber != 0){
                    localStorage.setItem('notificationNumber', notifNumber)
                    localStorage.setItem('cart', JSON.stringify(itemsInCart));
    
                    quantityNumber.textContent = `Quantité: ${itemsInCart[dataId].quantity}`;
                    window.location.reload();
                }
                

        });


    }

    this.tableDeleteProduct = function(cartRow, itemId){
        // Bouton supprimer produit
        let deleteProductTD = document.createElement('td');
        deleteProductTD.classList.add('inCart-table_product_delete');
        cartRow.appendChild(deleteProductTD);

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-item');
        deleteButton.textContent = 'X';
        deleteProductTD.appendChild(deleteButton);

        // Evènement permettant de supprimer un produit du panier
        deleteButton.addEventListener('click', function(){
            // On récupère le contenu du panier et le LocalStorage
            let numberOfProduct = itemsInCart[itemId].quantity;
            let notifNumber = localStorage.getItem('notificationNumber');

            // Suppression de l'article dans le panier
            delete itemsInCart[itemId];

            // Modifications de la notification
            notifNumber -= numberOfProduct;

            // Si le panier est vide, on nettoie le LocalStorage pour ne plus afficher la notification
            if(notifNumber === 0){
                localStorage.clear();

            // Sinon, on renvoie le reste des élément dans le panier pour l'actualisation de la page.
            }else{
                localStorage.setItem('notificationNumber', notifNumber);
                localStorage.setItem('cart', JSON.stringify(itemsInCart));  
            }  
            window.location.reload(); 
        });
    }

    this.totalPrice = function(quantity, price){
        return quantity * (price / 100)
    }

}

// *** Fonction d'ajout des éléments dans le panier depuis la page produit*** //
// -------------------------------------------------------------------------- //
function addToCart(cart, articleSelected){
    if (localStorage.length === 0){
        cart[articleSelected.id] = {name: articleSelected.name, id: articleSelected.id, price: articleSelected.price, imageUrl: articleSelected.imageUrl, quantity: 1};
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('notificationNumber', 1)
    }else{
        cart = JSON.parse(localStorage.getItem('cart'));
        const cartEntries = Object.keys(cart)
        let notificationNumber = localStorage.getItem('notificationNumber');

        if(cartEntries.includes(articleSelected.id)){
            cart[articleSelected.id].quantity ++;
            notificationNumber ++;
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('notificationNumber', notificationNumber);

        }else{
            cart[articleSelected.id] = {name: articleSelected.name, id: articleSelected.id, price: articleSelected.price, imageUrl: articleSelected.imageUrl, quantity: 1};
            notificationNumber ++;
            
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('notificationNumber', notificationNumber);
        }  
    }
}

// *** Affichage de la notification pour le nombre d'éléments dans le panier *** //
// ----------------------------------------------------------------------------- //
function cartNotifications(){
    
    let notifications = document.getElementById('notifications');
    
    let notificationNumber = 0;

    if(notifications){ // Condition pour éxecuter le code uniquement sur les pages où le bouton panier est présent
        if(localStorage.length > 0){
            notificationNumber = localStorage.getItem('notificationNumber');

            notifications.style.opacity = '1';
            notifications.textContent = notificationNumber;
        }else{
            notifications.style.opacity = '0';
        }
    }
}

// *** Fonction d'affichage du bouton si tous les inputs sont remplis correctement *** //
// ----------------------------------------------------------------------------------- //
function displayButton(clientOrder){
    if(Object.keys(clientOrder.contact).length != 5){
        let button = document.getElementById('submit-order');
        button.style.backgroundColor = '#68687A';
        button.style.color = '#000000';
        button.style.pointerEvents = 'none';
    }else{
        console.log('all is good');
        let button = document.getElementById('submit-order');
        button.style.backgroundColor = '#6f44c4';
        button.style.color = '#FFFFFF';
        button.style.pointerEvents = 'auto';
        button.style.cursor = 'pointer';
    }
}

// *** Fonction de validation des inputs utilisateur *** //
// ----------------------------------------------------- //
function validateInputs(firstName, lastName, address, city, email, clientOrder){
    
    //Définition des différentes Regex utilisées
    let firstNameRegex = /^[a-zA-Z\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ ']+$/;
    let lastNameRegex = /^[a-zA-Z\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ ']+$/;
    let addressRegex = /^[0-9a-zA-Z\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ ',]+$/;
    let cityRegex = /^[a-zA-Z\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ ']+$/;
    let emailRegex = /^[a-zA-Z0-9.-]+@([a-zA-Z0-]{2,10})+(\.[a-zA-Z]{2,3})+((\.[a-zA-Z]{2,3})?)+$/;
    
    // Fonction de validation de la Regex. Renvoie true si le texte match la Regex
    function isValid(regex, input) {
        return regex.test(input.target.value);
    }

    // Test de chaque input selon la Regex définie

    firstName.addEventListener('change', (e) =>{
        if(isValid(firstNameRegex, e)){
            clientOrder.contact.firstName = e.target.value;
            displayButton(clientOrder);
        }
    });
    
    lastName.addEventListener('change', (e) =>{
        if(isValid(lastNameRegex, e)){
            clientOrder.contact.lastName = e.target.value;
            displayButton(clientOrder);
        }
    });
    
    address.addEventListener('change', (e) =>{
        if(isValid(addressRegex, e)){
            clientOrder.contact.address = e.target.value;
            displayButton(clientOrder);
        }
    });
    
    city.addEventListener('change', (e) =>{
        if(isValid(cityRegex, e)){
            clientOrder.contact.city = e.target.value;
            displayButton(clientOrder);
        }
    });
    
    email.addEventListener('change', (e) =>{
        if(isValid(emailRegex, e)){
            clientOrder.contact.email = e.target.value;
            displayButton(clientOrder);
        }
    });
}

