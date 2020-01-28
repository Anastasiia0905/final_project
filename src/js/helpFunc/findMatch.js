export const findMatch = (word, objInput, obj)=>{
    if(word == ''){return obj}
    else {
        return objInput.filter(item => {
            const regex = new RegExp(word, 'gi');
            return item.artist.match(regex) || item.name.match(regex);
        })
    }
    
  }