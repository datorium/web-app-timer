window.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer-display');
    const startButton = document.getElementById('start-btn');
    const pauseButton = document.getElementById('pause-btn');
    const resetButton = document.getElementById('reset-btn');
    let timerInterval;
    let minutes = 0;
    let seconds = 0;
    let deciseconds = 0;
    let isPaused = false;

    function startTimer() {
        timerInterval = setInterval(updateTimer, 100);
        startButton.disabled = true;
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        isPaused = true;
        startButton.textContent = 'Resume';
        startButton.disabled = false; // Added line
    }
    
    function resumeTimer() {
        isPaused = false;
        timerInterval = setInterval(updateTimer, 100);
        startButton.disabled = true;
        startButton.textContent = 'Start';
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isPaused = false;
        startButton.disabled = false;
        startButton.textContent = 'Start';
        minutes = 0;
        seconds = 0;
        deciseconds = 0;
        updateTimerDisplay();
    }

    function updateTimer() {
        deciseconds++;
        if (deciseconds === 10) {
            seconds++;
            deciseconds = 0;
        }
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        updateTimerDisplay();
    }

    function updateTimerDisplay() {
        const minutesDisplay = padDigits(minutes, 2);
        const secondsDisplay = padDigits(seconds, 2);
        const decisecondsDisplay = padDigits(deciseconds, 1);
        timerDisplay.textContent = minutesDisplay + ':' + secondsDisplay + ':' + decisecondsDisplay;
    }

    function padDigits(number, digits) {
        return String(number).padStart(digits, '0');
    }

    startButton.addEventListener('click', isPaused ? resumeTimer : startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
});
