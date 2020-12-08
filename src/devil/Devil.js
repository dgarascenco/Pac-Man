class Devil{
    constructor(row, col, grid){
        this.row = row
        this.col = col
        this.grid = grid
        this.coins = 0
        this.direction = 'rotate(0deg)'
        this.interval = setInterval( this.alive.bind(this), 1000 )
    }
    start(){        
        this.interval = setInterval( this.alive.bind(this), 1000 )
    }

    stop(){
        window.clearInterval(this.interval)
    }

    moveDown(){
        this.grid[this.row][this.col] = new Empty()
        this.grid[++this.row][this.col] = this        
    }
    
    moveUp(){
        this.grid[this.row][this.col] = new Empty()
        this.grid[--this.row][this.col] = this
    }

    moveRight(){
        this.grid[this.row][this.col] = new Empty()
        this.grid[this.row][++this.col] = this        
    }

    moveLeft(){
        this.grid[this.row][this.col] = new Empty()
        this.grid[this.row][--this.col] = this
    }

    render(rootElement){
        this.rootElement = rootElement
        let divParent = $('<div>', 'devil')
        this.rootElement.appendChild(divParent)        
    }

    alive(){
        let pacman = findOnMap(gm, Pacman)      
        if (pacman){
            if ( this.col >= (pacman[0].col-1) && this.col <= (pacman[0].col+1) && this.row <= (pacman[0].row+1) && this.row >= (pacman[0].row-1) ) {
                window.clearInterval(this.interval)                 
                gm.finish("lose")
                return
            }
            if ( pacman[0].row > this.row) this.moveDown()
            else if ( pacman[0].row < this.row) this.moveUp()
            else if ( pacman[0].col > this.col) this.moveRight()
            else if ( pacman[0].col < this.col) this.moveLeft() 
            gm.render( $('.scene') )
        }
    }
}