window.onload = function() {
    var option = document.location.href.split("?")[1];
    this.setTitle(option);
    //TODO: Ler local storage para popular lista
    this.getContas(option);
}

function listItemClick(event){
    var option = document.location.href.split("?")[1];
    var id = event.getAttribute("data-id");

    document.location.href = "detail.html?" + option + "&" + id;
}

function setTitle(option){
    if(option == 'receber'){
        document.getElementById('titleNavBar').innerText = "A receber";
    } else {
        document.getElementById('titleNavBar').innerText = "A pagar";
    }
}

function getContas(option) {
    var jsonString = localStorage.getItem("contas");
    var jsonObj = jsonString ? JSON.parse(jsonString) : undefined;

    //Adiciona valores as tiles
    createList(jsonObj[option]);
}

function createList(arrItens){
    arrItens.forEach(item => {
        createListItem(item);
    });
}

function createListItem(item){
    var list = document.createElement("li");
    list.className = "listItem";
    list.onclick = "listItemClick(this)";
    list.setAttribute("data-nome", item.nome);

    var title = document.createElement("div");
    title.className = "listItemTitle";
    title.innerText = item.nome;

    var valor = document.createElement("div");
    valor.className = "listItemValue";
    valor.innerText = formatNumber(item.valor);
    
    list.appendChild(title);
    list.appendChild(valor);

    document.getElementById("list").appendChild(list);
}

function formatNumber(number){
    if(!number.toString().includes('.')){
        number = Number(number).toFixed(2);
    }

    return Number(number).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function onNavBack(){
    window.history.back();
}