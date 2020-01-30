export const lightbox = (e, container) => {
    let  lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    container.appendChild(lightbox);
    lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        const img = document.createElement('img');
        if(!e.src)return;
        else {img.src = e.src;}
        while(lightbox.firstChild){
            lightbox.removeChild(lightbox.firstChild);
        }
    lightbox.appendChild(img);
    lightbox.addEventListener('click', (e)=> {
        if(e.target !== e.currentTarget) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    })
}
