class Wall{
    constructor(){

    }

    render(rootElement){
        this.rootElement = rootElement
        let divParent = $('<div>', 'wall')
        this.rootElement.appendChild(divParent)

    }
}