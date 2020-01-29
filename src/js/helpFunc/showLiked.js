export const showLiked = () => {
    let objFromLocal = JSON.parse(localStorage.getItem('sound'));
    let likedSound = localStorage.getItem('likedSound');
    let arr = document.createElement('div')
    objFromLocal.forEach(item => {
        if(likedSound.includes(item.id)){
           let i = document.createElement('span');
           i.textContent = item.name;
           arr.appendChild(i);
        }
    })
    return arr;
}