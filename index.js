// Envoi des données sur la page principale //
// -----------------------------------------//
let unorderedList = document.getElementById('elt-unordered-list');



let requestURL = "http://localhost:3000/api/cameras";
let myRequest = new XMLHttpRequest();


myRequest.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response.length);
        for(let i = 0; i < response.length; i++ ){
            let newListElt = document.createElement('li');
            newListElt.classList.add('list-element');
            unorderedList.appendChild(newListElt);
        }
    }
};

myRequest.open('GET', requestURL);
myRequest.send()





