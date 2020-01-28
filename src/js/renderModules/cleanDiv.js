export const cleanDiv = (div) => {  
    while(div.firstChild){  
        div.removeChild(div.firstChild); 
     }
}