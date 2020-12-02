class Coin{
    constructor(){

    }

    render(rootElement){
        this.rootElement = rootElement
        let divParent = $('<div>', 'coin')
        this.rootElement.appendChild(divParent)

    }
}