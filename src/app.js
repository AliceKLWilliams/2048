let grid = [[null, null, null], [null, null, null], [null, null, null]];
let gridElement = document.querySelector(".grid");
let gridSize = 3;

window.onload = function(){
    AddEventListeners();
    StartGame();
}

function AddEventListeners(){

}

function GetRandomPosition(){
    let randX = Math.floor(Math.random()*gridSize);
    let randY = Math.floor(Math.random()*gridSize)

    return {x:randX, y:randY};
}

function StartGame(){
    let newPosition = GetRandomPosition();
    let newDiv = document.createElement("div");
    newDiv.classList.add("grid__tile");
    newDiv.textContent = "2";

    let newTile = new Tile(gridElement, newDiv, newPosition.x, newPosition.y);

    grid[newPosition.x][newPosition.y] = newTile;
}
