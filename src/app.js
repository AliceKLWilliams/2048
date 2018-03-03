let gridSize = 3;

let grid = new Grid(gridSize);
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

                let currCol = col-1;
                let newCol = -1;
                while(currCol >= 0 && (grid.IsSquareEmpty(row, currCol) || grid.AreEqualValue(row, col, row, currCol))){
                    newCol = currCol;
                    currCol--;
                }

                if(newCol !== -1){
                    if(grid.IsSquareEmpty(row, newCol)){
                        grid.MoveTile(row, col, row, newCol);
                    } else {
                        grid.MergeTiles(row, col, row, newCol);
                    }
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

                let currCol = col+1;
                let newCol = -1;
                while(currCol < grid.GetGridSize() && (grid.IsSquareEmpty(row, currCol) || grid.AreEqualValue(row, col, row, currCol))){
                    newCol = currCol;
                    currCol++;
                }

                if(newCol !== -1){
                    if(grid.IsSquareEmpty(row, newCol)){
                        grid.MoveTile(row, col, row, newCol);
                    } else {
                        grid.MergeTiles(row, col, row, newCol);
                    }
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

                let currRow = row-1;
                let newRow = -1;
                while(currRow >= 0 && (grid.IsSquareEmpty(currRow, col) || grid.AreEqualValue(row, col, currRow, col))){
                    newRow = currRow;
                    currRow--;
                }

                if(newRow !== -1){
                    if(grid.IsSquareEmpty(newRow, col)){
                        grid.MoveTile(row, col, newRow, col);
                    } else {
                        grid.MergeTiles(row, col, newRow, col);
                    }
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

                let currRow = row+1;
                let newRow = -1;
                while(currRow < grid.GetGridSize() && (grid.IsSquareEmpty(currRow, col) || grid.AreEqualValue(row, col, currRow, col))){
                    newRow = currRow;
                    currRow++;
                }

                if(newRow !== -1){
                    if(grid.IsSquareEmpty(newRow, col)){
                        grid.MoveTile(row, col, newRow, col);
                    } else {
                        grid.MergeTiles(row, col, newRow, col);
                    }
                }
            }
        }
    }

}

function StartGame(){
    for(let i = 0; i < 2; i++){
        let newPosition = grid.GetEmptyPosition();
        grid.AddTile(newPosition.x, newPosition.y, GetStartingValue());
    }
}

function GetStartingValue(){
    return Math.random() < 0.9 ? 2 : 4;
}
