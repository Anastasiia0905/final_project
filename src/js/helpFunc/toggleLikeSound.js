export const toggleLikeSound = (arr, id) => {
    if(arr.indexOf(id) + 1){
        arr.splice(arr.indexOf(id), 1)
    } else {
        arr.push(id);
    }
}