class Gamemap {
    constructor(rows = 10, cols = 10) {
        this.rows = rows
        this.cols = cols
        this.grid = []
        for (let i=0; i<this.rows; i++)
            this.grid[i] = []
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
}