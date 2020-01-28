export const setToLocal = (data, type)=> {
    localStorage.removeItem(`${type}`);
    localStorage.setItem(`${type}`, JSON.stringify(data))
    let contentArr = JSON.parse(localStorage.getItem(`${type}`));
    
    return contentArr;
   
}