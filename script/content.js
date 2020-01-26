

const linkContent = document.querySelector('.vertical__menu'); 
const divContent = document.querySelector('.content'); 
const contentWrapper = document.createElement('div');
const pagWrap = document.createElement('div');

// Очищаем контейнер
const cleanDiv = (div) => {  
    while(div.firstChild){  
        div.removeChild(div.firstChild); 
    }
}
// Получаем данные с JSON файла
async function getData(target){
    let response = await fetch(target);
    let data  = await response.json();
    return data;
};

const setToLocal = (data, type)=> {
    localStorage.removeItem(`${type}`);
    localStorage.setItem(`${type}`, JSON.stringify(data))
    let contentArr = JSON.parse(localStorage.getItem(`${type}`));
    return contentArr;
}
const show = [];
const showLiked = (id, key,arr) =>{
    if(localStorage.getItem(key).includes(id)){
        arr.classList.add('active');
        show.push(id);
        console.log(show);
    }
}

const soundCreate = (name, artist, genre, url, id) => {
        let holder = document.createElement('div');
        let playItem = document.createElement('div');
        let likeItem = document.createElement('div');
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


        holder.appendChild(playItem);
        holder.appendChild(likeItem);
        holder.appendChild(nameItem);
        holder.appendChild(artistItem);
        holder.appendChild(genreItem);
        holder.appendChild(audioItem);

        playItem.setAttribute('id', id);
        likeItem.setAttribute('id', id)
        
       
        showLiked(id, 'likedSound', likeItem);
        
        holder.classList.add('sound__item');
        playItem.classList.add('button', 'sound__button', 'button-play');
        likeItem.classList.add('button', 'sound__button', 'button-like');
        return holder;
}

const photoCreate = (alt, url, category) => {
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
const videoCreate = (url, duration) => {
    let video = document.createElement('video');
    video.src = url;
    video.dataset.duration = duration;
    video.setAttribute('controls', true)
    return video;
    
}
async function filterFunc (e, obj, genre){
    const filterParam = e.target.value;
    let selected = await obj.filter(item => item.genre == filterParam);
    if(selected == ''){return obj}
    else {
        return selected;
    }   
}
const findMatch = (word, obj)=>{
    return obj.filter(item => {
          const regex = new RegExp(word, 'gi');
          return item.artist.match(regex) || item.name.match(regex);
      })
  }

const render = (obj)=> {
    cleanDiv(contentWrapper);
    if(!obj.length){
        contentWrapper.innerHTML = `<div class="content__nothing">
        <h1 class="content__nothing_text">Sorry, we find nothing</h1>
        <img class="content__nothing_img" src='/content/img/icon/see.svg' alt='beenocle'>
        </div>` 
    } else {
        if(obj[0].type === 'sound'){
            obj.forEach((element) => {              
                contentWrapper.appendChild(
                    soundCreate(element.name, element.artist, element.genre, element.url, element.id)
                    );
            });
        } else if (obj[0].type === 'photo'){
            obj.forEach((element) => {
                contentWrapper.appendChild(photoCreate(element.alt, element.url, element.category));
            });
            contentWrapper.classList.add('img-section__wrap');
        } else if(obj[0].type === 'video'){
            obj.forEach((element) => {                
                contentWrapper.appendChild(
                videoCreate(element.url, element.duration)
                );
            });
        }
    }
    divContent.appendChild(contentWrapper);
}
  const pagination = (obj) =>{
    let ul = document.createElement('ul'); 
    if(pagWrap.hasChildNodes(ul)){
        pagWrap.innerHTML = ''; 
    }
    let onPage = 5;
    let countOfPage = Math.ceil(obj.length / onPage);
    for(let i = 1; i <= countOfPage; i++){
        let li = document.createElement('li');
        li.textContent = i;
        ul.appendChild(li);
    }
    pagWrap.appendChild(ul);
    divContent.appendChild(pagWrap)
    render(obj.slice(0, onPage));
    ul.addEventListener('click', (e) => {
        let pageNum = +e.target.innerHTML;
        let start = (pageNum - 1) * onPage;
        let end = start + onPage;
        let note = obj.slice(start, end)
        render(note);
    });

} 
const storageQuery = (get, key, arr) => {
    if(get) {
        if(localStorage.getItem(key)){
            JSON.parse(localStorage.getItem(key)).forEach(id => arr.push(id))
        }
       
    } else {
        localStorage.setItem(key, JSON.stringify(arr));
    }
}
// по клику на определенный пункт меню выводит нужный контент
linkContent.addEventListener('click', (e)=> {
    e.preventDefault();
    target = e.target.parentElement.dataset.target; 
    targetURL = `JSON/${target}.json`;

    if(target === 'sound'){
        getData(targetURL)
            .then(data => soundRender(data))
    } else if(target === 'video'){
        getData(targetURL)
            .then(data => videoRender(data))
    } else if(target === 'photo'){
        getData(targetURL)
            .then(data => photoRender(data))
    } else if(target === 'home'){
        homeRender();
    }
    
});

const homeRender = () => {
    cleanDiv(divContent);
    cleanDiv(contentWrapper);
    
    contentWrapper.innerHTML = `<div class="content__download">
                <span class="content__download_button">+ Click to add new file</span>
                <form action="post" class="download__form">
                    <input type="file" name="file_download">
                    <input type="submit">
                </form>
            </div>
            <div>
           ${show}
            </div>
    `
    divContent.appendChild(contentWrapper);
    const addButton = document.querySelector('.content__download_button');
    const formDownload = document.querySelector('.download__form')
    addButton.addEventListener('click', (e)=> {
        console.log(formDownload);
        formDownload.classList.add('active');
    });
    contentWrapper.classList.remove('video__wrap');
    
}

//!!!!!!!СТРУКТУРИРОВАТЬ КОД!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// функция, которая прорисовует необходимый контент
// функция, которая открывает модальное окно для выбраного элемента
// обработка ошибок, catch
// прогонка через babel  !!! fetch не поддерживает
// оптимизировать создание формы
// фильтровать с localStarage?
// фильтрацию сделать асинхронной
//фильтрацию вынести отдельно
//довавить спинер
// много уровневая фильтрация
// пагинация, когда страница стает большая
// решить проблему с лайками
const videoRender = (data) => {
    cleanDiv(divContent);
    let obj = setToLocal(data, 'video');
    const render = (obj) => {
        cleanDiv(contentWrapper);
        obj.forEach((element) => {                
            contentWrapper.appendChild(
                videoCreate(element.url, element.duration)
                );
            });
            divContent.appendChild(contentWrapper)
    }

contentWrapper.classList.remove('img-section__wrap');
contentWrapper.classList.remove('sound__wrap');
contentWrapper.classList.add('video__wrap');
divContent.addEventListener('onload', render(obj))
}


const soundRender = (data) => {
    cleanDiv(divContent);
    
    //______________FILTER + FORM_______________
    const filterForm = document.createElement('form'); //
    const inputForm = document.createElement('input'); ///
    const selectForm = document.createElement('select');
    const blues = document.createElement('option');
    const latina = document.createElement('option');
    const holiday = document.createElement('option');
    const classic = document.createElement('option');
    const all = document.createElement('option');
    const likeForm = document.createElement('input');
    const likeLabel = document.createElement('label');


    all.textContent = 'any genre'
    blues.textContent = 'blues';
    latina.textContent = 'latina';
    holiday.textContent = 'holiday';
    classic.textContent = 'classic';

    inputForm.type = 'text'; //
    likeForm.type = 'checkbox';
    likeForm.id = 'likeForm'
    likeLabel.setAttribute('for', 'likeForm');

    selectForm.appendChild(all)
    selectForm.appendChild(blues)
    selectForm.appendChild(latina)
    selectForm.appendChild(holiday)
    selectForm.appendChild(classic)
    likeLabel.appendChild(likeForm);

    filterForm.appendChild(inputForm); //
    filterForm.appendChild(selectForm);
    filterForm.appendChild(likeForm);
    filterForm.appendChild(likeLabel);
    
    divContent.appendChild(filterForm);


    filterForm.classList.add('sound__form');


    
  
   
let obj = setToLocal(data, 'sound');


let likedSound = []; 
likeForm.addEventListener('change', ()=> {
    if(likeForm.checked){
        let selected = obj.filter(item => likedSound.includes(item.id));
            pagination(selected);
        } else if(!likeForm.checked){
            pagination(obj)
        }
    });
const toggleLikeSound = id => {
    if(likedSound.indexOf(id) + 1){
        likedSound.splice(likedSound.indexOf(id), 1)
    } else {
        likedSound.push(id);
    }
        storageQuery(false, 'likedSound', likedSound)
}
   
    
storageQuery(true, 'likedSound', likedSound);
    

contentWrapper.classList.remove('video__wrap');
contentWrapper.classList.remove('img-section__wrap');
contentWrapper.classList.add('sound__wrap');
divContent.addEventListener('onload', pagination(obj));

inputForm.addEventListener('keyup', (e) => {
    let res = inputForm.value.trim();
    pagination(findMatch(res, obj));
})
;
selectForm.addEventListener('change', (e)=> {
    filterFunc(e, obj)
        .then(selected => pagination(selected))
        .then(pagination(obj))
    });
    
contentWrapper.addEventListener('click', (e)=> {
    if(e.target.classList.contains('button-like')){
            e.target.classList.toggle('active')
            toggleLikeSound(e.target.id);
      } 
    else if(e.target.classList.contains('button-play')){
            let arr = document.querySelectorAll('.button-play');
            arr.forEach(item => {
                if(item.classList.contains('active')){
                    item.classList.remove('active');
                    item.parentElement.lastChild.pause();
                }
                else if(item == e.target){
                    item.classList.toggle('active');
                    item.parentElement.lastChild.play();
                }
            })
    }
});

}

   




const photoRender = (data)=> {
    cleanDiv(divContent);   
    let obj = setToLocal(data, `photo`);
    render(obj)
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    divContent.appendChild(lightbox);

    contentWrapper.addEventListener('click', (e) => {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        const img = document.createElement('img');
        if(!e.target.src)return;
        else {img.src = e.target.src;}
        while(lightbox.firstChild){
            lightbox.removeChild(lightbox.firstChild);
        }
        lightbox.appendChild(img);
        
    });
    lightbox.addEventListener('click', (e)=> {
        if(e.target !== e.currentTarget) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    })
contentWrapper.classList.remove('video__wrap');
contentWrapper.classList.remove('sound__wrap');
}




