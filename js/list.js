window.onload = function() {
    var option = decodeURI(document.location.href.split("?")[1]);
    this.setTitle(option);
    //TODO: Ler local storage para popular lista
    this.getContas(option);
}

function listItemClick(event){
    var option = decodeURI(document.location.href.split("?")[1]);
    var id = event.target.getAttribute("data-nome");
    id = id ? id : event.target.parentElement.getAttribute("data-nome");

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
    list.onclick = listItemClick;
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

function createDate(){
    var dt = new Date();
    var data = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();

    return data;
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

function addConta(){
    var jsonString = localStorage.getItem("contas");
    var jsonObj = JSON.parse(jsonString);
    var option = decodeURI(document.location.href.split("?")[1]);

    var newObj = {
        nome: document.getElementById("nome").value,
        valor: Number(document.getElementById("valor").value),
        data: createDate()
    }

    jsonObj[option].push(newObj);
    localStorage.setItem("contas", JSON.stringify(jsonObj));
    
    //reload page to update values
    document.location.reload();
}

//MODAL FUNCTIONS

function closeModal(event){
    if(event.target.id != "modal" && event.target.className != "btnError"){ 
        return; 
    }
    
    removeValuesAndClose();
}

function removeValuesAndClose(){
    document.getElementById("nome").value = "";
    document.getElementById("valor").value = ""; 

    document.getElementById("modal").style.display = "none";
}

function showModal(){
    document.getElementById("modal").style.display = "flex";
}