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
                let canMove = true;

                for(let i = col-1; i >= 0; i--){
                    if(grid.IsSquareEmpty(row, i) || grid.AreEqualValue(row, i, row, col)){
                        newCol = i;
                    } else{
                        canMove = false;
                    }
                }

                if(newCol !== -1 && canMove){
                    if(!grid.IsSquareEmpty(row, newCol)){
                        grid.MergeTiles(row, col, row, newCol);
                    } else{
                        grid.MoveTile(row, col, row, newCol);
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
                let newCol = -1;
                let canMove = true;

                for(let i = col+1; i < grid.GetGridSize(); i++){
                    if(grid.IsSquareEmpty(row, i) || grid.AreEqualValue(row, i, row, col)){
                        newCol = i;
                    } else{
                        canMove = false;
                    }
                }

                if(newCol !== -1 && canMove){
                    if(!grid.IsSquareEmpty(row, newCol)){
                        grid.MergeTiles(row, col, row, newCol);
                    } else{
                        grid.MoveTile(row, col, row, newCol);
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
                let newRow = -1;
                let canMove = true;

                for(let i = row-1; i >= 0; i--){
                    if(grid.IsSquareEmpty(i, col) || grid.AreEqualValue(i, col, row, col)){
                        newRow = i;
                    } else{
                        canMove = false;
                    }
                }

                if(newRow !== -1 && canMove){
                    if(!grid.IsSquareEmpty(newRow, col)){
                        grid.MergeTiles(row, col, newRow, col);
                    } else{
                        grid.MoveTile(row, col, newRow, col);
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
                let newRow = -1;
                let canMove = true;

                // Look for the last empty square
                for(let i = row+1; i<grid.GetGridSize(); i++){
                    if(grid.IsSquareEmpty(i, col) || grid.AreEqualValue(i, col, row, col)){
                        newRow = i;
                    } else{
                        canMove = false;
                    }
                }

                if(newRow !== -1 && canMove){
                    if(!grid.IsSquareEmpty(newRow, col)){
                        grid.MergeTiles(row, col, newRow, col);
                    } else{
                        grid.MoveTile(row, col, newRow, col);
                    }
                }
            }
        }
    }

    setTimeout(grid.AddRandomTile.bind(grid), 400);

}

function StartGame(){
    // for(let i = 0; i < 2; i++){
    //     let newPosition = grid.GetEmptyPosition();
    //     let tile = new Tile(gridElement, newPosition.x, newPosition.y, GetStartingValue());
    //     grid.AddTile(tile);
    // }

    let t1 = new Tile(gridElement, 2, 0,  2);
    let t2 = new Tile(gridElement, 2, 1,  4);
    let t3 = new Tile(gridElement, 2, 2,  2);

    grid.AddTile(t1);
    grid.AddTile(t2);
    grid.AddTile(t3);

}

function GetStartingValue(){
    return Math.random() < 0.9 ? 2 : 4;
}
