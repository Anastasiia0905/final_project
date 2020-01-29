export const searchForm = (arr, formClass) => {
    const filterForm = document.createElement('form');
    const inputForm = document.createElement('input')
    const selectForm = document.createElement('select');
    const checkForm = document.createElement('input');
    const checkLabel = document.createElement('label');

    
    arr.forEach((item) => {
        
        let op = document.createElement('option');
        op.textContent = item;
        selectForm.appendChild(op)
    });
    inputForm.type = 'text';
    checkForm.type = 'checkbox';
    checkForm.id = 'checkForm'
    checkLabel.setAttribute('for', 'checkForm');

    filterForm.appendChild(inputForm);
    filterForm.appendChild(selectForm);
    filterForm.appendChild(checkForm);
    filterForm.appendChild(checkLabel);

    filterForm.classList.add(formClass);
    return filterForm;
}