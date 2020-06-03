if(itemsInCart != null){
    let itemsId = Object.keys(itemsInCart);

    let clientOrder = {
        contact: {},
        products: itemsId
    };
    let validInputs = false
    
    let submitButton = document.getElementById('submit-order');
    let firstName = document.getElementById('first-name');
    let lastName = document.getElementById('last-name');
    let address = document.getElementById('address');
    let city = document.getElementById('city');
    let email = document.getElementById('email');
    
    validateInputs(firstName, lastName, address, city, email, clientOrder);
    
    
    submitButton.addEventListener('click', (e) =>{
        
        submitOrder(clientOrder);
        e.preventDefault();

    });
}










