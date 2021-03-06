class Game{
    constructor(gridSize){
        this.grid = new Grid(gridSize);
        this.view = new GridView(gridSize);
        this.score = 0;

        this.IsKeyPressed = false; // to prevent key holding
        this.isExecuting = false; // to prevent moves during animation
        this.IsGameFinished = false; // to prevent changing the game message when the game ends

        this.AddEventListeners();
    }

    AddEventListeners(){
        window.addEventListener("keydown", this.HandleKeyPress.bind(this), false);
        window.addEventListener("keyup", () => {this.IsKeyPressed = false;});
        document.querySelector(".btn").addEventListener("click", () => {
            this.RestartGame();
        });
    }

    HandleKeyPress(e){
        if(this.IsKeyPressed || this.isExecuting){return;}
    
        this.isExecuting = true;
        this.IsKeyPressed = true;

        let hasMoved = false;
        if(e.key === "ArrowDown"){
            hasMoved = this.HandleArrowDown();
        } else if(e.key === "ArrowUp"){
            hasMoved = this.HandleArrowUp();
        } else if(e.key === "ArrowRight"){
            hasMoved = this.HandleArrowRight();
        } else if(e.key === "ArrowLeft"){
            hasMoved = this.HandleArrowLeft();
        }

        setTimeout(() => {
            if(hasMoved) {this.AddRandomTile();}

            if(!this.grid.IsMoveAvailable() && (!this.IsGameFinished)){
                this.EndGame();
            }

            this.isExecuting = false;
        }, 300);
    }

    HandleArrowLeft(){
        let hasTileMoved = false;
        // Scan Grid Left -> Right
        for(let row = 0; row < this.grid.GetGridSize(); row++){
            for(let col = 1; col <= this.grid.GetGridSize()-1; col++){
                let newCol = this.grid.GetNewColumnLeft(row, col);
                if(newCol !== -1){
                    if(this.grid.IsSquareEmpty(row, newCol)){
                        this.grid.MoveTile(row, col, row, newCol);
                        this.view.MoveTile(row, col, row, newCol);
                    } else {
                        let newValue = this.grid.MergeTiles(row, col, row, newCol);
                        this.view.MergeTiles(row, col, row, newCol, newValue);
                        this.IncreaseScore(newValue);
                    }
                    hasTileMoved = true;
                }
            }
        }
        return hasTileMoved;
    }
    
    HandleArrowRight(){
        let hasTileMoved = false;
        // Scan Grid Right -> Left
        for(let row = 0; row < this.grid.GetGridSize(); row++){
            for(let col = this.grid.GetGridSize() - 2; col >= 0; col--){
                let newCol = this.grid.GetNewColumnRight(row, col);
                if(newCol !== -1){
                    if(this.grid.IsSquareEmpty(row, newCol)){
                        this.grid.MoveTile(row, col, row, newCol);
                        this.view.MoveTile(row, col, row, newCol);
                    } else {
                        let newValue = this.grid.MergeTiles(row, col, row, newCol);
                        this.view.MergeTiles(row, col, row, newCol, newValue);
                        this.IncreaseScore(newValue);
                    }
                    hasTileMoved = true;
                }
            }
        }
        return hasTileMoved;
    }
    
    HandleArrowUp(){
        let hasTileMoved = false;
        // Scan Grid Top Down
        for(let row = 1; row < this.grid.GetGridSize(); row++){
            for(let col = 0; col < this.grid.GetGridSize(); col++){
                let newRow = this.grid.GetNewRowUp(row, col);
                if(newRow !== -1){
                    if(this.grid.IsSquareEmpty(newRow, col)){
                        this.grid.MoveTile(row, col, newRow, col);
                        this.view.MoveTile(row, col, newRow, col);
                    } else {
                        let newValue = this.grid.MergeTiles(row, col, newRow, col);
                        this.view.MergeTiles(row, col, newRow, col, newValue);
                        this.IncreaseScore(newValue);
                    }
                    hasTileMoved = true;
                }
            }
        }
        return hasTileMoved;
    }
    
    HandleArrowDown(){
        let hasTileMoved = false;
        // Scan Grid Bottom Up
        for(let row = this.grid.GetGridSize() - 2; row >= 0; row--){
            for(let col = 0; col < this.grid.GetGridSize(); col++){
                let newRow = this.grid.GetNewRowDown(row, col);
                if(newRow !== -1){
                    if(this.grid.IsSquareEmpty(newRow, col)){
                        this.grid.MoveTile(row, col, newRow, col);
                        this.view.MoveTile(row, col, newRow, col);
                    } else {
                        let newValue = this.grid.MergeTiles(row, col, newRow, col);
                        this.view.MergeTiles(row, col, newRow, col, newValue);
                        this.IncreaseScore(newValue);
                    }
                    hasTileMoved = true;
                }
            }
        }
        return hasTileMoved;
    }

    AddRandomTile(){
        if(!this.grid.IsGridFull()){
            let newPosition = this.grid.GetEmptyPosition();
            let value = this.grid.GetStartingValue();
            this.grid.AddTile(newPosition.x, newPosition.y, value);
            this.view.AddTile(newPosition.x, newPosition.y, value);
        }
    }

    StartGame(){
        for(let i = 0; i < 2; i++){
            this.AddRandomTile();
        }
    }

    IncreaseScore(val){
        this.score += val;
        this.view.SetScore(this.score);
    }

    RestartGame(){
        // Reset the score
        this.score = 0;
        this.view.SetScore(this.score);

        // Reset the model and view
        this.grid.RestartGame();
        this.view.RestartGame();
        
        // Start the game
        this.StartGame();
    }
    
    EndGame(){
        let currentHighScore = localStorage.getItem("high-score");
        if(!currentHighScore || this.score > parseInt(currentHighScore)){
            localStorage.setItem("high-score", this.score);
            this.view.DisplayMessage("New High Score!");
        } else{
            this.view.DisplayMessage("You Lose!");
        }
        this.IsGameFinished = true;
    }
}