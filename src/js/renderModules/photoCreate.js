export const photoCreate = (alt, url, category) => {
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