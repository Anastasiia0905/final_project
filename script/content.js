

const linkContent = document.querySelector('.vertical__menu'); 
const divContent = document.querySelector('.content'); 

const cleanContentDiv = () => {  
    while(divContent.firstChild){  
        divContent.removeChild(divContent.firstChild); 
    }
}


const soundCreate = (name, artist, genre, url) => {
        let holder = document.createElement('div');
        let nameItem = document.createElement('span');
        let artistItem = document.createElement('span');
        let genreItem = document.createElement('span');
        let audioItem = document.createElement('audio');
        Object.assign(audioItem, {
            controls: 'controls',
            src: url,
            type: 'audio.wav'
        });

        nameItem.textContent = name;
        artistItem.textContent = artist;
        genreItem.textContent = genre;

        holder.appendChild(nameItem);
        holder.appendChild(artistItem);
        holder.appendChild(genreItem);
        holder.appendChild(audioItem);

        return holder;
}

const photoCreate = (alt, url,category) => {
        let figureItem = document.createElement('figure');
        let imgItem = document.createElement('img');
        Object.assign(imgItem, {
            alt: alt,
            src: url
        });
        imgItem.dataset.category = category;
        figureItem.appendChild(imgItem);

        return figureItem;
}
async function asyncRequest(target, parseFunc){
    let response = await fetch(target);
    let data  = await response.json();
    return data;
};

linkContent.addEventListener('click', (e)=> {
    e.preventDefault();
    target = e.target.parentElement.dataset.target; 
    targetURL = `JSON/${target}.json`;
    
    if(target === 'sound'){
        asyncRequest(targetURL, soundRender)
            .then(data => soundRender(data))
    }
    else if(target === 'photo'){
        asyncRequest(targetURL, photoRender)
            .then(data => photoRender(data))
    }
    
});

// функция, которая собирает файл с картинками
// функиця, которая отрисовует картинки
// функция, которая прорисовует необходимый контент
// функция, которая открывает модальное окно для выбраного элемента




const soundRender = (obj) => {
    cleanContentDiv();

    obj.forEach(element => {
        divContent.appendChild(
            soundCreate(element.name, element.artist, element.genre, element.url)
        );
    });
}

const photoRender = (obj)=> {
    cleanContentDiv();

    obj.forEach((element) => {
        divContent.appendChild(photoCreate(element.alt, element.url, element.category))
    });
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

/* for(let i = 0; i < obj.length; i++){
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

       /*  name.textContent = obj[i].name;
         artist.textContent = obj[i].artist;
         genre.textContent = obj[i].genre;
        

         holder.appendChild(name);
         holder.appendChild(artist);
         holder.appendChild(genre);
         holder.appendChild(audio);*/

        // divContent.appendChild(holder);

         //divContent.classList.add('sound');
         //holder.classList.add('content__item');
        //}