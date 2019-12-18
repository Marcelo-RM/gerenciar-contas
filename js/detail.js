window.onload = function() {
    var option = document.location.href.split("?")[1].split("&")[0];
    var id = document.location.href.split("&")[1];
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

function onNavBack(){
    window.history.back();
}
