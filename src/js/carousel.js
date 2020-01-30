let sliders, currentSlide, nextSlide, currentIndex, nextIndex, currentSelector, nextSelector, selectorsParent, selectors;

const circle = index => {
	
	nextIndex = index !== undefined ? index : nextIndex;
	
	currentSlide = sliders[currentIndex];
	nextSlide = sliders[nextIndex];	
	currentSelector = selectors[currentIndex];
	nextSelector = selectors[nextIndex];
	
	currentSlide.classList.remove('active');
	nextSlide.classList.add('active');
	currentSelector.classList.remove('current');
	nextSelector.classList.add('current');

	currentIndex = index !== undefined ? nextIndex
		: currentIndex < sliders.length - 1 ? currentIndex + 1 : 0;

	nextIndex = currentIndex + 1 < sliders.length ? currentIndex + 1 : 0;
	
}

window.onload = () => {
	 currentIndex = 0;
	 nextIndex = 1;

	selectorsParent = document.querySelector('.sliders__control_list');
	selectors = document.querySelectorAll('li[data-num]');
	sliders = document.querySelectorAll('.sliders__item');
	
	sliders[currentIndex].classList.add('active');
	selectors[currentIndex].classList.add('current');

	selectorsParent.addEventListener('click', e => {
		let target = e.target;

		if(target.classList.contains('prev')){
			index = currentIndex > 0 ? currentIndex - 1 : sliders.length - 1;
			circle(index);
		}
		if(target.classList.contains('next')){
			circle();
		}
		if(target.dataset.num){
			index = parseInt(target.dataset.num);
			
			circle(index);
		}

	})
	
}	

	const elem = document.querySelector('.resize');
	elem.style.boxSizing = 'border-box';
	const offset = elem.offsetHeight - elem.clientHeight;
	elem.addEventListener('keydown', (e)=> {
		let scrol = e.target.scrollHeight;
		console.log(scrol);
		e.target.style.height = 'auto';
		e.target.style.height = scrol	 + offset + 'px'
	});


/*function addAutoResize() {
	document.querySelectorAll('[data-autoresize]').forEach(function (element) {
	  element.style.boxSizing = 'border-box';
	  var offset = element.offsetHeight - element.clientHeight;
	  document.addEventListener('input', function (event) {
		event.target.style.height = 'auto';
		event.target.style.height = event.target.scrollHeight + offset + 'px';
	  });
	  element.removeAttribute('data-autoresize');
	});
  }*/