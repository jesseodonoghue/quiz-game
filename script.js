// DOM Element Variables
const timerEl = document.getElementById("timer");
const questionContainerEl = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerButtonsEl = document.getElementById("answer-buttons");
const statusContainerEl = document.getElementById("status-container");
const answerSpanEl = document.getElementById("ans-status");
const initialsContainerEl = document.getElementById("initials-container");
const scoreSpanEl = document.getElementById('score');
const initialsTextEl = document.getElementById("initials");
const buttonInitialsEl = document.getElementById("btn-initials");
const hiScoreContainerEl = document.getElementById("hi-score-container");
const tableScoreEl = document.getElementById("score-table");
const clearButtonEl = document.getElementById("clear");
const restartButtonEl = document.getElementById("restart");
const startButtonContainerEl = document.getElementById("start-btn");
const startButtonEl = document.getElementById("btn-start");

// Quiz Variables
let nextQuestion = "";
let score = 0;
let timer = 0;
let timerGo = 0;
let firstQuestion = true;

// Questions and Answers Object

const questions = [
    {
        question: 'Inside which HTML element do we put JavaScript?' ,
        answers: [
            { text: '<scripting>', correct: false }, 
            { text: '<javascript>', correct: false },
            { text: '<js>', correct: false },
            { text: '<script>', correct: true }
        ]
    },
    {
        question: 'What is the correct syntax for linking your script file?',
        answers: [
            { text: '<script url="script.js">', correct: false },
            { text: '<script href="script.js">', correct: false },
            { text: '<link src="script.js"', correct: false },
            { text: '<script src="script.js">', correct: true }
        ]
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: [
            { text: 'alertBox("Hello World");', correct: false },
            { text: 'msg("Hello World");', correct: false },
            { text: 'alert("Hello World");', correct: true },
            { text: 'msgBox("Hello World");', correct: false }
        ]
    },
    {
        question: 'How do you write an IF statement in JavaScript?',
        answers: [
            { text: 'if i === 5 then', correct: false },
            { text: 'if (i === 5)', correct: true },
            { text: 'if i = 5 then', correct: false },
            { text: 'if i = 5', correct: false }
        ]
    },
    {
        question: 'How does a FOR loop start?',
        answers: [
            { text: 'for (i = 0; i <=5)', correct: false },
            { text: 'for (i = 0; i <=5; i++)', correct: true },
            { text: 'for (i <=5; i++)', correct: false },
            { text: 'for i = 1 to 5', correct: false }
        ]
    },
    {
        question: 'How can you add a comment in JavaScript?',
        answers: [
            { text: "' This is a comment", correct: false },
            { text: '<!-- This is a comment -->', correct: false },
            { text: '** This is a comment', correct: false },
            { text: '// This is a comment', correct: true }
        ]
    },
    {
        question: 'How do you round 7.25 to the nearest integer?',
        answers: [
            { text: 'Math.round(7.25)', correct: true },
            { text: 'rnd(7.25)', correct: false },
            { text: 'Math.rnd(7.25)', correct: false },
            { text: 'round(7.25)', correct: false }
        ]
    },
    {
        question: 'How do you find which number has the highest value?',
        answers: [
            { text: 'Math.ceil(x, y)', correct: false },
            { text: 'ceil(x, y)', correct: false },
            { text: 'top(x, y)', correct: false },
            { text: 'Math.max(x, y)', correct: true }
        ]
    },
    {
        question: 'How do you declare a variable in JavaScript?',
        answers: [
            { text: 'variable carName', correct: false },
            { text: 'v carName', correct: false },
            { text: 'var carName', correct: true },
            { text: 'carName', correct: false }
        ]
    },
    {
        question: 'Which operator is used to assign a value to a variable?',
        answers: [
            { text: '+', correct: false },
            { text: '*', correct: false },
            { text: 'x', correct: false },
            { text: '=', correct: true }
        ]
    }
];

// Functions

function timerTick() {
    timerEl.innerHTML = timer;
    if(timer > 0) {
        timerGo = setTimeout(timerTick, 1000);
    } else {
        timerEl.innerHTML = "0";
        displayScore();
    }
    timer--;
}

function startGame () {
    startButtonContainerEl.classList.add('hide');
    questionContainerEl.classList.remove('hide');
    nextQuestion = 0;
    timer = 30;
    score = 0;
    firstQuestion = true;
    setQuestion();
    timerTick();    
}

function setQuestion () {
    showNextQuestion(questions[nextQuestion++]);
}

function showNextQuestion (question) {
    questionEl.innerHTML = question.question;
    answerButtonsEl.innerHTML = "";
    question.answers.sort((a, b) => {
        return Math.random() - 0.5;
    });

    question.answers.forEach(element => {
        let button = document.createElement('button');
        button.classList.add('btn');
        button.innerText = element.text;
        button.dataset.correct = element.correct;
        answerButtonsEl.appendChild(button);
    });        
}

function selectAnswer (element) {
    const ansBtn = element.target;

    if(ansBtn.classList.contains('btn')) {
        if(firstQuestion === true) {
            statusContainerEl.classList.remove('hide');
            firstQuestion === false;
        }

        if (ansBtn.dataset.correct == 'true') {
            score++;
            answerSpanEl.setAttribute("class", "ans-correct");
            answerSpanEl.innerHTML = "Correct";
        } else {
            answerSpanEl.setAttribute("class", "ans-incorrect");
            answerSpanEl.innerHTML = "Incorrect";
            timer -= 5;
        }

        if (nextQuestion >= questions.length) {
            displayScore();
        } else {
            setQuestion();
        }
    }
}

function displayScore() {
    questionContainerEl.classList.add('hide');
    initialsContainerEl.classList.remove('hide');

    scoreSpanEl.innerHTML = score;
    clearTimeout(timerGo);
}

function submitScore () {
    initialsContainerEl.classList.add('hide');
    hiScoreContainerEl.classList.remove('hide');

    let userInitial = initialsTextEl.value;
    userInitial = userInitial.toUpperCase();
    let scores = JSON.parse(localStorage.getItem('scores'));
    
    if (scores === null) {
        scores = [];
    }

    let newScore = { score:score, name:userInitial };
    scores = scores.concat(newScore);

    scores.sort((a,b) => {
        return b.score - a.score
    });

    localStorage.setItem('scores', JSON.stringify(scores));
    tableScoreEl.innerHTML = "";

    scores.forEach(element => {
        let newTR = document.createElement('tr');
        let newTD1 = document.createElement('td');
        let newTD2 = document.createElement('td');

        newTD1.innerHTML = element.name;
        newTD2.innerHTML = element.score;

        newTR.appendChild(newTD1);
        newTR.appendChild(newTD2);
        tableScoreEl.appendChild(newTR);
    });

}

function clearScores() {
    localStorage.removeItem('scores');
    tableScoreEl.innerHTML = "";
}

function resetGame () {    
    hiScoreContainerEl.classList.add('hide');
    statusContainerEl.classList.add('hide');
    startGame();
}


// On Click Handlers

startButtonEl.addEventListener("click", startGame);
answerButtonsEl.addEventListener("click", selectAnswer);
buttonInitialsEl.addEventListener("click", submitScore);
clearButtonEl.addEventListener("click", clearScores);
restartButtonEl.addEventListener("click", resetGame);