if(itemsInCart !== null){
    // Stockage de l'ID des objets dans le panier dans un tableau
    let itemsId = Object.keys(itemsInCart);

    // Objet envoyé à l'API via la requète POST
    let clientOrder = {
        contact: {},
        products: itemsId
    };

    // Objet permettant la validation des inputs du formulaire
    let validInputs = {
        firstName: false,
        lastName: false,
        address: false,
        city: false,
        email: false
    };
    
    // Récupération des inputs du DOM
    let submitButton = document.getElementById('submit-order');
    let firstName = document.getElementById('first-name');
    let lastName = document.getElementById('last-name');
    let address = document.getElementById('address');
    let city = document.getElementById('city');
    let email = document.getElementById('email');

    //Définition des différentes Regex utilisées
    let firstNameRegex = /^[a-zA-Z\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;
    let lastNameRegex = /^[a-zA-Z\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;
    let addressRegex = /^[0-9a-zA-Z\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s",.]+$/;
    let cityRegex = /^[a-zA-Z\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;
    let emailRegex = /^[a-zA-Z0-9.\-]+@([a-zA-Z0-9]{2,10})+(\.[a-zA-Z]{2,3})+((\.[a-zA-Z]{2,3})?)+$/;
    

    // *** Écoute des modifications aux inputs du formulaire et blocage si formulaire mal rempli *** \\
   // ----------------------------------------------------------------------------------------------- \\
    firstName.addEventListener("change", (e) =>{
        // Si l'input matche la Regex, on le passe dans l'objet contact
        if(isValid(firstNameRegex, e)){
            validInputs.firstName = true;
            clientOrder.contact.firstName = e.target.value;
            displayButton(validInputs, submitButton);
        }else{
            validInputs.firstName = false;
            displayButton(validInputs, submitButton);
            alert('Le format du prénom n\'est pas valide');
        }
    });

    lastName.addEventListener("change", (e) =>{
        if(isValid(lastNameRegex, e)){
            validInputs.lastName = true;
            clientOrder.contact.lastName = e.target.value;
            displayButton(validInputs, submitButton);
        }else{
            validInputs.lastName = false;
            displayButton(validInputs, submitButton);
            alert('Le format du nom de famille n\'est pas valide');
        }
    });
    
    address.addEventListener("change", (e) =>{
        if(isValid(addressRegex, e)){
            validInputs.address = true;
            clientOrder.contact.address = e.target.value;
            displayButton(validInputs, submitButton);
        }else{
            validInputs.address = false;
            displayButton(validInputs, submitButton);
            alert('Le format de l\'adresse n\'est pas valide');
        }
    });
    
    city.addEventListener("change", (e) =>{
        if(isValid(cityRegex, e)){
            validInputs.city = true;
            clientOrder.contact.city = e.target.value;
            displayButton(validInputs, submitButton);
        }else{
            validInputs.city = false;
            displayButton(validInputs, submitButton);
            alert('Le format de la ville n\'est pas valide');
        }
    });
    
    email.addEventListener("change", (e) =>{
        if(isValid(emailRegex, e)){
            validInputs.email = true;
            clientOrder.contact.email = e.target.value;
            displayButton(validInputs, submitButton);
        }else{
            validInputs.email = false;
            displayButton(validInputs, submitButton);
            alert('Le format de l\'adresse email n\'est pas valide');
        }
    });
    
    // Écoute du clic sur le bouton de commande
    submitButton.addEventListener('click', (e) =>{
        submitOrder(clientOrder);
        e.preventDefault();
    });
}










