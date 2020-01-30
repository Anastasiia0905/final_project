
const contentWrapper = document.createElement('div');
import {cleanDiv} from './cleanDiv'
import {photoCreate} from './photoCreate'
import {videoCreate} from './videoCreate'
import {soundCreate} from './soundCreate'
import {likeButton} from '../helpFunc/likeButton'
export const render = (obj)=> {
    cleanDiv(contentWrapper);
    if(!obj.length){
        
        contentWrapper.innerHTML = `<div class="content__nothing">
        <h1 class="content__nothing_text">Sorry, we find nothing</h1>
        <img class="content__nothing_img" src='content/img/icon/binoculars.png' alt='beenocle'>
        </div>` 
        
    } else {
        if(obj[0].type === 'sound'){
            cleanDiv(contentWrapper);
            obj.forEach((element) => {              
                contentWrapper.appendChild(
                    soundCreate(element.name, element.artist, element.genre, element.url, element.id)
                    );
            });
            
            contentWrapper.classList.remove('img-section__wrap');
            contentWrapper.classList.remove('video__wrap');
            contentWrapper.classList.add('sound__wrap');
            likeButton();
            return contentWrapper;
        } else if (obj[0].type === 'photo'){
            cleanDiv(contentWrapper);
            obj.forEach((element) => {
                contentWrapper.appendChild(photoCreate(element.alt, element.url, element.category));
            });
            contentWrapper.classList.add('img-section__wrap');
            contentWrapper.classList.remove('video__wrap');
            contentWrapper.classList.remove('sound__wrap');
            return contentWrapper;
         } 
        else if(obj[0].type === 'video'){
            cleanDiv(contentWrapper);
            obj.forEach((element) => {                
                contentWrapper.appendChild(
                videoCreate(element.url, element.duration)
                );
            });
            contentWrapper.classList.remove('img-section__wrap');
            contentWrapper.classList.remove('sound__wrap');
            contentWrapper.classList.add('video__wrap');
            return contentWrapper;
            
            
        }

}
}