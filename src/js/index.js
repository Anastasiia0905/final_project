import getData from './getDataFunc/getData'
import {cleanDiv} from './renderModules/cleanDiv'
import {homeRender} from './renderModules/homeRender'
import {photoRender} from './renderModules/photoRender'
import {videoRender} from './renderModules/videoRender'
import {soundRender} from './renderModules/soundRender'
//./node_modules/.bin/webpack
const linkContent = document.querySelector('.vertical__menu'); 
const divContent = document.querySelector('.content'); 
const contentWrapper = document.createElement('div');
document.addEventListener('DOMContentLoaded', ()=>{

    cleanDiv(divContent);
    cleanDiv(contentWrapper);
    homeRender(divContent, contentWrapper);
})

linkContent.addEventListener('click', (e)=> {
    e.preventDefault();
    let target = e.target.dataset.target; 
    let targetURL = `JSON/${target}.json`;
    if(target === 'sound'){
        cleanDiv(divContent);
        getData(targetURL)
            .then(data => soundRender(data))
            .catch(error => console.log(error));
    } else if(target === 'video'){
        cleanDiv(divContent);
        getData(targetURL)
            .then(data => videoRender(data))
            .catch(error => console.log(error));
    } else if(target === 'photo'){
        cleanDiv(divContent);
        getData(targetURL)
            .then(data => photoRender(data))
            .catch(error => console.log(error));
    } else if(target === 'home'){
        cleanDiv(divContent);
        cleanDiv(contentWrapper);
        homeRender(divContent, contentWrapper);
    }
    
});

