if(itemsInCart != null){
    let itemsId = Object.keys(itemsInCart);

    let clientOrder = {
        contact: {},
        products: itemsId
    
    };
    let validInputs = new Boolean
    
    let submitOrder = document.getElementById('submit-order');
    let firstName = document.getElementById('first-name');
    let lastName = document.getElementById('last-name');
    let address = document.getElementById('address');
    let city = document.getElementById('city');
    let email = document.getElementById('email');
    
    validateInputs(firstName, lastName, address, city, email, validInputs, clientOrder);
    
    // if(validInputs == false){
    //     let button = document.getElementById('submit-order');
    //     button.style.backgroundColor = '#000';
    //     button.style.pointerEvents = 'none';
    // }else{
    //     console.log('all is good');
    //     let button = document.getElementById('submit-order');
    //     button.style.backgroundColor = '#68687a';
    //     button.style.pointerEvents = 'auto';
    // }
    submitOrder.addEventListener('click', (e) =>{
    
        postData("http://localhost:3000/api/cameras", clientOrder)
        .then((value) =>{ 

            function confirmOrder(firstName, orderId){
                localStorage.setItem('name', `${firstName}`);
                localStorage.setItem('confirmation id', `${orderId}`);
            }

            confirmOrder(value.contact.firstName, value.orderId);
            
            setTimeout(() =>{
                window.location.href = "confirmation.html";
            }, 500);
            
        })
        .catch((error) =>{
            console.log(error);
        });
        
        e.preventDefault();

    });
}










