class Coin{
    constructor(row, col, grid){
        this.row = row
        this.col = col
        this.grid = grid
        this.grid[row][col] = this
    }

    render(rootElement){
        this.rootElement = rootElement
        let divParent = $('<div>', 'coin')
        this.rootElement.appendChild(divParent)

    }

    delete(){
        this.grid[this.row][this.col] = new Empty()
    }
}