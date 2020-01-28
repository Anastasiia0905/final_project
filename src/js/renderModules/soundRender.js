import {setToLocal} from '../getDataFunc/setToLocal'
import {searchForm} from './searchForm'
import filterFunc from '../helpFunc/filterFunc'
import {pagination} from './pagination'
import {selectPage} from './pagination'
import likedFunc from '../helpFunc/likedFunc'
import {findMatch} from '../helpFunc/findMatch'

const divContent = document.querySelector('.content');
let likedSound = [];
export const soundRender = (data) => {
    let objFromLocal = setToLocal(data, `sound`);
    let obj = objFromLocal;
    let filterForm = 
        searchForm(['all', 'blues', 'latina', 'holiday', 'classic'], 'sound__form');
    filterForm.addEventListener('change', (event) => {
        if(event.target.tagName === 'SELECT'){
            console.log(obj)
            filterFunc(event.target, obj, objFromLocal)
                .then(selected => {
                    obj = selected;
                    console.log(obj);
                    pagination(selected, pagWrap, divContent)
                });
        } else if(event.target.tagName === 'INPUT'){
            console.log(obj);
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

    const pagWrap = document.createElement('div');
    const contentWrapper = pagination(obj, pagWrap, divContent);
    divContent.appendChild(filterForm);
    divContent.appendChild(contentWrapper);
    pagWrap.addEventListener('click', () => {selectPage(obj, event.target)})
    
}