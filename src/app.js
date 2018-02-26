let grid = [[null, null, null], [null, null, null], [null, null, null]];
let gridElement = document.querySelector(".grid");
let gridSize = 3;

window.onload = function(){
    AddEventListeners();
    StartGame();
}

function AddEventListeners(){
    window.addEventListener("keydown", handleKeyPress, false);
}

function handleKeyPress(e){
    if(e.key == "ArrowDown"){
        HandleArrowDown();
    }
}

function HandleArrowDown(){
    // Change Representations
    for(let row = gridSize - 2; row >= 0; row--){
        for(let col = 0; col < gridSize; col++){
            if(grid[row][col]){
                let tile = grid[row][col];
                tile.MoveTo(row+1, col);

                // Move tile in Model representation
                grid[row+1][col] = tile;
                grid[row][col] = null;
            }
        }
    }
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
