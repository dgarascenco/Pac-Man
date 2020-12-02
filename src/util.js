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