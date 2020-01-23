

const linkContent = document.querySelector('.vertical__menu'); 
const divContent = document.querySelector('.content'); 
const contentWrapper = document.createElement('div');


const cleanDiv = (div) => {  
    while(div.firstChild){  
        div.removeChild(div.firstChild); 
    }
}
async function getData(target){
    let response = await fetch(target);
    let data  = await response.json();
    return data;
};
const setToLocal = (data)=> {
    localStorage.removeItem('items');
    localStorage.setItem('items', JSON.stringify(data))
    let contentArr = JSON.parse(localStorage.getItem('items'));
    return contentArr;
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

        holder.classList.add('sound__item');
        playItem.classList.add('button', 'sound__button', 'button-play');
        likeItem.classList.add('button', 'sound__button', 'button-like');
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


linkContent.addEventListener('click', (e)=> {
    e.preventDefault();
    target = e.target.parentElement.dataset.target; 
    targetURL = `JSON/${target}.json`;

    if(target === 'sound'){
        getData(targetURL)
            .then(data => soundRender(data))
    }
    else if(target === 'photo'){
       
        getData(targetURL)
            .then(data => photoRender(data))
    }
    
});



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

const soundRender = (data) => {
    cleanDiv(divContent);
    
    //______________FILTER + FORM_______________
    const filterForm = document.createElement('form');
    const inputForm = document.createElement('input');
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
    likeLabel.textContent = 'select you favorite music'


    inputForm.type = 'text';
    likeForm.type = 'checkbox';
    likeForm.id = 'likeForm'
    likeLabel.setAttribute('for', 'likeForm');

    selectForm.appendChild(all)
    selectForm.appendChild(blues)
    selectForm.appendChild(latina)
    selectForm.appendChild(holiday)
    selectForm.appendChild(classic)
    likeLabel.appendChild(likeForm);

    filterForm.appendChild(inputForm);
    filterForm.appendChild(selectForm);
    filterForm.appendChild(likeForm);
    filterForm.appendChild(likeLabel);
    
    divContent.appendChild(filterForm);


    filterForm.classList.add('sound__form');


    
  
    //____________play like button_____________

    
    //___________SAVE DATA TO LOCAL STORE___________
    let obj = setToLocal(data);

    //____________RENDER CONTENT__________________
    const render = (obj)=> {
        cleanDiv(contentWrapper); // clean content block
        if(obj === null){
            contentWrapper.innerHTML = 'nothing is match' //if nothing match
        } else {
            obj.forEach((element) => {                    // render 
            contentWrapper.appendChild(
                soundCreate(element.name, element.artist, element.genre, element.url, element.id)
                );
            });
        }
        divContent.appendChild(contentWrapper);
        
    }
    
    //_______________LIKEDSOUND________________
    let likedSound = []; 

    likeForm.addEventListener('change', ()=> {
        if(likeForm.checked){
            let selected = obj.filter(item => likedSound.includes(item.id));
            pagination(selected);
        }else if(!likeForm.checked){
            pagination(obj)
        }
       
    });
   const storageQuery = (get) => {
        if(get) {
            if(localStorage.getItem('likedSound')){
                JSON.parse(localStorage.getItem('likedSound')).forEach(id => likedSound.push(id))
            }
           
        } else {
            localStorage.setItem('likedSound', JSON.stringify(likedSound));
        }
    }
    const toggleLikeSound = id => {
        if(likedSound.indexOf(id) + 1){
            likedSound.splice(likedSound.indexOf(id), 1)
        } else {
            likedSound.push(id);
        }
        storageQuery()
    }


    contentWrapper.addEventListener('click', (e)=> {
        if(e.target.classList.contains('button-like')){
            e.target.classList.toggle('active')
            toggleLikeSound(e.target.id);
            console.log(likedSound);
        } 
        else if(e.target.classList.contains('button-play')){
            console.log(e.target);
        }
    });

    
    //_____________FILTER SELECT__________________
    selectForm.addEventListener('change', e => {
        const filterParam = e.target.value;
        let selected = obj.filter(item => item.genre == filterParam);
        pagination(selected);
        if(filterParam == 'all'){
            pagination(obj)
        }
    });

    //______________FILTER INPUT______________
    const findMatch = (word, obj)=>{
      return obj.filter(item => {
            const regex = new RegExp(word, 'gi');
            return item.artist.match(regex) || item.name.match(regex);
        })
        
    }
    const displayMatch = (value)=> {
        let match = findMatch(value, obj);
        if(!match.length){
           console.log(111) ///  нужно придумать как вывести отсутвие
        }
        return findMatch(value, obj);
        
    }
    inputForm.addEventListener('keyup', (e) => {
        let res = inputForm.value.trim();
        pagination(displayMatch(res));
    })
    storageQuery(true);
    //____________PAGINATION____________

    const pagWrap = document.createElement('div');
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

contentWrapper.classList.remove('img-section__wrap');
contentWrapper.classList.add('sound__wrap');
divContent.addEventListener('onload', pagination(obj));
};




const photoRender = (data)=> {
    cleanDiv(divContent);   
    let obj = setToLocal(data);
    const render = (obj)=> {
        cleanDiv(contentWrapper);
        obj.forEach((element) => {
            contentWrapper.appendChild(photoCreate(element.alt, element.url, element.category));
        });
        divContent.appendChild(contentWrapper);
        contentWrapper.classList.add('img-section__wrap')
    }
    
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
    
}




