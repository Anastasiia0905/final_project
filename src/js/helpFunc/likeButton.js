export const likeButton = ()=> {
    const likedSound = localStorage.getItem('likedSound');
    const likeButton =  document.querySelectorAll('.button-like');
    for(let i = 0; i < likeButton.length; i++){
        if(likedSound.includes(likeButton[i].id)){
            likeButton[i].classList.add('active')
        }
    }
    return likedSound;
}
