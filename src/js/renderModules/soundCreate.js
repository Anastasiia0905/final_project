export const soundCreate = (name, artist, genre, url, id) => {
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