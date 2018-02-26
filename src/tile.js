class Tile{
    constructor(grid, element, row, col){
        this.grid = grid;
        this.element = element;
        this.row = row;
        this.col = col;

        this.SetPosition();
        this.grid.appendChild(this.element);
    }

    CalculateTop(){
        let parentBox = this.grid.getBoundingClientRect();
        
        let gridRow = document.querySelectorAll(".grid__row")[this.row];
        let childBox = gridRow.querySelector(".grid__square").getBoundingClientRect();

        return childBox.top - parentBox.top;
    }

    CalculateLeft(){
        let parentBox = this.grid.getBoundingClientRect();
        let childBox = document.querySelectorAll(".grid__square")[this.col].getBoundingClientRect();

        return childBox.left - parentBox.left;
    }

    MoveTo(row, col){
        this.row = row;
        this.col = col;
        this.SetPosition();
    }

    SetPosition(){
        this.element.style.top = this.CalculateTop() +"px";
        this.element.style.left = this.CalculateLeft() + "px";
    }

    changeNum(newNum){
        this.element.textContent = newNum;
    }

}