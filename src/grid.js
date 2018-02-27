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

    AddTile(row, col, newTile){
        this.grid[row][col] = newTile;
    }

    MoveTile(fromRow, fromCol, toRow, toCol){
        let tile = this.GetTile(fromRow, fromCol);

        this.grid[toRow][toCol] = tile;
        this.grid[fromRow][fromCol] = null;

        tile.MoveTo(toRow, toCol);
    }
}