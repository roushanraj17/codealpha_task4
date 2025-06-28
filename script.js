const songs = [
  { title: "Vibe On", artist: "DJ Pulse", src: "songs/song1.mp3" },
  { title: "Rhythm Flow", artist: "Beat King", src: "songs/song2.mp3" },
  { title: "Skyline", artist: "Neo Synth", src: "songs/song3.mp3" }
];

let current = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
}

function nextSong() {
  current = (current + 1) % songs.length;
  loadSong(current);
  audio.play();
  playBtn.textContent = "⏸";
}

function prevSong() {
  current = (current - 1 + songs.length) % songs.length;
  loadSong(current);
  audio.play();
  playBtn.textContent = "⏸";
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);

playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);


songs.forEach((song, i) => {
  const div = document.createElement("div");
  div.textContent = `${song.title} - ${song.artist}`;
  div.addEventListener("click", () => {
    current = i;
    loadSong(i);
    audio.play();
    playBtn.textContent = "⏸";
  });
  playlist.appendChild(div);
});

loadSong(current);
