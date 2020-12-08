class Gamemap {
    constructor(rows = 10, cols = 10) {
        this.rows = rows
        this.cols = cols
        this.grid = []
        this.coins = 1
        this.bombs = 1
        this.status = "game"
    }

    render(rootElement){

        this.rootElement = rootElement      
        
        let divParent = $('<div>', 'map')
            divParent.style.width = `${this.cols*50}px`
            divParent.style.height = `${this.rows*50}px`  

        for (let ri=0; ri<this.rows; ri++)
            for (let ci=0; ci<this.cols; ci++)   
                this.grid[ri][ci].render(divParent)

        this.rootElement.innerText=""
        this.rootElement.appendChild(divParent)
    }

    finish(status){
        document.getElementById('btn_save_game').disabled = true
        document.getElementById('btn_start_game').disabled = true
        if (findOnMap(gm, Devil).length !=0)
            window.clearInterval(findOnMap(gm, Devil)[0].interval)
        $('body').removeEventListener('keydown',movePacman)
             
        let div = document.createElement("div")
            div.style.width = `${this.cols*50}px`
            div.style.height = `${this.rows*50}px`
            div.style.textAlign = "center"            
        let root = document.getElementById('scene')
        let lose = document.createElement("img")
        let h  = document.createElement("H1")

        if (status == "lose"){
            lose.src = "src/Gamemap/images/lose.png"
            h.style.color = "red"
            h.innerText = "YOU LOSE!!!"  
            this.status = "lose"           
        } else if ( status == "victory" ){
            lose.src = "src/Gamemap/images/victory.png"
            h.style.color = "green"
            h.innerText = "CONGRATOLATIONS!!!"  
            this.status = "victory"          
        }
        root.innerText =""
        div.appendChild(h)
        div.appendChild(lose)
        root.appendChild(div)  

    }

    save(){
        if ( findOnMap(gm, Devil).length == 0 )  {
            let devil_place = randomPlace(gm)
            let devil = new Devil(devil_place[0], devil_place[1], gm.grid)
            devil.stop()
        }
        let cache = []
        let json = JSON.stringify(this, (key, value) => {
            if (typeof value === 'object' && value !==null) {
                if (value instanceof Bomb) value.type = "Bomb"
                if (value instanceof Empty) value.type = "Empty"
                if (value instanceof Coin) value.type = "Coin"
                if (value instanceof Pacman) value.type = "Pacman"
                if (value instanceof Devil) value.type = "Devil"
                if( cache.includes(value) ) return
                cache.push(value)
            }
            return value
        })
        cache = null
        localStorage.setItem( "game", json )
    }

    load(){

        let data = JSON.parse(localStorage.getItem('game'))

        this.rows = data.rows
        this.cols = data.cols
        this.coins = data.coins
        this.grid = data.grid
        this.bombs = data.bombs
        this.status = data.status

        for (let ri=0; ri<this.rows; ri++)
            for (let ci=0; ci<this.cols; ci++)    {  
                switch (data.grid[ri][ci].type){
                    case "Empty": this.grid[ri][ci] = new Empty(); continue
                    case "Coin": new Coin(ri, ci, this.grid); continue
                    case "Bomb": new Bomb(ri, ci, this.grid); continue
                    case "Pacman": 
                        this.grid[ri][ci] = new Pacman(ri, ci, this.grid, data.grid[ri][ci].coins, data.grid[ri][ci].hp, data.grid[ri][ci].direction); 
                        document.getElementById('coins').innerText = this.grid[ri][ci].coins + " Coins"
                        continue
                    case "Devil": 
                        this.grid[ri][ci] = new Devil(ri, ci, this.grid);
                        if ( findOnMap(gm, Devil).length == 0 )  {
                            let devil_place = randomPlace(gm)
                            let devil = new Devil(devil_place[0], devil_place[1], gm.grid)
                            devil.stop()
                        }
                        window.clearInterval(findOnMap(this, Devil)[0].interval) 
                        continue
                }
            } 
        this.render( $('.scene'))
    }
}