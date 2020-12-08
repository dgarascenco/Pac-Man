///////////возвращает элемент по имени класса, либо создает его
function $(tag, className){
    if ( tag.startsWith("<") && tag.endsWith(">") ){
        let el = document.createElement( tag.substring(1, tag.length-1) )
        if ( className !== undefined) 
            el.className = className        
        return el
    }
    else    
        return document.querySelector(tag)
}

////////////  Поиск элементов по названию класса (возвращает массив всех найденных объектов)
function findOnMap( grid, classRef){
    let obj_arr = []
    for (let ri=0; ri<grid.rows; ri++)
        for (let ci=0; ci<grid.cols; ci++) 
            if ( grid.grid[ri][ci] instanceof classRef ) obj_arr.push( grid.grid[ri][ci] )              
                return obj_arr
}

////////////  Поиск элементов по названию класса (возвращает массив всех найденных объектов)
function deleteOnMap( grid, classRef){
    let obj_arr = []
    for (let ri=0; ri<grid.rows; ri++)
        for (let ci=0; ci<grid.cols; ci++) 
            if ( grid.grid[ri][ci] instanceof classRef ) grid.grid[ri][ci].delete()           
   
}


/////////возвращает случайное целое число до указанного 
function randomCoord(max){
    return parseInt(Math.random() * (--max*1.1))
}

////////возвращает случайную пустую координату
function randomPlace(gm){
    let tries = gm.rows * gm.cols

    while ( tries-- > 0 ){
        let row = randomCoord(gm.rows-1)
        let col = randomCoord(gm.cols-1)
        if ( gm.grid[row][col] instanceof Empty)
            return [row,col]
    }
}

////////класс движений по направлению
class  Moveable{
    constructor(row, col, grid){
        this.row = row
        this.col = col
        this.grid = grid
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
}