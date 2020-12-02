class Empty{
    constructor(){

    }

    render(rootElement){
        this.rootElement = rootElement
        let divParent = $('<div>', 'empty')
        this.rootElement.appendChild(divParent)

    }
}