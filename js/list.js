window.onload = function() {
    var option = document.location.href.split("?")[1];
    this.setTitle(option);
    //TODO: Ler local storage para popular lista
}

function setTitle(option){
    if(option == 'receber'){
        document.getElementById('titleNavBar').innerText = "A receber";
    } else {
        document.getElementById('titleNavBar').innerText = "A pagar";
    }
}

function createList(arrItens){
    arrItens.forEach(item => {
        createListItem(item);
    });
}

function createListItem(item){
    var list = document.createElement("li");
    
}