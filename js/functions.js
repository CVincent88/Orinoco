// *** GET request promise *** //
// --------------------------- //
function getData(url) {
    return new Promise((resolve, reject) => {
        const myRequest = new XMLHttpRequest();
        myRequest.open("GET", url);
        myRequest.onload = () => resolve(JSON.parse(myRequest.responseText));
        myRequest.onerror = () => reject(JSON.parse(myRequest.statusText));
        myRequest.send();
    });
}

// *** POST request promise *** //
// ---------------------------- //
function postData(url, objectToPost) {
    return new Promise((resolve, reject) =>{
        const myRequest = new XMLHttpRequest();
        myRequest.open("POST", url + "/order");
        myRequest.setRequestHeader("Content-Type", "application/json");
        myRequest.onload = () => resolve(JSON.parse(myRequest.responseText))
        myRequest.onerror = () => reject(JSON.parse(myRequest.statusText));
        myRequest.send(JSON.stringify(objectToPost));
    });
}

// *** Récupération des données JSON et appel du constructeur pour l'index.html *** //
// -------------------------------------------------------------------------------- //
async function buildIndex(){
    try{
        let response = await getData("http://localhost:3000/api/cameras/");
        for(i=0; i<response.length; i++){
            let newArticle = new Product(response[i].name, response[i].lenses, response[i]._id, response[i].price, response[i].description, response[i].imageUrl);
            
            newArticle.listElt();
            newArticle.image();
            newArticle.textContainer();
            newArticle.productName();
            newArticle.productDescription();
            newArticle.productPrice();
        }
        cartNotifications();
    }catch(error){
        console.log('oupsy');
    }
}

// *** Construction du product.html *** //
// ------------------------------------ //
async function buildProductPage(){
    try{
        let response = await getData("http://localhost:3000/api/cameras/" + idProduct); // Appel de la promesse

        // Appel du constructeur
        let articleSelected = new Product(response.name, response.lenses, response._id, response.price, response.description, response.imageUrl);

        articleSelected.image();
        articleSelected.customizeProduct(response);
        articleSelected.productName();
        articleSelected.productDescription();
        articleSelected.productPrice();
        articleSelected.homePage();
        
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
            notif.style.animationPlayState = 'initial';
            setTimeout(()=>{
                notif.style.animationPlayState = 'paused';
            }, 1500);
        });
    }catch(error){
        console.log(error);
    }
}

// *** Envoi de la commande au serveur et récupération de l'ID de commande *** //
// --------------------------------------------------------------------------- //
async function submitOrder(clientOrder){
    try{
        const response = await postData("http://localhost:3000/api/cameras", clientOrder);

        function orderConfirmation(firstName, orderId){
            localStorage.setItem('name', `${firstName}`);
            localStorage.setItem('confirmation id', `${orderId}`);
        }
    
        orderConfirmation(response.contact.firstName, response.orderId);
        window.location.href = "confirmation.html"

    }catch(error){
        console.log(error);
    }

}

// Ajoute une instance à un article déjà dans le panier
function addArticle(addProduct, quantityNumber){
    addProduct.addEventListener("click", function(){ 
        let dataId = addProduct.dataset.id;
        let notifNumber = localStorage.getItem("notificationNumber");

        if(itemsInCart[dataId].quantity < 15 && itemsInCart[dataId].quantity >= 0){

            itemsInCart[dataId].quantity ++;
            notifNumber ++;
            localStorage.setItem("notificationNumber", notifNumber);
            localStorage.setItem("cart", JSON.stringify(itemsInCart));

            quantityNumber.textContent = `Quantité: ${itemsInCart[dataId].quantity}`;
            window.location.reload();

        }else{
            alert("Si vous souhaitez commander un tel nombre d\"appareils photo, veuillez nous contacter pour confirmer les stocks disponibles. Merci.");
        }
    });
}

// Supprime une instance d'un article dans le panier
function subtractArticle(subtractProduct, quantityNumber){
    subtractProduct.addEventListener("click", function(){
        let dataId = subtractProduct.getAttribute("data-id");
        let notifNumber = localStorage.getItem("notificationNumber");

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
                localStorage.setItem("notificationNumber", notifNumber);
                localStorage.setItem("cart", JSON.stringify(itemsInCart));  
            }  
            window.location.reload();
        }

        if(notifNumber != 0){
            localStorage.setItem("notificationNumber", notifNumber)
            localStorage.setItem("cart", JSON.stringify(itemsInCart));

            quantityNumber.textContent = `Quantité: ${itemsInCart[dataId].quantity}`;
            window.location.reload();
        }
    });
}

// Supprime un article du panier (ainsi que toutes ces instances)
function deleteArticle(deleteButton, itemId){
    // Evènement permettant de supprimer un produit du panier
    deleteButton.addEventListener("click", function(){
        // On récupère le contenu du panier et le LocalStorage
        let numberOfProduct = itemsInCart[itemId].quantity;
        let notifNumber = localStorage.getItem("notificationNumber");

        // Suppression de l'article dans le panier
        delete itemsInCart[itemId];

        // Modifications de la notification
        notifNumber -= numberOfProduct;

        // Si le panier est vide, on nettoie le LocalStorage pour ne plus afficher la notification
        if(notifNumber === 0){
            localStorage.clear();

        // Sinon, on renvoie le reste des élément dans le panier pour l'actualisation de la page.
        }else{
            localStorage.setItem("notificationNumber", notifNumber);
            localStorage.setItem("cart", JSON.stringify(itemsInCart));  
        }  
        window.location.reload(); 
    });
}

// *** Fonction d"ajout des éléments dans le panier depuis la page produit*** //
// -------------------------------------------------------------------------- //
function addToCart(cart, articleSelected){
    if (localStorage.length === 0){
        cart[articleSelected.id] = {name: articleSelected.name, id: articleSelected.id, price: articleSelected.price, imageUrl: articleSelected.imageUrl, quantity: 1};
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("notificationNumber", 1)
    }else{
        cart = JSON.parse(localStorage.getItem("cart"));
        const cartEntries = Object.keys(cart)
        let notificationNumber = localStorage.getItem("notificationNumber");

        if(cartEntries.includes(articleSelected.id)){
            cart[articleSelected.id].quantity ++;
            notificationNumber ++;
            localStorage.setItem("cart", JSON.stringify(cart));
            localStorage.setItem("notificationNumber", notificationNumber);

        }else{
            cart[articleSelected.id] = {name: articleSelected.name, id: articleSelected.id, price: articleSelected.price, imageUrl: articleSelected.imageUrl, quantity: 1};
            notificationNumber ++;
            
            localStorage.setItem("cart", JSON.stringify(cart));
            localStorage.setItem("notificationNumber", notificationNumber);
        }  
    }
}

// *** Affichage de la notification pour le nombre d"éléments dans le panier *** //
// ----------------------------------------------------------------------------- //
function cartNotifications(){
    
    let notifications = document.getElementById("notifications");
    
    let notificationNumber = 0;

    if(notifications){ // Condition pour éxecuter le code uniquement sur les pages où le bouton panier est présent
        if(localStorage.length > 0){
            notificationNumber = localStorage.getItem("notificationNumber");

            notifications.style.opacity = "1";
            notifications.textContent = notificationNumber;
        }else{
            notifications.style.opacity = "0";
        }
    }
}

// *** Fonction d"affichage du bouton si tous les inputs sont remplis correctement *** //
// ----------------------------------------------------------------------------------- //
function displayButton(clientOrder){

    if(Object.keys(clientOrder.contact).length != 5){
        let button = document.getElementById("submit-order");
        button.style.backgroundColor = "#68687A";
        button.style.color = "#000000";
        button.style.pointerEvents = "none";
    }else{
        let button = document.getElementById("submit-order");
        button.style.backgroundColor = "#6f44c4";
        button.style.color = "#FFFFFF";
        button.style.pointerEvents = "auto";
        button.style.cursor = "pointer";
    }
}

// *** Fonction de validation des inputs utilisateur *** //
// ----------------------------------------------------- //
function validateInputs(firstName, lastName, address, city, email, clientOrder){
    
    //Définition des différentes Regex utilisées
    let firstNameRegex = /^[a-zA-Z\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;
    let lastNameRegex = /^[a-zA-Z\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;
    let addressRegex = /^[0-9a-zA-Z\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s",]+$/;
    let cityRegex = /^[a-zA-Z\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;
    let emailRegex = /^[a-zA-Z0-9.\-]+@([a-zA-Z0-9]{2,10})+(\.[a-zA-Z]{2,3})+((\.[a-zA-Z]{2,3})?)+$/;
    
    // Fonction de validation de la Regex. Renvoie true si le texte match la Regex
    function isValid(regex, input) {
        return regex.test(input.target.value);
    }

    // Test de chaque input selon la Regex définie

    firstName.addEventListener("change", (e) =>{
        if(isValid(firstNameRegex, e)){
            clientOrder.contact.firstName = e.target.value;
            displayButton(clientOrder);
        }
    });
    
    lastName.addEventListener("change", (e) =>{
        if(isValid(lastNameRegex, e)){
            clientOrder.contact.lastName = e.target.value;
            displayButton(clientOrder);
        }
    });
    
    address.addEventListener("change", (e) =>{
        if(isValid(addressRegex, e)){
            clientOrder.contact.address = e.target.value;
            displayButton(clientOrder);
        }
    });
    
    city.addEventListener("change", (e) =>{
        if(isValid(cityRegex, e)){
            clientOrder.contact.city = e.target.value;
            displayButton(clientOrder);
        }
    });
    
    email.addEventListener("change", (e) =>{
        if(isValid(emailRegex, e)){
            clientOrder.contact.email = e.target.value;
            displayButton(clientOrder);
        }
    });
}


module.exports = {
    getData, 
    postData
}