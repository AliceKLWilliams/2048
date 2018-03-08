class Game{
    constructor(gridSize){
        this.grid = new Grid(gridSize);
        this.IsKeyPressed = false;
        this.isExecuting = false;

        this.AddEventListeners();
    }

    AddEventListeners(){
        window.addEventListener("keydown", this.HandleKeyPress.bind(this), false);
        window.addEventListener("keyup", () => {this.IsKeyPressed = false;});
        document.querySelector(".btn").addEventListener("click", () => {
            this.grid.RestartGame();
            this.StartGame();
        });
    }

    HandleKeyPress(e){
        if(this.IsKeyPressed || this.isExecuting){return;}
    
        this.isExecuting = true;
        this.IsKeyPressed = true;

        if(e.key === "ArrowDown"){
            this.HandleArrowDown(true);
        } else if(e.key === "ArrowUp"){
            this.HandleArrowUp(true);
        } else if(e.key === "ArrowRight"){
            this.HandleArrowRight(true);
        } else if(e.key === "ArrowLeft"){
            this.HandleArrowLeft(true);
        }

        setTimeout(() => {
            this.grid.AddRandomTile(); 

            let canMove = false;
            canMove |= this.HandleArrowDown(false);
            canMove |= this.HandleArrowUp(false);
            canMove |= this.HandleArrowLeft(false);
            canMove |= this.HandleArrowRight(false);

            if(!canMove){
                this.grid.DisplayMessage("You Lose");
            }

            this.isExecuting = false;
        }, 300);
    }

    HandleArrowLeft(executeMove){
        // Scan Grid Left -> Right
        for(let row = 0; row < this.grid.GetGridSize(); row++){
            for(let col = 1; col <= this.grid.GetGridSize()-1; col++){
    
                if(!this.grid.IsSquareEmpty(row, col)){
    
                    let currCol = col-1;
                    let newCol = -1;
                    while(currCol >= 0 && (this.grid.IsSquareEmpty(row, currCol) || this.grid.AreEqualValue(row, col, row, currCol))){
                        newCol = currCol;
                        currCol--;
                    }
    
                    if(newCol !== -1){
                        if(executeMove){
                            if(this.grid.IsSquareEmpty(row, newCol)){
                                this.grid.MoveTile(row, col, row, newCol);
                            } else {
                                this.grid.MergeTiles(row, col, row, newCol);
                            }
                        } else{
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    
    HandleArrowRight(executeMove){
        // Scan Grid Right -> Left
        for(let row = 0; row < this.grid.GetGridSize(); row++){
            for(let col = this.grid.GetGridSize() - 2; col >= 0; col--){
                if(!this.grid.IsSquareEmpty(row, col)){
    
                    let currCol = col+1;
                    let newCol = -1;
                    while(currCol < this.grid.GetGridSize() && (this.grid.IsSquareEmpty(row, currCol) || this.grid.AreEqualValue(row, col, row, currCol))){
                        newCol = currCol;
                        currCol++;
                    }
    
                    if(newCol !== -1){
                        if(executeMove){
                            if(this.grid.IsSquareEmpty(row, newCol)){
                                this.grid.MoveTile(row, col, row, newCol);
                            } else {
                                this.grid.MergeTiles(row, col, row, newCol);
                            }
                        } else{
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    
    HandleArrowUp(executeMove){
        // Scan Grid Top Down
        for(let row = 1; row < this.grid.GetGridSize(); row++){
            for(let col = 0; col < this.grid.GetGridSize(); col++){
                if(!this.grid.IsSquareEmpty(row, col)){
    
                    let currRow = row-1;
                    let newRow = -1;
                    while(currRow >= 0 && (this.grid.IsSquareEmpty(currRow, col) || this.grid.AreEqualValue(row, col, currRow, col))){
                        newRow = currRow;
                        currRow--;
                    }
    
                    if(newRow !== -1){
                        if(executeMove){
                            if(this.grid.IsSquareEmpty(newRow, col)){
                                this.grid.MoveTile(row, col, newRow, col);
                            } else {
                                this.grid.MergeTiles(row, col, newRow, col);
                            }
                        } else{
                            return true;
                        }
                        
                    }
                }
            }
        }
        return false;
    }
    
    HandleArrowDown(executeMove){
        // Scan Grid Bottom Up
        for(let row = this.grid.GetGridSize() - 2; row >= 0; row--){
            for(let col = 0; col < this.grid.GetGridSize(); col++){
                // Only continue if we have a square
                if(!this.grid.IsSquareEmpty(row, col)){
    
                    let currRow = row+1;
                    let newRow = -1;
                    while(currRow < this.grid.GetGridSize() && (this.grid.IsSquareEmpty(currRow, col) || this.grid.AreEqualValue(row, col, currRow, col))){
                        newRow = currRow;
                        currRow++;
                    }
    
                    if(newRow !== -1){
                        if(executeMove){
                            if(this.grid.IsSquareEmpty(newRow, col)){
                                this.grid.MoveTile(row, col, newRow, col);
                            } else {
                                this.grid.MergeTiles(row, col, newRow, col);
                            }
                        } else{
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    StartGame(){
        for(let i = 0; i < 2; i++){
            let newPosition = this.grid.GetEmptyPosition();
            this.grid.AddTile(newPosition.x, newPosition.y, this.grid.GetStartingValue());
        }
    }
}