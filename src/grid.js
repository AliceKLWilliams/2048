class Grid{
    constructor(gridSize){
        this.grid = [];
        for(let i = 0; i < gridSize; i++){
            let row = [];
            for(let j = 0; j < gridSize; j++){
                row.push(null);
            }
            this.grid.push(row);
        }

        this.gridElement = document.querySelector(".grid");
    }

    GetGridSize(){
        return this.grid.length;
    }

    IsSquareEmpty(row, col){
        if(this.grid[row][col]){
            return false;
        } else{
            return true;
        }
    }

    GetTile(row, col){
        return this.grid[row][col];
    }

    AddTile(row, col, value){
        let newTile = new Tile(this.gridElement, row, col, value);
        this.grid[newTile.row][newTile.col] = newTile;
    }

    MoveTile(fromRow, fromCol, toRow, toCol){
        if(!(fromRow == toRow && fromCol == toCol)){
            let tile = this.GetTile(fromRow, fromCol);

            this.grid[toRow][toCol] = tile;
            this.grid[fromRow][fromCol] = null;

            tile.MoveTo(toRow, toCol);
        }
    }

    MergeTiles(fromRow, fromCol, toRow, toCol){
        let toTile = this.grid[toRow][toCol];
        let fromTile = this.grid[fromRow][fromCol];
        let newValue = toTile.GetValue() + fromTile.GetValue();

        // Model Things
        this.MoveTile(fromRow, fromCol, toRow, toCol);
        fromTile.SetValue(newValue);
        fromTile.MoveTo(toRow, toCol);

        //View Things
        setTimeout(function(){
            toTile.Delete();
            fromTile.SetViewValue(newValue);
        }, 300);
    }

    AreEqualValue(row1, col1, row2, col2){
        return this.GetTile(row1, col1).GetValue() === this.GetTile(row2, col2).GetValue();
    }

    GetEmptyPosition(){
        let newPos = {x:-1, y:-1};
        while(newPos.x == -1){
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
        let isFull = true;
        for(let row = 0; row < this.GetGridSize(); row++){
            for(let col = 0; col < this.GetGridSize(); col++){
                if(this.IsSquareEmpty(row, col)){
                    isFull = false;
                }
            }
        }
        return isFull;
    }

    AddRandomTile(){
        if(!this.IsGridFull()){
            let newPosition = this.GetEmptyPosition();
            this.AddTile(newPosition.x, newPosition.y, GetStartingValue());
        }
    }
}