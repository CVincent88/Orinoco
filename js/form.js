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
            alert('Veuillez remplir tous les champs du formulaire correctement.');
        });
        
        e.preventDefault();

    });
}










