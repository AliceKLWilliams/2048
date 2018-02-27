let gridSize = 3;

let grid = new Grid(gridSize);
let gridElement = document.querySelector(".grid");
let keypress = false;

window.onload = function(){
    AddEventListeners();
    StartGame();
}

function AddEventListeners(){
    window.addEventListener("keydown", handleKeyPress, false);
    window.addEventListener("keyup", function(){keypress = false});
}

function handleKeyPress(e){
    if(keypress){return;}

    if(e.key == "ArrowDown"){
        HandleArrowDown();
    } else if(e.key == "ArrowUp"){
        HandleArrowUp();
    } else if(e.key == "ArrowRight"){
        HandleArrowRight();
    } else if(e.key == "ArrowLeft"){
        HandleArrowLeft();
    }

    keypress = true;
}

function HandleArrowLeft(){
    // Scan Grid Left -> Right
    for(let row = 0; row < grid.GetGridSize(); row++){
        for(let col = 1; col <= grid.GetGridSize()-1; col++){
            if(!grid.IsSquareEmpty(row, col)){
                let newCol = -1;

                for(let i = col-1; i >= 0; i--){
                    if(grid.IsSquareEmpty(row, i)){
                        newCol = i;
                    }
                }

                if(newCol !== -1){
                    grid.MoveTile(row, col, row, newCol);
                }
            }
        }
    }
}

function HandleArrowRight(){
    // Scan Grid Right -> Left
    for(let row = 0; row < grid.GetGridSize(); row++){
        for(let col = grid.GetGridSize() - 2; col >= 0; col--){
            if(!grid.IsSquareEmpty(row, col)){
                let newCol = -1;

                for(let i = col+1; i < grid.GetGridSize(); i++){
                    if(grid.IsSquareEmpty(row, i)){
                        newCol = i;
                    }
                }

                if(newCol !== -1){
                    grid.MoveTile(row, col, row, newCol);
                }
            }
        }
    }
}

function HandleArrowUp(){
    // Scan Grid Top Down
    for(let row = 1; row < grid.GetGridSize(); row++){
        for(let col = 0; col < grid.GetGridSize(); col++){
            if(!grid.IsSquareEmpty(row, col)){
                let newRow = -1;

                for(let i = row-1; i >= 0; i--){
                    if(grid.IsSquareEmpty(i, col)){
                        newRow = i;
                    }
                }

                if(newRow !== -1){
                    grid.MoveTile(row, col, newRow, col);
                }
            }
        }
    }
}

function HandleArrowDown(){
    // Scan Grid Bottom Up
    for(let row = grid.GetGridSize() - 2; row >= 0; row--){
        for(let col = 0; col < grid.GetGridSize(); col++){
            // Only continue if we have a square
            if(!grid.IsSquareEmpty(row, col)){
                let newRow = -1;

                // Look for the last empty square
                for(let i = row+1; i<grid.GetGridSize(); i++){
                    if(grid.IsSquareEmpty(i, col)){
                        newRow = i;
                    }
                }

                // Move square if needed
                if(newRow !== -1){
                    grid.MoveTile(row, col, newRow, col);
                }
            }
        }
    }
}

function GetRandomPosition(){
    let randX = Math.floor(Math.random()*grid.GetGridSize());
    let randY = Math.floor(Math.random()*grid.GetGridSize())

    return {x:randX, y:randY};
}

function StartGame(){
    let newPosition = GetRandomPosition();

    let newTile = new Tile(gridElement, newPosition.x, newPosition.y);
    
    grid.AddTile(newPosition.x, newPosition.y, newTile);
}
