class Heart{
    constructor(row, col, grid){
        this.row = row
        this.col = col
        this.grid = grid
        this.grid[row][col] = this
    }

    render(rootElement){
        this.rootElement = rootElement
        let divParent = $('<div>', 'heart')
        this.rootElement.appendChild(divParent)

    }

}