export const storageQuery = (get, key, arr) => {
    if(get) {
        if(localStorage.getItem(key)){
            JSON.parse(localStorage.getItem(key)).forEach(id => arr.push(id))
        }
       
    } else {
        localStorage.setItem(key, JSON.stringify(arr));
    }
}