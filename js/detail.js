window.onload = function() {
    var option = decodeURI(document.location.href.split("?")[1].split("&")[0]);
    var nome = decodeURI(document.location.href.split("&")[1]);
    this.setTitle(option);
    //TODO: Ler local storage para popular lista
    this.getContas(option, nome);
}

function setTitle(option){
    if(option == 'receber'){
        document.getElementById('titleNavBar').innerText = "A receber";
    } else {
        document.getElementById('titleNavBar').innerText = "A pagar";
    }
}

function getContas(option, nome) {
    var jsonString = localStorage.getItem("contas");
    var jsonObj = jsonString ? JSON.parse(jsonString) : undefined;

    var conta = jsonObj[option].filter(function(el){if(el.nome == nome){return el}})[0];
    //Adiciona valores as tiles
    updateValues(conta);
}

function updateValues(conta) {
    document.getElementById("nome").innerText = conta.nome;
    document.getElementById("valor").innerText = formatNumber(conta.valor);
    document.getElementById("data").innerText = conta.data;
}

function addConta(){
    var jsonString = localStorage.getItem("contas");
    var jsonObj = JSON.parse(jsonString);
    var option = decodeURI(document.location.href.split("?")[1].split("&")[0]);
    var nome = decodeURI(document.location.href.split("&")[1]);

    var conta = jsonObj[option].filter(function(el){if(el.nome == nome){return el}})[0];
    conta.nome = nome;
    conta.valor += Number(document.getElementById("inputValor").value);
    conta.data = createDate();

    localStorage.setItem("contas", JSON.stringify(jsonObj));
    
    //reload page to update values
    document.location.reload();
}

function subConta(){
    var jsonString = localStorage.getItem("contas");
    var jsonObj = JSON.parse(jsonString);
    var option = decodeURI(document.location.href.split("?")[1].split("&")[0]);
    var nome = decodeURI(document.location.href.split("&")[1]);

    var conta = jsonObj[option].filter(function(el){if(el.nome == nome){return el}})[0];
    conta.nome = nome;
    conta.valor -= Number(document.getElementById("inputValor").value);
    conta.data = createDate();

    localStorage.setItem("contas", JSON.stringify(jsonObj));
    
    //reload page to update values
    document.location.reload();
}

function formatNumber(number){
    if(!number.toString().includes('.')){
        number = Number(number).toFixed(2);
    }

    return Number(number).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function createDate(){
    var dt = new Date();
    var data = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();

    return data;
}

function onNavBack(){
    window.history.back();
}
