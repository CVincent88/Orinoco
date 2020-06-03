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
    let defineList = document.getElementById("define-list");
    let newListElt = document.createElement("li");
    let newLinkElt = document.createElement("a");
    let textContainer = document.createElement("div");

    // Récupération des éléments du DOM de la page produit
    let productWrapper = document.getElementById("product-wrapper");
    let customizationWrapper = document.getElementById("customization-wrapper");
    let customizationText = document.getElementById("customization-text");
    let customizationOptionsContainer = document.getElementById("customization-options");
    
    this.listElt = function(){
        // création des <li> et assignation propriétés
        newListElt.classList.add("list-element");
        newListElt.setAttribute("data-id", `${this.id}`);
        defineList.appendChild(newListElt);

        // Création du lien vers la page produit
        // let newLinkElt = document.createElement("a");
        newLinkElt.setAttribute("href", `product.html?id=${this.id}`);
        newLinkElt.classList.add("list-element_link");
        newListElt.appendChild(newLinkElt);
    }
    
    this.image = function(){
        if(defineList){ // Si on se trouve sur la page index

            // Contenant pour la photo du produit
            let imgContainer = document.createElement("div");
            imgContainer.classList.add("list-element_link_img");
            newLinkElt.appendChild(imgContainer);
            
            // Photo du produit
            let img = document.createElement("img");
            img.setAttribute("src", this.imageUrl);
            imgContainer.appendChild(img);

        }else if(productWrapper){ // Si on se trouve sur la page poduit
            // Contenant image produit
            let imgWrapper = document.createElement("div");
            imgWrapper.classList.add("product-container_wrapper");
            productWrapper.prepend(imgWrapper);

            // Image produit
            let img = document.createElement("img");
            img.setAttribute("src", `${this.imageUrl}`);
            imgWrapper.prepend(img);
        }
        
    }

    this.textContainer = function(){
        // Contenant pour le texte
        textContainer.classList.add("list-element_link_text");
        newLinkElt.appendChild(textContainer);        
    }

    this.productName = function(){
        if(defineList){
            // Nom du produit
            let productName = document.createElement("h1");
            productName.classList.add("list-element_link_text_name");
            productName.textContent = this.name;
            textContainer.appendChild(productName);

        }else if(productWrapper){
            // Nom produit
            let name = document.createElement("span");
            name.classList.add("product-container_text_name");
            name.innerText = this.name;
            customizationWrapper.insertAdjacentElement("afterend", name);
        }

    }

    this.productDescription = function(){
        if(defineList){
            // Description du produit
            let productDescription = document.createElement("p");
            productDescription.classList.add("list-element_link_text_description");
            productDescription.textContent = this.description;
            textContainer.appendChild(productDescription);

        }else if(productWrapper){
            // Description produit
            let description = document.createElement("p");
            description.classList.add("product-container_text_description");
            description.innerText = this.description;
            customizationWrapper.insertAdjacentElement("afterend", description);
        }
        
    }

    this.productPrice = function(){
        if(defineList){
            // Prix du produit
            let productPrice = document.createElement("span");
            productPrice.classList.add("list-element_link_price");
            productPrice.textContent = `$ ${this.price / 100}`;
            newLinkElt.appendChild(productPrice);
        
        }else if(productWrapper){
            // Prix produit
            let price = document.getElementById("product-price");
            price.textContent = `$ ${this.price / 100}`;
        }
        
    }

    this.customizeProduct = function(article){
        for(j=0; j<article.lenses.length; j++){
            let customizationOptionNumber = article.lenses.length;

            if(customizationOptionNumber <= 1){ // Si une seule lentille disponible, message différent
                customizationText.textContent = "Nous n\"avons que cette lentille pour le moment: "
            }else{
                customizationText.textContent = "Choisissez une lentille: "
            }
            // Options disponibles
            let customizationOption = document.createElement("option")
            customizationOption.innerText = article.lenses[j];
            customizationOptionsContainer.appendChild(customizationOption);
        }
    }

    this.homePage = function(){
        
        let homePageButton = document.createElement("a");
        homePageButton.classList.add("homePage-button");
        homePageButton.setAttribute("href", "index.html");
        homePageButton.textContent = "←"
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


    this.articleRow = function(cartRow){
        // Récupération et affichage du tableau
        const cartContainer = document.getElementById("cartContainer")
        cartContainer.style.display = "div ";

        // Création ligne de tableau pour produit dans le panier
        cartRow.classList.add("cartContainer_product");
        cartContainer.prepend(cartRow);
    }

    this.tableProductImg = function(cartRow){
        // Case + Image produit
        let imgContainer = document.createElement("div");
        imgContainer.classList.add("cartContainer_product_img");
        cartRow.appendChild(imgContainer);
        
        let img = document.createElement("img");
        img.setAttribute("src", `${this.imageUrl}`);
        imgContainer.appendChild(img);
    }

    this.tableProductName = function(cartRow){
        // Nom produit
        let productName = document.createElement("div");
        productName.classList.add("cartContainer_product_name");
        productName.innerText = this.name;
        cartRow.appendChild(productName);
    }
    
    this.tableProductPrice = function(cartRow){
        // Prix produit
        let productPrice = document.createElement("div");
        productPrice.classList.add("cartContainer_product_price");
        productPrice.innerText = `$ ${this.price / 100}`;
        cartRow.appendChild(productPrice);
    }

    this.tableProductQuantity = function(cartRow){

        // Case tableau quantité
        let quantityContainer = document.createElement("div");
        quantityContainer.classList.add("cartContainer_product_quantity");
        cartRow.appendChild(quantityContainer);

        // Quantité actuelle
        let quantityNumber = document.createElement("span");
        quantityNumber.classList.add("cartContainer_product_quantity_number");
        quantityNumber.textContent = `Quantité: ${this.quantity}`;
        quantityContainer.appendChild(quantityNumber);

        let buttonBox = document.createElement("div");
        buttonBox.classList.add("button-box");
        quantityContainer.appendChild(buttonBox);

        // Bouton ajout de produit
        let addProduct = document.createElement("button");
        addProduct.classList.add("add-product");
        addProduct.setAttribute("data-id", this.id)
        addProduct.textContent = "+"
        buttonBox.appendChild(addProduct);

        // Bouton retrait de produit
        let subtractProduct = document.createElement("button");
        subtractProduct.classList.add("subtract-product");
        subtractProduct.setAttribute("data-id", this.id)
        subtractProduct.textContent = "-"
        buttonBox.appendChild(subtractProduct);

        addArticle(addProduct, quantityNumber);

        subtractArticle(subtractProduct, quantityNumber);
    }

    this.tableDeleteProduct = function(cartRow, itemId){
        // Bouton supprimer produit
        let deleteProductContainer = document.createElement("div");
        deleteProductContainer.classList.add("cartContainer_product_delete");
        cartRow.appendChild(deleteProductContainer);

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-item");
        deleteButton.textContent = "X";
        deleteProductContainer.appendChild(deleteButton);

        deleteArticle(deleteButton, itemId)
    }

    this.totalPrice = function(quantity, price){
        return quantity * (price / 100)
    }

}