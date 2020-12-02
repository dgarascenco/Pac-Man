let gm = new Gamemap()


document.getElementById('btn_new_game').addEventListener("click", newGame)

function newGame(){
    let rows = document.getElementById('rows').value
    let cols = document.getElementById('cols').value    
    let gm = new Gamemap( rows, cols)
    let pacman_row = Math.floor( Math.random() * Math.floor(rows) )
    let pacman_col = Math.floor( Math.random() * Math.floor(cols) )
    let pacman = new Pacman(pacman_row, pacman_col, gm.grid, rows, cols)

    for (let ri=0; ri<gm.rows; ri++)
        for (let ci=0; ci<gm.cols; ci++)
            if (ri == pacman_row && ci == pacman_col)  
                gm.grid[ri][ci] = pacman
            else{
                let type = Math.floor( Math.random() * Math.floor(3) ) 
                switch (type) {
                    case 0: gm.grid[ri][ci] = new Empty();  continue
                    case 1: gm.grid[ri][ci] = new Coin(); continue
                    case 2: gm.grid[ri][ci] = new Wall();  continue
                }                              
            }        

    gm.render( $('.scene') )

    $('body').addEventListener('keydown', function(e){
                                            pacman.move(e.key)
                                            gm.render( $('.scene') )
                                            console.table(gm.grid)
                                            })
}

