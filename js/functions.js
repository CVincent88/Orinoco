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
function postData(url, object) {
    return new Promise((resolve, reject) =>{
        const myRequest = new XMLHttpRequest();
        myRequest.open("POST", url + '/order');
        myRequest.setRequestHeader("Content-Type", "application/json");
        myRequest.onload = () => resolve(JSON.parse(myRequest.responseText))
        myRequest.onerror = () => reject(JSON.parse(myRequest.statusText));
        myRequest.send(JSON.stringify(object));
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

}

// *** constructeur pour l'affichage du panier *** //
// ----------------------------------------------- //
function CartProduct(name, lenses, id, price, description, imageUrl, quantity){
    this.name = name;
    this.lenses = lenses;
    this.id = id;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.quantity = quantity;


    this.tableRow = function(cartRow){
        // Récupération et affichage du tableau
        const cartTable = document.getElementById('in-cart')
        cartTable.style.display = 'table';

        // Création ligne de tableau pour produit dans le panier
        cartRow.classList.add('in-cart_product');
        cartTable.prepend(cartRow);
    }

    this.tableProductImg = function(cartRow){
        // Case + Image produit
        let imgTD = document.createElement('td');
        imgTD.classList.add('in-cart_product_img');
        cartRow.appendChild(imgTD);
        
        let img = document.createElement('img');
        img.setAttribute('src', `${this.imageUrl}`);
        imgTD.appendChild(img);
    }

    this.tableProductName = function(cartRow){
        // Nom produit
        let productName = document.createElement('td');
        productName.classList.add('in-cart_product_name');
        productName.innerText = this.name;
        cartRow.appendChild(productName);
    }
    
    this.tableProductPrice = function(cartRow){
        // Prix produit
        let productPrice = document.createElement('td');
        productPrice.classList.add('in-cart_product_price');
        productPrice.innerText = `$ ${this.price / 100}`;
        cartRow.appendChild(productPrice);
    }

    this.tableProductQuantity = function(cartRow, quantity, item){
        // Case tableau quantité
        let quantityTD = document.createElement('td');
        quantityTD.classList.add('in-cart_product_quantity');
        cartRow.appendChild(quantityTD);

        // Quantité actuelle
        let quantityNumber = document.createElement('span');
        quantityNumber.classList.add('in-cart_product_quantity_number');
        quantityNumber.textContent = `Quantité: ${this.quantity}`;
        quantityTD.appendChild(quantityNumber);

        // Bouton ajout de produit
        let addProduct = document.createElement('button');
        addProduct.classList.add('add-product');
        addProduct.textContent = '+'
        quantityTD.appendChild(addProduct);

        // Bouton retrait de produit
        let substractProduct = document.createElement('button');
        substractProduct.classList.add('add-product');
        substractProduct.textContent = '-'
        quantityTD.appendChild(substractProduct);
        console.log(this.name + ' ' + quantity);

        // Ajout produit au clic sur le bouton
        addProduct.addEventListener('click', function(){
            if(quantity < 15 && quantity > 0){
                quantity ++;
                localStorage.setItem(localStorage.length + 1, JSON.stringify(item));
                quantityNumber.textContent = `Quantité: ${quantity}`;
            }else{
                alert('Si vous souhaitez commander un tel nombre d\'appareils photo, veuillez nous contacter pour confirmer les stocks disponibles. Merci.');
            }
        })

        // Soustraction produit au clic sur le bouton
        substractProduct.addEventListener('click', function(){
            if(quantity > 0){
                quantity --;
                quantityNumber.textContent = `Quantité: ${quantity}`;
            }else{
                // Supprime l'élément
            }
            
        })
    }

    this.tableDeleteProduct = function(cartRow, array, item){
        // Bouton supprimer produit
        let deleteProductTD = document.createElement('td');
        deleteProductTD.classList.add('in-cart_product_delete');
        cartRow.appendChild(deleteProductTD);

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-item');
        deleteButton.textContent = 'X';
        deleteProductTD.appendChild(deleteButton);

        deleteButton.addEventListener('click', function(){
            delete array[item];
            window.location.reload(); // ça marche pô !!!
        });
    }

    this.totalPrice = function(quantity, price){
        return quantity * (price / 100)
    }

}

// *** Fonction d'ajout des éléments dans le panier *** //
// ---------------------------------------------------- //
function addToCart(itemsInCart, elementInLocalStorage){
    // Si le panier est vide, on ajoute le premier élément et on lui ajoute une propriété quantité
    if(itemsInCart.length === 0){ 
        itemsInCart.push(elementInLocalStorage)
        itemsInCart[0].quantity = 1;

    // Si il y a déjà au ,oins un article dans le panier:
    }else if(itemsInCart.length > 0){

        // On récupère les Id des articles déjà dans le panier dans un tableau
        let itemsInCartIds = itemsInCart.map(array => array.id)

        // Si l'Id de l'article à ajouter se trouve dans le tableau
        if(itemsInCartIds.includes(elementInLocalStorage.id)){

            // On boucle dans le tableau pour ajouter 1 à la quantité
            for(j=0; j<itemsInCart.length; j++){
                if(itemsInCart[j].id === elementInLocalStorage.id){
                    if(!itemsInCart[j].quantity){
                        itemsInCart[j].quantity = 1;
                    }else{
                        itemsInCart[j].quantity ++;
                    }
                }
            }
        // Si l'Id de l'article à ajouter ne se trouve pas dans le tableau, on ajoute l'article au panier et on lui ajoute une propriété quantité
        }else{
            let indexToPush = itemsInCart.length;
            itemsInCart.push(elementInLocalStorage);
            itemsInCart[indexToPush].quantity = 1;

        }
    }else{
        console.log('Erreur dans la fonction d\'ajout au panier');
    }
}

// *** Affichage de la notification pour le nombre d'éléments dans le panier *** //
// ----------------------------------------------------------------------------- //
function cartNotifications(){
    let cart = localStorage;
    let numberEltCart = cart.length;
    let notifications = document.getElementById('notifications');

    if(notifications){ // Condition pour éxecuter le code uniquement sur les pages où le bouton panier est présent
        if(numberEltCart > 0){
            notifications.style.opacity = '1';
            notifications.textContent = numberEltCart;
        }else{
            notifications.style.opacity = '0';
        }
    }
}

// *** Fonction de validation des inputs utilisateur *** //
// ----------------------------------------------------- //
function validateInputs(firstName, lastName, address, city, email, validInputs, clientOrder){
    let firstNameRegex = /^[a-zA-Z\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ ']+$/;
    let lastNameRegex = /^[a-zA-Z\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ ']+$/;
    let addressRegex = /^[0-9a-zA-Z\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ ',]+$/;
    let cityRegex = /^[a-zA-Z\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ ']+$/;
    let emailRegex = /^[a-zA-Z0-9.-]+@([a-zA-Z0-]{2,10})+(\.[a-zA-Z]{2,3})+((\.[a-zA-Z]{2,3})?)+$/;
    

    function isValid(regex, input) {
        return regex.test(input.target.value);
    }

    firstName.addEventListener('change', (e) =>{
        if(isValid(firstNameRegex, e)){
            clientOrder.contact.firstName = e.target.value;
            validInputs = true;
        }else{
            validInputs = false;
        }
    });
    
    lastName.addEventListener('change', (e) =>{
        if(isValid(lastNameRegex, e)){
            clientOrder.contact.lastName = e.target.value;
            validInputs = true;
        }else{
            validInputs = false;
        }
    });
    
    address.addEventListener('change', (e) =>{
        if(isValid(addressRegex, e)){
            clientOrder.contact.address = e.target.value;
            validInputs = true;
        }else{
            validInputs = false;

        }
    });
    
    city.addEventListener('change', (e) =>{
        if(isValid(cityRegex, e)){
            clientOrder.contact.city = e.target.value;
            validInputs = true;
        }else{
            validInputs = false;

        }
    });
    
    email.addEventListener('change', (e) =>{
        if(isValid(emailRegex, e)){
            clientOrder.contact.email = e.target.value;
            validInputs = true;
        }else{
            validInputs = false;
        }
    });
}