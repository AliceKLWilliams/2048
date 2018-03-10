class GridView{
    constructor(gridSize){
        this.gridElement = document.querySelector(".grid");
        this.messageElement = document.querySelector(".msg");

        this.CreateView(gridSize);
    }

    RestartGame(){
        let tiles = [...document.querySelectorAll(".grid__tile")];
        tiles.forEach(function(tile){
            this.gridElement.removeChild(tile);
        }.bind(this));

        this.messageElement.textContent = "";
    }

    CreateView(gridSize){
        for(let i = 0; i < gridSize; i++){
            let gridRow = document.createElement("div");
            gridRow.classList.add("grid__row");
            this.gridElement.appendChild(gridRow);
            for (let j = 0; j < gridSize; j++){
                let gridSquare = document.createElement("div");
                gridSquare.classList.add("grid__square");
                gridRow.appendChild(gridSquare);
            }
        }

    }

    AddTile(row, col, value){
        let newDiv = document.createElement("div");
        newDiv.classList.add("grid__tile", "grid__tile--"+value, "r"+row+"-c"+col);

        newDiv.textContent = value;

        newDiv.style.top = this.CalculateTop(row) + "px";
        newDiv.style.left = this.CalculateLeft(col) + "px";

        this.gridElement.appendChild(newDiv);
    }

    MoveTile(fromRow, fromCol, toRow, toCol){
        let tile = this.GetTile(fromRow, fromCol);

        tile.style.top = this.CalculateTop(toRow)+ "px";
        tile.style.left = this.CalculateLeft(toCol)+ "px";

        tile.className = "";
        tile.classList.add("grid__tile", "grid__tile--"+tile.textContent, "r"+toRow+"-c"+toCol);
    }
    
    MergeTiles(fromRow, fromCol, toRow, toCol, newValue){
        this.MoveTile(fromRow, fromCol, toRow, toCol);
        setTimeout(() => {
            this.DeleteTile(toRow, toCol);
            this.SetTileValue(toRow, toCol, newValue);
            this.AddToScore(newValue);
        }, 300);
    }

    AddToScore(val){
        let scoreElement = document.querySelector(".score");
        let score = parseInt(scoreElement.textContent);
        score += val;
        scoreElement.textContent = score;
    }
    
    SetTileValue(row, col, newValue){
        let tile = this.GetTile(row, col);
        tile.textContent = newValue;
        tile.className = "";
        tile.classList.add("grid__tile", "grid__tile--"+newValue, "r"+row+"-c"+col);

        let valLength = newValue.toString().split("").length;
        if(valLength > 3){
            tile.style.fontSize = (28*(3/valLength)) + "pt";
        }
    }

    DeleteTile(row, col){
        let tileToDelete = this.gridElement.querySelector(".r"+row+"-c"+col);
        this.gridElement.removeChild(tileToDelete);
    }

    CalculateTop(row){
        let parentBox = this.gridElement.getBoundingClientRect();
        
        let gridRow = document.querySelectorAll(".grid__row")[row];
        let childBox = gridRow.querySelector(".grid__square").getBoundingClientRect();

        return childBox.top - parentBox.top;
    }

    CalculateLeft(col){
        let parentBox = this.gridElement.getBoundingClientRect();
        let childBox = document.querySelectorAll(".grid__square")[col].getBoundingClientRect();

        return childBox.left - parentBox.left;
    }

    GetTile(row, col){
        return this.gridElement.querySelector(".r"+row+"-c"+col);
    }

    DisplayMessage(msg){
        this.messageElement.textContent = msg;
    }
}