class Pacman{
    constructor(row, col, grid, rows, cols){
        this.row = row
        this.col = col
        this.grid = grid
        this.coins = 0
        this.rows = rows
        this.cols = cols
        this.direction = 'rotate(0deg)'
    }
    ////////  метод движения
    move(direction){

        let row_to = this.row
        let col_to = this.col

        //////////проверка направление, чтобы пакмен не вышел за рамки карты
        switch (direction){
            case "ArrowDown": 
                this.direction = 'rotate(90deg)'
                if ( (this.row + 1) < this.rows ) row_to = this.row + 1
                else return false
                break
            case "ArrowUp": 
                this.direction = 'rotate(270deg)'
                if ( (this.row - 1) >= 0 ) row_to = this.row - 1
                else return false
                break
            case "ArrowRight": 
                this.direction = 'rotate(0deg)'
                if ( (this.col + 1) < this.cols ) col_to = this.col + 1
                else return false
                break
            case "ArrowLeft": 
                this.direction = 'scaleX(-1)'
                if ( (this.col - 1) >= 0 ) col_to = this.col - 1
                else return false
                break
        }


        /////////////////  движение, если по направлению нет стены и плюс монетка, в случае если по направлению она имеется
        switch ( this.grid[row_to][col_to].__proto__.constructor.name){

            case "Wall":  
                console.log("case Wall")  
                return false;
            case "Empty":    
                console.log("case Empty")              
                this.grid[this.row][this.col] = new Empty()  
                this.row = row_to
                this.col = col_to
                this.grid[this.row][this.col] = this
                return true;
            case "Coin":
                console.log("case Coin")                   
                this.grid[this.row][this.col] = new Empty()  
                this.row = row_to
                this.col = col_to          
                this.grid[this.row][this.col] = this
                this.coins++
                document.getElementById('coins').innerText = this.coins + " Coins"
                return true;
        }
    }

    ////////// отображение пакмена
    render(rootElement){
        this.rootElement = rootElement
        let divParent = $('<div>', 'pacman')
        divParent.style.transform = this.direction
        this.rootElement.appendChild(divParent)        
    }
}