let gridSize = 3;

let grid = new GridModel(gridSize);
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

                let i = col;
                while(i >0 && grid.IsSquareEmpty(row, i-1)){
                    i--;
                }


                if(i >0){
                    if(grid.GetTile(row, i-1).GetValue() === grid.GetTile(row, col).GetValue()){
                        grid.MergeTiles(row, col, row, i-1);
                    } else{
                        grid.MoveTile(row, col, row, i);
                    }
                }else{
                    grid.MoveTile(row, col, row, i);
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
                let i = col;
                while(i < grid.GetGridSize()-1 && grid.IsSquareEmpty(row, i+1)){
                    i++;
                }

                if(i< grid.GetGridSize()-1){
                    if(grid.GetTile(row, i+1).GetValue() === grid.GetTile(row, col).GetValue()){
                        grid.MergeTiles(row, col, row, i+1);
                    } else{
                        grid.MoveTile(row, col, row, i);
                    }
                }else{
                    grid.MoveTile(row, col, row, i);
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

                let i = row;
                while(i > 0 && grid.IsSquareEmpty(i-1, col)){
                    i--;
                }

                if(i > 0){
                    if(grid.GetTile(i-1, col).GetValue() === grid.GetTile(row, col).GetValue()){
                        grid.MergeTiles(row, col, i-1, col);
                    } else{
                        grid.MoveTile(row, col, i, col);
                    }
                }else{
                    grid.MoveTile(row, col, i, col);
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

                let i = row;
                while(i < grid.GetGridSize()-1 && grid.IsSquareEmpty(i+1, col)){
                    i++;
                }

                if(i< grid.GetGridSize()-1){
                    if(grid.GetTile(i+1, col).GetValue() === grid.GetTile(row, col).GetValue()){
                        grid.MergeTiles(row, col, i+1, col);
                    } else{
                        grid.MoveTile(row, col,i, col);
                    }
                }else{
                    grid.MoveTile(row, col, i, col);
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

    let t1 = new TileModel(gridElement, 2, 0,  8);
    let t2 = new TileModel(gridElement, 2, 1,  2);
    let t3 = new TileModel(gridElement, 2, 2,  2);

    grid.AddTile(t1);
    grid.AddTile(t2);
    grid.AddTile(t3);
}

function GetStartingValue(){
    return Math.random() < 0.9 ? 2 : 4;
}
