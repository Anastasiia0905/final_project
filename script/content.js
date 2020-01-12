
const linkContent = document.querySelector('.vertical__menu'); //боковое меню
const divContent = document.querySelector('.content'); //основной блок, куда будет подгружаться страницы

linkContent.addEventListener('click', (e)=> {
    e.preventDefault();
    target = e.target.parentElement.dataset.target; //выбор менб
    targetURL = `JSON/${target}.json`;
    
    if(target === 'sound'){
        asyncRequest(targetURL, showSound);
    }
    else if(target === 'photo'){
        asyncRequest(targetURL, showPhoto);
    }
    
});

async function asyncRequest(target, parseFunc){  
    let objFile = await makeRequest('GET', target);
    let jsonObj = JSON.parse(objFile);
    console.log(jsonObj);
    parseFunc(jsonObj);
    setToLocal(objFile);
}

function makeRequest(method, url){ //функция, которая делает запрос на сервер. Ожидаем ответ
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
}

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
         audio.controls = 'controls';
         audio.src = obj[i].url;
         audio.type = 'audio.wav';

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
    searchInput.addEventListener('input', function() {
        let val = this.value.trim();
        let items = localStorage.getItem('content');
       console.log(items)
    })
}
function showPhoto(obj){
        while(divContent.firstChild){
            divContent.removeChild(divContent.firstChild);
        }
        for(let i = 0; i < obj.length; i++){
            let figure = document.createElement('figure');
            let img = document.createElement('img');

            img.alt = obj[i].alt;
            img.src = obj[i].url;
            img.dataset.category = obj[i].category;
            
            figure.appendChild(img);
            divContent.appendChild(figure);
        }
        divContent.classList.add('photoContent');
        divContent.classList.remove('sound');
}
function setToLocal(obj) {
    localStorage.setItem('content', obj);
    console.log(localStorage.getItem('content'));
}

function searchItem(el){
    let val = this.value.trim();
    let items = el;
    if(value != ''){
        items.forEach((item)=> {
            if(item.innerText.seach(val) == -1){
                item.style.display = 'none';
            } else {
                item.style.display = ''
            }
        })
    } else {
        items.forEach((item) => {
            item.style.display = ''
        })
    }
}