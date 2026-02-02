let timer;
let timeLeft;
let isRunning = false;
let totalTime = 25 * 60;

const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

// Elements
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const modeBtns = document.querySelectorAll('.mode-btn');

// Sounds
const sounds = {
    rain: document.getElementById('soundRain'),
    cafe: document.getElementById('soundCafe'),
    fire: document.getElementById('soundFire')
};
const soundBtns = {
    rain: document.getElementById('rainBtn'),
    cafe: document.getElementById('cafeBtn'),
    fire: document.getElementById('fireBtn')
};
const volumeSlider = document.getElementById('volumeSlider');

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

function updateTimeDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const percent = ((totalTime - timeLeft) / totalTime) * 100;
    setProgress(percent);
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timer);
        startBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        timer = setInterval(() => {
            timeLeft--;
            updateTimeDisplay();
            if (timeLeft <= 0) {
                clearInterval(timer);
                startBtn.innerHTML = '<i class="fas fa-play"></i>';
                isRunning = false;
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'icons/icon48.png',
                    title: 'Time is up!',
                    message: 'Great job! Take a break.'
                });
            }
        }, 1000);
        startBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    startBtn.innerHTML = '<i class="fas fa-play"></i>';
    timeLeft = totalTime;
    updateTimeDisplay();
    setProgress(0);
}

function switchMode(e) {
    const mins = parseInt(e.target.dataset.time);
    totalTime = mins * 60;

    modeBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    resetTimer();
}

function toggleSound(type) {
    const audio = sounds[type];
    const btn = soundBtns[type];

    if (audio.paused) {
        // Pause others to avoid chaos (optional)
        Object.keys(sounds).forEach(k => {
            if (k !== type) {
                sounds[k].pause();
                soundBtns[k].classList.remove('active');
            }
        });

        audio.play();
        btn.classList.add('active');
    } else {
        audio.pause();
        btn.classList.remove('active');
    }
}

// Event Listeners
startBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);

modeBtns.forEach(btn => btn.addEventListener('click', switchMode));

Object.keys(soundBtns).forEach(key => {
    soundBtns[key].addEventListener('click', () => toggleSound(key));
});

volumeSlider.addEventListener('input', (e) => {
    const vol = e.target.value;
    Object.values(sounds).forEach(audio => audio.volume = vol);
});

// Initialize
timeLeft = totalTime;
updateTimeDisplay();
setProgress(0);
