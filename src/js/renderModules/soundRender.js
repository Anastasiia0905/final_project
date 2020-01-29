import {setToLocal} from '../getDataFunc/setToLocal'
import {searchForm} from './searchForm'
import filterFunc from '../helpFunc/filterFunc'
import {pagination} from './pagination'
import {selectPage} from './pagination'
import likedFunc from '../helpFunc/likedFunc'
import {findMatch} from '../helpFunc/findMatch'
import {storageQuery} from '../helpFunc/storageQuery'
import {toggleLikeSound} from '../helpFunc/toggleLikeSound'
import {showLiked} from '../helpFunc/showLiked'

const divContent = document.querySelector('.content');
let likedSound = [];
export const soundRender = (data) => {
    let objFromLocal = setToLocal(data, `sound`);
    let obj = objFromLocal;
    

    
    let filterForm = 
        searchForm(['all', 'blues', 'latina', 'holiday', 'classic'], 'sound__form');
    filterForm.addEventListener('change', (event) => {
        if(event.target.tagName === 'SELECT'){
            filterFunc(event.target, obj, objFromLocal)
                .then(selected => {
                    obj = selected;
                    pagination(selected, pagWrap, divContent)
                });
        } else if(event.target.tagName === 'INPUT'){
            event.target.classList.toggle('active');
            likedFunc(event.target, obj, likedSound)
               .then(selected => {
                   obj = selected;
                   pagination(selected, pagWrap, divContent)
                });
        }
    });
    filterForm.addEventListener('keyup', (event) => {
        if(event.target.tagName === 'INPUT') {
            let objInput = obj;
            pagination(findMatch(event.target.value.trim(), objInput, obj), pagWrap, divContent)
        }
       
        
    });
    divContent.addEventListener('click', (e)=> {
        if(e.target.classList.contains('button-like')){
            e.target.classList.toggle('active')
            toggleLikeSound(likedSound, e.target.id);
            storageQuery(false, 'likedSound', likedSound);
      } 
    else if(e.target.classList.contains('button-play')){
            let arr = document.querySelectorAll('.button-play');
            arr.forEach(item => {
                if(item.classList.contains('active')){
                    item.classList.remove('active');
                    item.parentElement.lastChild.pause();
                }
                else if(item == e.target){
                    item.classList.add('active');
                    item.parentElement.lastChild.play();
                }
            })
    }
    })

    storageQuery(true, 'likedSound', likedSound);
   
    //console.log(objFromLocal);
    //console.log(localStorage.getItem('likedSound'));
   
   // selected = obj.filter(item => likedSound.includes(item.id));
    const pagWrap = document.createElement('div');
    const contentWrapper = pagination(obj, pagWrap, divContent);
    divContent.appendChild(filterForm);
    divContent.appendChild(contentWrapper);
    pagWrap.addEventListener('click', () => {selectPage(obj, event.target)})
   
    const likeButton =  document.querySelectorAll('.button-like');
    for(let i = 0; i < likeButton.length; i++){
       if(likedSound.includes(likeButton[i].id)){
        likeButton[i].classList.add('active')
       }
    }
  
   
}