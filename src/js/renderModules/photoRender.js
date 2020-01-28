import {setToLocal} from '../getDataFunc/setToLocal'
import {render} from './render'
import {lightbox} from '../lightbox'
const divContent = document.querySelector('.content');
export const photoRender = (data) => {
    let obj = setToLocal(data, `photo`);
    const contentWrapper = render(obj);
    contentWrapper.addEventListener('click', () => {lightbox(event.target, divContent)});

    divContent.appendChild(contentWrapper);
}

