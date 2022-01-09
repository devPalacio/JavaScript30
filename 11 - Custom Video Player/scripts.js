// grab elements we want to style and hook up functions too
const player = document.querySelector(".player");
const playerVideo = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const playButton = player.querySelector(".toggle");
const progressBar = player.querySelector(".progress__filled");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

//functions
function togglePlay() {
  if (playerVideo.paused) {
    playerVideo.play();
  } else {
    playerVideo.pause();
  }
}

function updateButton() {
  if (playerVideo.paused) {
    playButton.innerText = "►";
  } else {
    playButton.innerText = "⏸";
  }
}
function skip() {
  playerVideo.currentTime += parseInt(this.dataset.skip);
}
function handleRangeUpdate() {
  console.log(this.value, this.name);
  playerVideo[this.name] = this.value;
}
function handleProgress() {
  const percent = (playerVideo.currentTime / playerVideo.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubtime = (e.offsetX / progress.offsetWidth) * playerVideo.duration;
  playerVideo.currentTime = scrubtime;
}
//event listeners
playButton.addEventListener("click", togglePlay);
playerVideo.addEventListener("click", togglePlay);
playerVideo.addEventListener("play", updateButton);
playerVideo.addEventListener("pause", updateButton);
skipButtons.forEach((button) => button.addEventListener("click", skip));

ranges.forEach((slider) =>
  slider.addEventListener("change", handleRangeUpdate)
);
playerVideo.addEventListener("timeupdate", handleProgress);

let mousedown = false;
progress.addEventListener("click", scrub);

progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
