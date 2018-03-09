class Grid{
    constructor(gridSize){
        this.grid = [];
        this.gridSize = gridSize;
        for(let i = 0; i < gridSize; i++){
            let row = [];
            for(let j = 0; j < gridSize; j++){
                row.push(-1);
            }
            this.grid.push(row);
        }
    }

    RestartGame(){
        for(let i = 0; i < this.gridSize; i++){
            for(let j = 0; j < this.gridSize; j++){
                this.grid[i][j] = -1;
            }
        }
    }

    GetGridSize(){
        return this.grid.length;
    }

    IsSquareEmpty(row, col){
        if(this.GetTileValue(row, col) !== -1){
            return false;
        } else{
            return true;
        }
    }

    GetTileValue(row, col){
        return this.grid[row][col];
    }
    
    SetTileValue(row, col, newValue){
        this.grid[row][col] = newValue;
    }

    AddTile(row, col, value){
        this.SetTileValue(row, col, value);
    }

    MoveTile(fromRow, fromCol, toRow, toCol){
        if(!(fromRow == toRow && fromCol == toCol)){
            this.SetTileValue(toRow, toCol, this.GetTileValue(fromRow, fromCol));
            this.SetTileValue(fromRow, fromCol, -1);
        }
    }

    MergeTiles(fromRow, fromCol, toRow, toCol){
        let newValue = this.GetTileValue(toRow, toCol) + this.GetTileValue(fromRow, fromCol);
        this.SetTileValue(toRow, toCol, newValue);
        this.SetTileValue(fromRow, fromCol, -1);

        return newValue;
    }

    AreEqualValue(row1, col1, row2, col2){
        return this.GetTileValue(row1, col1) === this.GetTileValue(row2, col2);
    }

    GetEmptyPosition(){
        let newPos = {x:-1, y:-1};

        if(this.IsGridFull()) return newPos;

        while(newPos.x === -1){
            let randX = Math.floor(Math.random()*this.GetGridSize());
            let randY = Math.floor(Math.random()*this.GetGridSize());
    
            if(this.IsSquareEmpty(randX, randY)){
                newPos.x = randX;
                newPos.y = randY;
            }
        }
        return newPos;
    }

    IsGridFull(){
        for(let row = 0; row < this.GetGridSize(); row++){
            for(let col = 0; col < this.GetGridSize(); col++){
                if(this.IsSquareEmpty(row, col)){
                    return false;
                }
            }
        }
        return true;
    }

    GetStartingValue(){
        return Math.random() < 0.9 ? 2 : 4;
    }
}