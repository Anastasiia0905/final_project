

const linkContent = document.querySelector('.vertical__menu'); 
const divContent = document.querySelector('.content'); 

const cleanDiv = (div) => {  
    while(div.firstChild){  
        div.removeChild(div.firstChild); 
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
async function getData(target){
    let response = await fetch(target);
    let data  = await response.json();
    return data;
};
const setToLocal = (data)=> {
    localStorage.clear();
    localStorage.setItem('items', JSON.stringify(data))
    let contentArr = JSON.parse(localStorage.getItem('items'));
    return contentArr;
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




// функция, которая прорисовует необходимый контент
// функция, которая открывает модальное окно для выбраного элемента
// обработка ошибок, catch
// прогонка через babel  !!! fetch не поддерживает
// оптимизировать создание формы
// фильтровать с localStarage?
// фильтрацию сделать асинхронной
//довавить спинер






const soundRender = (data) => {
    cleanDiv(divContent);
    const filterForm = document.createElement('form');
    const inputForm = document.createElement('input');
    const selectForm = document.createElement('select');
    const blues = document.createElement('option');
    const latina = document.createElement('option');
    const holiday = document.createElement('option');
    const classic = document.createElement('option');
    const all = document.createElement('option');


    all.textContent = 'all'
    blues.textContent = 'blues';
    latina.textContent = 'latina';
    holiday.textContent = 'holiday';
    classic.textContent = 'classic'

    selectForm.appendChild(all)
    selectForm.appendChild(blues)
    selectForm.appendChild(latina)
    selectForm.appendChild(holiday)
    selectForm.appendChild(classic)
    
    filterForm.appendChild(inputForm);
    filterForm.appendChild(selectForm);
    divContent.appendChild(filterForm);


    let contentWrapper = document.createElement('div');
    
    let obj = setToLocal(data);
    const render = (obj)=> {
        cleanDiv(contentWrapper);
        obj.forEach((element) => {
            contentWrapper.appendChild(
                soundCreate(element.name, element.artist, element.genre, element.url)
            );
        });
        divContent.appendChild(contentWrapper);
    }
    divContent.addEventListener('onload', render(obj));
    selectForm.addEventListener('change', e => {
        const filterParam = e.target.value;
        let selected = obj.filter(item => item.genre == filterParam);
        render(selected);
        if(filterParam == 'all'){
            render(obj)
        }
    });


    const findMatch = (word, obj)=>{
      return  obj.filter(item => {
            const regex = new RegExp(word, 'gi');
            return item.artist.match(regex) || item.name.match(regex);
        })
        
    }
    const displayMatch = (value)=> {
        return findMatch(value, obj);
        
    }
    inputForm.addEventListener('keyup', (e) => {
       let res = inputForm.value;
        render(displayMatch(res));
    })

};

const photoRender = (data)=> {
    cleanDiv(divContent);
    let contentWrapper = document.createElement('div');
    let obj = setToLocal(data);

    const render = (obj)=> {
        cleanDiv(contentWrapper);
        obj.forEach((element) => {
            contentWrapper.appendChild(photoCreate(element.alt, element.url, element.category));
        });
        divContent.appendChild(contentWrapper);
    }
    render(obj)
   
}




