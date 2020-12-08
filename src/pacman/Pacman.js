class Pacman {
    constructor(row = 0, col = 0, grid=null, coins = 0, hp = 5, direction = "rotate(0deg)"){
        this.row = row
        this.col = col
        this.grid = grid
        this.grid[row][col] = this
        this.coins = coins
        this.direction = direction
        this.hp = hp
        this.status = "alive"
    }

    moveDown(){
        this.grid[this.row++][this.col] = new Empty()
        this.direction = 'rotate(90deg)'
        this.collisionUpdate()
    }

    moveUp(){
        this.grid[this.row--][this.col] = new Empty()
        this.direction = 'rotate(270deg)'
        this.collisionUpdate()
    }

    moveRight(){
        this.grid[this.row][this.col++] = new Empty()
        this.direction = 'rotate(0deg)'
        this.collisionUpdate()
    }

    moveLeft(){
        this.grid[this.row][this.col--] = new Empty()
        this.direction = 'scaleX(-1)'
        this.collisionUpdate()
    }

    ////////событие, в случае если попал в непустую ячейку
    collisionUpdate(){
        if (this.grid[this.row][this.col] instanceof Bomb ){
            this.status = "exploding"
            this.hp--
            this.render(this.rootElement)   
            setTimeout(function(){
                document.querySelector(`.pacman`).className = "pacman alive"
                this.status = "alive"
                if ( this.hp == 0 ) gm.finish("lose")
            }.bind(this) , 1000)

                                  
         }else  if (this.grid[this.row][this.col] instanceof Coin){
             document.getElementById('coins').innerText = ++this.coins + " Coins"
             if ( parseInt(gm.coins/2) == this.coins ) gm.finish("victory")
         }
        this.grid[this.row][this.col] = this
    }

    ////////// отображение пакмена
    render(rootElement){
        this.rootElement = rootElement
        let hp = $('<hr>', `hp`)
            hp.style.width = (this.hp*20)+"%"
        let divParent = $('<div>', `pacman ${this.status}`)                   
            divParent.appendChild(hp)
            divParent.style.transform = this.direction            
        this.rootElement.appendChild(divParent) 
    }

}