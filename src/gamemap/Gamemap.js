class Gamemap {
    constructor(rows = 10, cols = 10) {
        this.rows = rows
        this.cols = cols
        this.grid = []
        for (let i=0; i<this.cols; i++)
            this.grid[i] = []

    }

    render(rootElement){

        this.rootElement = rootElement       

        let divParent = $('<div>', 'map')
            divParent.style.width = `${this.rows*50}px`
            divParent.style.height = `${this.cols*50}px`            
        for (let ci=0; ci<this.cols; ci++)
            for (let ri=0; ri<this.rows; ri++)
                this.grid[ci][ri].render(divParent) 

        console.table(this.grid)

        this.rootElement.innerText=""
        this.rootElement.appendChild(divParent)

    }
}