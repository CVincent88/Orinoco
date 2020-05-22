
function Product(name, lenses, id, price, description, imageUrl){
    this.name = name;
    this.lenses = lenses;
    this.id = id;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;

    let defineList = document.getElementById('define-list');
    let newListElt = document.createElement('li');
    let newLinkElt = document.createElement('a');
        
    this.createElt = function(){
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
    
    this.createImg = function(){
        // Contenant pour la photo du produit
        let imgContainer = document.createElement('div');
        imgContainer.classList.add('list-element_link_img');
        newLinkElt.appendChild(imgContainer);
        
        // Photo du produit
        let img = document.createElement('img');
        img.setAttribute('src', this.imageUrl);
        imgContainer.appendChild(img);
    }

    this.createText = function(){
        // Contenant pour le texte
        let textContainer = document.createElement('div');
        textContainer.classList.add('list-element_link_text');
        newLinkElt.appendChild(textContainer);

        // Nom du produit
        let productName = document.createElement('span');
        productName.classList.add('list-element_link_text_name');
        productName.textContent = this.name;
        textContainer.appendChild(productName);

        // Description du produit
        let productDescription = document.createElement('p');
        productDescription.classList.add('list-element_link_text_description');
        productDescription.textContent = this.description;
        textContainer.appendChild(productDescription);
    }

    this.createPrice = function(){
        // Prix du produit
        let productPrice = document.createElement('span');
        productPrice.classList.add('list-element_link_price');
        productPrice.textContent = `$ ${this.price / 100}`;
        newLinkElt.appendChild(productPrice);
    }
    
}
