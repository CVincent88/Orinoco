if(itemsInCart != null){
    let itemsId = Object.keys(itemsInCart);

    let clientOrder = {
        contact: {},
        products: itemsId
    
    };
    let validInputs = false
    
    let submitOrder = document.getElementById('submit-order');
    let firstName = document.getElementById('first-name');
    let lastName = document.getElementById('last-name');
    let address = document.getElementById('address');
    let city = document.getElementById('city');
    let email = document.getElementById('email');
    
    validateInputs(firstName, lastName, address, city, email, clientOrder);
    
    
    submitOrder.addEventListener('click', (e) =>{

        submitData(clientOrder);

        e.preventDefault();
    });
}










