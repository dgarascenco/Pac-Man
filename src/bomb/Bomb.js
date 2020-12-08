class Bomb{
    constructor(row, col, grid){
        this.row = row
        this.col = col
        this.grid = grid
        this.grid[row][col] = this
    }

    delete(){
        this.grid[this.row][this.col] = new Empty()
    }

    render(rootElement){
        this.rootElement = rootElement
        let divParent = $('<div>', 'bomb')
        this.rootElement.appendChild(divParent)

    }
}