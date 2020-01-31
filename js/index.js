window.onload = function(){
    var listItens = document.getElementById('list').children;
    listItens = Array.from(listItens);
    
    listItens.forEach(element => {
        element.onclick = navToList
    });

    getContas();
}

function navToList(event){
    var option = event.target.getAttribute("data-option");
    option = option ? option : event.target.parentElement.getAttribute('data-option');
    option = option ? option : event.target.parentElement.parentElement.getAttribute('data-option');
    document.location.href = "list.html?" + option;
}

function getContas() {
    var jsonString = localStorage.getItem("contas");
    var jsonObj = jsonString ? JSON.parse(jsonString) : undefined;

    if(!jsonObj) {
        //cria dados no local storage vazio
        createEmptyContas();
        //chama de volta para seguir o fluxo normal
        getContas();
    }
    //Adiciona valores as tiles
    atualizaValores(jsonObj);
}

function atualizaValores(contas) {
    if(!contas){return;}
    var totalReceber = 0;
    var totalPagar = 0;

    contas.receber.forEach(function(el){
        totalReceber += el.valor;
    });

    contas.pagar.forEach(function(el){
        totalPagar += el.valor;
    });

    document.getElementById("totalReceber").innerText = formatNumber(totalReceber);
    document.getElementById("totalPagar").innerText = formatNumber(totalPagar);
}

function formatNumber(number){
    if(!number.toString().includes('.')){
        number = Number(number).toFixed(2);
    }

    return Number(number).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function createEmptyContas() {
    var obj = {
        receber: [],
        pagar: []
    }

    localStorage.setItem("contas", JSON.stringify(obj));
}

function deleteAll(){
    localStorage.removeItem("contas");
    document.location.reload();
}