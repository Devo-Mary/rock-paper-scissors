let userScore = 0;
let compScore = 0;
let gameRunning = false;
let timeLeft = 15;
let countdownTimer;

let startBtn = document.getElementById('start')
let timer = document.getElementById('time-left')
let startAgainBtn = document.getElementById('start-again-btn')
let resultHTML = document.getElementById('result')
let userScoreHTML = document.getElementById('user-score');
let compScoreHTML = document.getElementById('comp-score')


function start() {
    if (!gameRunning) {
        gameRunning = true;
        startBtn.disabled = true;
        countdownTimer = setInterval(updateTimer, 1000)
    }
}

function updateTimer() {
    timeLeft --;
    timer.innerHTML = timeLeft
    if (timeLeft <= 0) {
        endGame()
    }
}

function endGame() {
    gameRunning = false;
    clearInterval(countdownTimer);
    startAgainBtn.style.display = 'block';
    startAgainBtn.disabled = false
    startBtn.style.display = "none"
    resultHTML.innerHTML = 'Oyun bitdi!'
}

function choices(user){
    if (!gameRunning) return;
    const choices = ['daş', 'kağız', 'qayçı']
    const compChoice = choices [Math.floor(Math.random()*choices.length)]
    resultHTML.innerHTML = `Sizin seçiminiz: ${user} - Komputerin seçimi: ${compChoice}`
    const result = determineWinner(user, compChoice)
    updateScore(result)
}

function determineWinner(user, computer) {
    if (user === computer) {
        return 'beraber'
    }
    else if (
        (user === 'daş' && computer === 'qayçı') ||
        (user === 'kağız' && computer === 'daş') ||
        (user === 'qayçı' && computer === 'kağız')
    ){
        return 'user'
    }
    else{
        return 'comp';
    }
}

function updateScore(winner) {
    if (winner == 'user') {
        userScore++;
        resultHTML.innerHTML = 'Siz qalib geldiniz!'
    }
    else if (winner == 'comp'){
        compScore++
        resultHTML.innerHTML = 'Komputer qalib geldi'
    }
    else{
        resultHTML.innerHTML = 'Beraber qaldiniz'
    }
    userScoreHTML.innerHTML = userScore;
    compScoreHTML.innerHTML = compScore;
}

function startAgain() {
    userScore = 0;
    compScore = 0;
    timeLeft = 15;
    userScoreHTML.innerHTML = userScore;
    compScoreHTML.innerHTML = compScore;
    timer.innerHTML = timeLeft;
    resultHTML.innerHTML = ''
    startAgainBtn.disabled = true
    start()

}