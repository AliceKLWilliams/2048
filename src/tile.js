class Tile{
    constructor(gridElement, row, col, value){
        this.gridElement = gridElement;
        this.row = row;
        this.col = col;
        this.value = value;
        
        this.element = null;

        this.CreateElement();
    }
    
    CreateElement(){
        let newDiv = document.createElement("div");
        newDiv.classList.add("grid__tile");
        newDiv.classList.add("grid__tile--"+this.value);

        newDiv.textContent = this.value;

        this.element = newDiv;

        this.SetPosition();
        this.gridElement.appendChild(this.element);
    }

    CalculateTop(){
        let parentBox = this.gridElement.getBoundingClientRect();
        
        let gridRow = document.querySelectorAll(".grid__row")[this.row];
        let childBox = gridRow.querySelector(".grid__square").getBoundingClientRect();

        return childBox.top - parentBox.top;
    }

    CalculateLeft(){
        let parentBox = this.gridElement.getBoundingClientRect();
        let childBox = document.querySelectorAll(".grid__square")[this.col].getBoundingClientRect();

        return childBox.left - parentBox.left;
    }

    Delete(){
        this.gridElement.removeChild(this.element);
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

    SetValue(newNum){
        this.value = newNum;
    }

    SetViewValue(newNum){
        this.element.textContent = newNum;
        this.element.className = "";
        this.element.classList.add("grid__tile--"+newNum, "grid__tile");
    }

    GetValue(){
        return this.value;
    }

}