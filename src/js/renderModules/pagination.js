import {render} from './render'

const onPage = 5;
export const pagination = (obj, pagWrap, divContent) =>{
    let ul = document.createElement('ul'); 
    ul.classList.add('pagination__nav');
    if(pagWrap.hasChildNodes(ul)){
        pagWrap.innerHTML = ''; 
    }
    
    let countOfPage = Math.ceil(obj.length / onPage);
    for(let i = 1; i <= countOfPage; i++){
        let li = document.createElement('li');
        li.textContent = i;
        ul.appendChild(li);
    }

    pagWrap.appendChild(ul);
    divContent.appendChild(pagWrap)
    return render(obj.slice(0, onPage));
    

} 
export const selectPage = (obj, e) => {
        e.classList.add('active')
        let pageNum = +e.innerHTML;
        let start = (pageNum - 1) * onPage;
        let end = start + onPage;
        let note = obj.slice(start, end);
        return render(note);
}