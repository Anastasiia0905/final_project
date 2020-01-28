export const videoCreate = (url, duration,) => {
    let video = document.createElement('video');
    video.src = url;
    video.setAttribute('controls', true)
    return video;
}