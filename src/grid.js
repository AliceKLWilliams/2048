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

    AddTile(newTile){
        this.grid[newTile.row][newTile.col] = newTile;
    }

    MoveTile(fromRow, fromCol, toRow, toCol){
        let tile = this.GetTile(fromRow, fromCol);

        this.grid[toRow][toCol] = tile;
        this.grid[fromRow][fromCol] = null;

        tile.MoveTo(toRow, toCol);
    }

    MergeTiles(fromRow, fromCol, toRow, toCol){
        let toTile = this.grid[toRow][toCol];
        let fromTile = this.grid[fromRow][fromCol];

        this.MoveTile(fromRow, fromCol, toRow, toCol);
        
        window.setTimeout(function(){
            toTile.Delete();
            fromTile.SetValue(toTile.GetValue() + fromTile.GetValue());
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
}