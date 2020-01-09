const linkContent = document.querySelector('.vertical__menu');
const contentDiv = document.querySelector('#content');

linkContent.addEventListener('click', (e) => {
    e.preventDefault();
    target = e.target.parentElement.getAttribute('href');

    let request = new XMLHttpRequest(); 
    request.open('GET', target);
    request.onload = () => {
        contentDiv.innerHTML = request.responseText;
    };
    console.log(target);
    request.send();
});

