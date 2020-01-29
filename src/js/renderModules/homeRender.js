
import {showLiked} from '../helpFunc/showLiked'
export const homeRender = (container, wrap) => {
     
    wrap.innerHTML = `<div class="content__download">
                        <span class="content__download_button">+ Click to add new file</span>
                        <form action="post" class="download__form">
                            <input type="file" name="file_download">
                            <input type="submit">
                        </form>
                    </div>`

    container.appendChild(wrap);
    container.appendChild(showLiked()).classList.add('liked_sound')


    const addButton = document.querySelector('.content__download_button');
    const formDownload = document.querySelector('.download__form')
    addButton.addEventListener('click', (e)=> {
        formDownload.classList.add('active');
    });
    
    
    container.classList.add('home__wrap');
    wrap.classList.remove('video__wrap');
}
