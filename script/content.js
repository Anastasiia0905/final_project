



const linkContent = document.querySelector('.vertical__menu'); //боковое меню
const divContent = document.querySelector('.content'); //основной блок, куда будет подгружаться страницы

async function asyncRequest(target, parseFunc){
    let response = await fetch(target);
    let data  = await response.json();
    return data;
}

linkContent.addEventListener('click', (e)=> {
    e.preventDefault();
    target = e.target.parentElement.dataset.target; //выбор менб
    targetURL = `JSON/${target}.json`;
    
    if(target === 'sound'){
        asyncRequest(targetURL, showSound)
            .then(data => showSound(data))
    }
    else if(target === 'photo'){
        asyncRequest(targetURL, showPhoto)
            .then(data => showPhoto(data))
    }
    
});





function showSound(obj){
    while(divContent.firstChild){  // вынести функцию ощищения в отдельную функцию
        divContent.removeChild(divContent.firstChild);
    }
    let headline = document.createElement('h1');
    headline.textContent = obj[0].type;
    divContent.appendChild(headline);

    let searchInput = document.createElement('input');
    searchInput.type = 'text';
    divContent.appendChild(searchInput);


    
    
    for(let i = 0; i < obj.length; i++){
         let holder = document.createElement('div');
         let name = document.createElement('span');
         let artist = document.createElement('span');
         let genre = document.createElement('span');

         let audio = document.createElement('audio');
         Object.assign(audio, {
             controls: 'controls',
             src: obj[i].url,
             type: 'audio.wav'
         })
         /*audio.controls = 'controls';
         audio.src = obj[i].url;
         audio.type = 'audio.wav';*/

         name.textContent = obj[i].name;
         artist.textContent = obj[i].artist;
         genre.textContent = obj[i].genre;
        

         holder.appendChild(name);
         holder.appendChild(artist);
         holder.appendChild(genre);
         holder.appendChild(audio);

         divContent.appendChild(holder);

         //divContent.classList.add('sound');
         //holder.classList.add('content__item');
    }
    divContent.classList.add('sound');
    divContent.classList.remove('photoContent');
    
}
function showPhoto(obj){
        while(divContent.firstChild){
            divContent.removeChild(divContent.firstChild);
        }
        for(let i = 0; i < obj.length; i++){
            let figure = document.createElement('figure');
            let img = document.createElement('img');

            Object.assign(img, {
                alt: obj[i].alt,
                src: obj[i].url
            })
            img.dataset.category = obj[i].category;
            
            figure.appendChild(img);
            divContent.appendChild(figure);
        }
        divContent.classList.add('photoContent');
        divContent.classList.remove('sound');
}


function setToLocal(obj) {
    localStorage.setItem('content', obj);
}


/*async function asyncRequest(target, parseFunc){  
    let objFile = await makeRequest('GET', target);
    
    console.log(objFile.status);
    let jsonObj = JSON.parse(objFile);
    parseFunc(jsonObj);
    setToLocal(objFile);
}*/

/*function makeRequest(method, url){ //функция, которая делает запрос на сервер. Ожидаем ответ
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = ()=>{
            if(this.status < 300){
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                })
            }
        }
        xhr.onerror = ()=> {
            reject({
                    status: this.status,
                    statusText: xhr.statusText
            }) 
        }
        xhr.send();
    })
}*/
