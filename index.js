// Appel du fichier json //
// --------------------- //
let requestURL = "http://localhost:3000/api/cameras";
let myRequest = new XMLHttpRequest();

myRequest.open('GET', requestURL);
myRequest.send();


// Création liste item //
// --------------------//
let unorderedList = document.getElementById('define-list');

myRequest.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        for(let i = 0; i < response.length; i++ ){
            // création élément de liste
            let newListElt = document.createElement('li');
            newListElt.classList.add('list-element');
            unorderedList.appendChild(newListElt);

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
            // img.classList.add('list-element_img');
            img.setAttribute('src', response[i].imageUrl);
            imgContainer.appendChild(img);

            // Ajout nom produit
            let name = document.createElement('span');
            name.classList.add('list-element_text_name');
            name.textContent = response[i].name;
            textContainer.appendChild(name);

            // Ajout description produit
            let description = document.createElement('p');
            description.classList.add('list-element_text_description');
            description.textContent = response[i].description;
            textContainer.appendChild(description);


            // Ajout prix produit
            let price = document.createElement('span');
            price.classList.add('list-element_price');
            price.textContent = '$ ' + response[i].price / 100;
            newListElt.appendChild(price);
        }
    }
};


