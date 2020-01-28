const navSlide = () => {
    const burger = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__list');
    const navMenuItem = document.querySelectorAll('.nav__list_item');

    burger.addEventListener('click', () => {
        
        navMenu.classList.toggle('active');
        burger.classList.toggle('active');
       
        navMenuItem.forEach((item, index)=> {
            if(item.style.animation){
                item.style.animation = '';
            } else {
                item.style.animation = `navSliderFade 0.5s ease forwards ${index / 5 + 1}s`;
            }
        });
    });
    

}
navSlide();