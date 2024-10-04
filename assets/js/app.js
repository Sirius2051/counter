var menos = document.getElementsByClassName('menos')[0];
var mas = document.getElementsByClassName('mas')[0];
var numero = document.getElementsByClassName('numero')[0];

mas.addEventListener('click', function(){
    numero.innerText = parseInt(numero.innerText) + 1;
});
menos.addEventListener('click', function() {
    if (numero.innerText > 0) {
        numero.innerText = parseInt(numero.innerText) - 1;
    }
});