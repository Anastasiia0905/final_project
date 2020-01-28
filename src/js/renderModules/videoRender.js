import {setToLocal} from '../getDataFunc/setToLocal'
import {render} from './render'
import {searchForm} from './searchForm'
import {filterForVideo} from '../helpFunc/filterForVideo'
 
const divContent = document.querySelector('.content');
export const videoRender = (data) => {
    let objToLocal = setToLocal(data, `video`);
    let obj = objToLocal;

    let filterForm = searchForm(['all', 'sky', 'food', 'people'], 'video__form');
    filterForm.addEventListener('change', () => {filterForVideo(event.target, obj)})

    const contentWrapper = render(obj);


    divContent.appendChild(filterForm);
    divContent.appendChild(contentWrapper);
   
}

