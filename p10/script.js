const musicContainer = document.getElementById('music-container');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const audio = document.getElementById('audio');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// List of Songs
const songList = [  'Dirilis Ertugrul', 
                    'Kurulus Osman', 
                    'Pirates of the Caribbean', 
                    'The Dark Knight'
                ];

// Track which song is currently playing
let currentSong = 1;

// Update the song to the DOM
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// Function to Play the Song
function playSong() {
    musicContainer.classList.add('play');
    playButton.querySelector('i.fas').classList.remove('fa-play');
    playButton.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// Function to Pause the Song
function pauseSong() {
    musicContainer.classList.remove('play');
    playButton.querySelector('i.fas').classList.remove('fa-pause');
    playButton.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

// Function to Switch to Previous Song
function prevSong() {
    currentSong--;

    if ( currentSong < 0 ) {
        currentSong = songList.length - 1;
    }
    
    loadSong(songList[currentSong]);

    playSong();
}

// Function to Switch to Next Song
function nextSong() {
    currentSong++;

    if ( currentSong > songList.length - 1 ) {
        currentSong = 0;
    }
    
    loadSong(songList[currentSong]);

    playSong();
}

// Update the Progress Bar
function updateProgress(e) {
    const { currentTime, duration } = e.srcElement;
    const progressPercentage = ( currentTime / duration ) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

// Set the Progress Bar
function setProgress(e) {
    const width = this.clientWidth;
    const offsetX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = ( offsetX / width ) * duration;
}

// Initial Song Load
loadSong(songList[currentSong]);

// Event Listeners
// 1. Play Button Event Listener
playButton.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }

})

// 2. Previous Button Event Listener
prevButton.addEventListener('click', prevSong);

// 3. Next Button Event Listener
nextButton.addEventListener('click', nextSong);

// 4. Update the Time for Song Play
audio.addEventListener('timeupdate', updateProgress);

// 5. Update the Time for Song Play based on Click on Progress Container
progressContainer.addEventListener('click', setProgress);

// 6. Automatically Play Next Song
audio.addEventListener('ended', nextSong);