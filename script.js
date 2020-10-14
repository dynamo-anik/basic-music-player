const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//music
const songs = [{
  name: 'Flo - Te rog',
  displayName: 'Flo - Te rog',
  artist: 'Flo A'
},
{
  name: 'Mihai Chitu Feat. Sandra N. - Nemuritoare',
  displayName: 'Mihai Chitu Feat. Sandra N. - Nemuritoare',
  artist: 'Sandra N'
}]

//check if playing
let isPlaying = false;

//play
function playSong() {
  music.play();
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
}

//pause
function pauseSong() {
  music.pause();
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play')
}

//event listeners
playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());

//dom udating

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

//current song
let songIndex = 0;

//next song
function nextSong() {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {

    songIndex++;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//previous song
function prevSong() {

  if (songIndex <= 0) {
    songIndex = songs.length - 1;
  } else {

    songIndex--;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//on load 
loadSong(songs[songIndex]);

//update progressbar and time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    //update progress bar 
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    //calculate duration time
    const durationMinutes = Math.floor(duration / 60);
    let durationSecond = Math.floor(duration % 60);
    if (durationSecond < 10) {
      durationSecond = `0${durationSecond}`;
    }


    //check duration element to avoid NaN
    if (durationSecond) {
      durationEl.innerText = `${durationMinutes}:${durationSecond}`;

    }

    //calculate curreent time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSecond = Math.floor(currentTime % 60);
    if (currentSecond < 10) {
      currentSecond = `0${currentSecond}`;
    }


    //check duration element to avoid NaN
    if (currentSecond) {
      currentTimeEl.innerText = `${currentMinutes}:${currentSecond}`;
    }
  }
}

//set progressBar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickedWidth = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickedWidth / width) * duration;
}


//event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);