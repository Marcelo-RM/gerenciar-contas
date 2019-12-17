window.onload = function(){
    var tiles = document.getElementsByClassName("tile");
    tiles = Array.from(tiles);
    
    tiles.forEach(element => {
        element.onclick = navToList
    });
}

function navToList(event){
    var option = event.target.getAttribute("data-option");
    
    document.location.href = "list.html?" + option;
}