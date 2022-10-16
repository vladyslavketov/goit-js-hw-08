// імпортуємо дефолтну змінну Player з модулю '@vimeo/player'
import Player from '@vimeo/player';
// імпортуємо дефолтну змінну throttle з модулю 'lodash.throttle'
import throttle from 'lodash.throttle';

const iframeRef = document.querySelector('iframe');
const player = new Player(iframeRef);

// відстежуємо подію оновлення часу відтворення "timeupdate" кожні 1000 мілісекунд (1 сек) за допомогою методу "throttle" та методу "on" на нашому плеєрі
player.on('timeupdate', throttle(setCurrentTimeVideoplayerToLocalStorage, 1000));

// функція записує поточний час відтворення відеоролика у локальну змінну
function setCurrentTimeVideoplayerToLocalStorage (data) {
  localStorage.setItem("videoplayer-current-time", data.seconds);
};

player.setCurrentTime(localStorage.getItem("videoplayer-current-time")).then(function(seconds) {
    // console.log(localStorage.getItem("videoplayer-current-time"));
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});