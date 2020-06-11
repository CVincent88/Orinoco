let clientName = document.getElementById('client-name');
let orderId = document.getElementById('order-id');
let totalPrice = document.getElementById('total-price');

clientName.textContent = `${sessionStorage.getItem('name')}`;
totalPrice.textContent = `Montant total de votre commande: $${localStorage.getItem('totalPrice')}`
orderId.textContent = `${sessionStorage.getItem('confirmation id')}`;

localStorage.clear();
sessionStorage.clear();