document.getElementById('btn_new_game').addEventListener("click", newGame)
document.getElementById('btn_save_game').addEventListener("click", saveGame)
document.getElementById('btn_load_game').addEventListener("click", loadGame)
document.getElementById('btn_start_game').addEventListener("click", startGame)

let gm = new Gamemap()
let key = 0
////////функция движения пакмена
let movePacman = function(e){   
    let  pacman = findOnMap(gm, Pacman)[0]                
    switch (e.key){
        case "ArrowDown":  if ( pacman.row != (gm.rows-1) ) pacman.moveDown(); break
        case "ArrowUp":   if ( pacman.row != 0 )pacman.moveUp(); break
        case "ArrowRight": if ( pacman.col != (gm.cols-1) ) pacman.moveRight(); break
        case "ArrowLeft": if ( pacman.col != 0 )pacman.moveLeft(); break
    }

    if (pacman.hp == 0 ){
        window.clearInterval(findOnMap(gm, Devil)[0].interval)
        //findOnMap(gm, Devil)[0].stop()
        $('body').removeEventListener('keydown',movePacman)
         return false
    }else if(pacman.coins == parseInt(gm.coins/2))  {
        window.clearInterval(findOnMap(gm, Devil)[0].interval)
       //findOnMap(gm, Devil)[0].stop()
        $('body').removeEventListener('keydown',movePacman)
        gm.finish("victory")
        return false
    }else if (findOnMap(gm, Pacman).length == 0) {
        $('body').removeEventListener('keydown',movePacman)
        gm.finish("lose")
         return false
    }
    gm.render( $('.scene') )

} 

function newGame(){

    if ( key == 1 ) {
        if (findOnMap(gm, Devil).length !=0)
            window.clearInterval(findOnMap(gm, Devil)[0].interval)
        $('body').removeEventListener('keydown',movePacman)
    }

    gm.rows = document.getElementById('rows').value
    gm.cols = document.getElementById('cols').value 
    gm.coins = document.getElementById('coin').value
    gm.bombs = document.getElementById('bomb').value    
    for (let ri=0; ri<gm.rows; ri++){
        gm.grid[ri] = []
        for (let ci=0; ci<gm.cols; ci++)            
            gm.grid[ri][ci] = new Empty()   
    }  

    let pacman_place = randomPlace(gm)    
 
    new Pacman(pacman_place[0], pacman_place[1], gm.grid)   
    
    let place = randomPlace(gm)
    
    for (let i=0; i< gm.coins; i++){
        place = randomPlace(gm)
        new Coin(place[0], place[1], gm.grid)
    }

    for (let i=0; i<gm.bombs; i++){
        place = randomPlace(gm)      
        new Bomb(place[0], place[1], gm.grid)
    } 
    gm.render( $('.scene') )   
    document.getElementById('btn_save_game').disabled = false
    document.getElementById('btn_start_game').disabled = false
}

function startGame(){
   // console.log("findOnMap(gm, Devil)", findOnMap(gm, Devil))
    key = 1
    if ( findOnMap(gm, Devil).length == 0 )  {
        let devil_place = randomPlace(gm)
        new Devil(devil_place[0], devil_place[1], gm.grid)
        
    }
    
    $('body').addEventListener('keydown',movePacman)
    if ( findOnMap(gm, Devil).length != 0 ) findOnMap(gm, Devil)[0].start()
    document.getElementById('btn_start_game').disabled = true
}

function saveGame(){
    gm.save()
}

function loadGame(){
    gm.load()
    document.getElementById('btn_start_game').disabled = false
}

if (localStorage.getItem("game") == null) document.getElementById('btn_load_game').disabled = true


