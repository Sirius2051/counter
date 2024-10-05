function copyContent (e) {
    console.log(e)
    navigator.clipboard.writeText(e.target.innerText)
    new Notification("Numero copiado! :)")
}
function valideKey(evt){
    var code = (evt.which) ? evt.which : evt.keyCode;
    if(code==8) { return true; } 
    else if(code>=48 && code<=57) { return true; }
    else{ return false; }
}
document.addEventListener('DOMContentLoaded', () => {

    var menos = document.getElementsByClassName('menos')[0];
    var mas = document.getElementsByClassName('mas')[0];
    var numero = document.getElementsByClassName('numero')[0];
    var reset = document.getElementById('reset');
    var auto = document.getElementById('auto');
    var table = document.getElementById('table');
    var table_body = document.getElementById('table_body');
    var counter = localStorage.length;
    var reset_table = document.getElementById('reset-table');
    var intervalID;

    
    function notifications() {
        if (Notification.permission === "granted") {
            new Notification("Puedes hacer click en un numero para copiarlo! :)");
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification("Puedes hacer click en un numero para copiarlo! :)");
                }
            });
        }
    }
    notifications();

    function updateTable() {
        table_body.innerHTML = "";
        [...Array(localStorage.length).keys()].forEach((count) => {
            table_body.innerHTML += `<div onclick="copyContent(event)">
                <div class="id" onclick="false">
                    ${count}
                </div>
                ${localStorage.getItem(count)}
            </div>`;
        });
    }

    updateTable();
    
    mas.addEventListener('click', () => {
        var steps = parseInt(document.getElementById('steps').value);
        var limit = parseInt(document.getElementById('limit').value);
        if (limit && parseInt(numero.innerText) + steps > limit) {
            return false
        }
        if (!steps) {
            numero.innerText = parseInt(numero.innerText) + 1;
        } else {
            numero.innerText = parseInt(numero.innerText) + steps;
        }
        
    });

    menos.addEventListener('click', () => {
        var steps = parseInt(document.getElementById('steps').value);
        var limit = parseInt(document.getElementById('limit').value);
        if (!steps && numero.innerText > 0) {
            numero.innerText = parseInt(numero.innerText) - 1;
        } else if (steps && parseInt(numero.innerText) >= steps) {
            numero.innerText = parseInt(numero.innerText) - steps;
        }
    });

    reset.addEventListener('click',() => {
        if (numero.innerText > 0) {
            var date = Date.now();
            localStorage.setItem(counter, numero.innerText);
            counter = localStorage.length;
            updateTable();
            numero.innerText = 0;
        }
    });
    reset_table.addEventListener('click', () => {
        localStorage.clear();
        updateTable();
        new Notification("Datos eliminados");
    })
    function autoCount() {
        var steps = parseInt(document.getElementById('steps').value);
        var limit = parseInt(document.getElementById('limit').value);
        if (!steps) {
            numero.innerText = parseInt(numero.innerText) + 1;
        } else {
            numero.innerText = parseInt(numero.innerText) + steps;
        }
        if (limit && parseInt(numero.innerText) + steps > limit) {
            clearInterval(intervalID)
        }
    }
    auto.addEventListener('click', async () => {
        intervalID = setInterval(autoCount, 500);
    });
    
    
})

