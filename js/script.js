const startButton = document.getElementById('start')
const questionContainer = document.getElementById('question-container')
const nextButton = document.getElementById('next-btn')
const submitButton = document.getElementById('submit')
const restartButton = document.getElementById('restart')
const findOut = document.getElementById('start-container')
const selectAnswer = document.getElementById('button')
const mainContainer = document.getElementById('main-container')
const messageBanner = document.getElementById('find-out')


let question, 
    answerButtons, 
    selectedAnswer, 
    selectedElement,
    correctAnswer;


startButton.addEventListener('click', startQuiz)
submitButton.addEventListener('click', handleCheckAnswer)
nextButton.addEventListener('click', displayQuestion)
restartButton.addEventListener('click', finalResults)


function startQuiz() {
    $('#start').on('click', function(event) {
        displayQuestion();
        startButton.classList.add('hide')
        findOut.classList.add('hide')
    });
}

function updateScore() {
    const html = $(
        `<div id="quiz-progress-bar" class="quiz-bar">
            <span class="quiz-progress">Question: <span class="question-num">${STORE.currentQuestion + 1 === 6 ? '5' : STORE.currentQuestion + 1}</span> / ${STORE.questions.length}</span>
        </div>
        <div id="quiz-score" class="score">
            <span class="number-correct">Current Score: <span class="num-correct">${STORE.score}</span> / ${STORE.questions.length}</span>
        </div>`);
    $('.score-and-question').html(html);
}

function displayQuestion() {
    if (STORE.currentQuestion === STORE.questions.length) {
        finalResults()
    } else {
        question = STORE.questions[STORE.currentQuestion];
        correctAnswer = question.answer;
        updateBorder(mainContainer)
        updateBorder(selectedElement)
        const questionList = $(`<p id="question">${question.question}</p>
        <div id="answer-btns" class="answer-btn">
            <button class="btn">${question.options[0]}</button>
            <button class="btn">${question.options[1]}</button>
            <button class="btn">${question.options[2]}</button>
            <button class="btn">${question.options[3]}</button>
        </div>`);

        $('#question-container').html(questionList)
        submitButton.classList.remove('hide')
        nextButton.classList.add('hide')
        answerButtons = document.getElementById('answer-btns')
        answerButtons.addEventListener('click', handleAnswerSelection)
        updateScore()
    }
}

function handleAnswerSelection(evt) {
    submitButton.classList.remove('hide')
    selectedAnswer = evt.target.textContent
    selectedElement = evt.target
}

function handleCheckAnswer(evt) {
    if (!selectedAnswer) return
    if (STORE.questions[STORE.currentQuestion].answer === selectedAnswer) {
        STORE.score++
            STORE.currentQuestion < 5 && STORE.currentQuestion++
            selectedAnswer = ""
        nextButton.classList.add('hide')
        selectedElement.style.border = "3px solid green"
        mainContainer.style.border = "5px solid green"
        let feedbackCorrect = `<section class="result-box-correct">Correct!</section>`
        $('#answer-btns').append(feedbackCorrect)
        updateScore()
        submitButton.classList.add('hide')
        nextButton.classList.remove('hide')
    } else {
        STORE.currentQuestion < 5 && 
        STORE.currentQuestion++
        selectedAnswer = ""
        selectedElement.style.border = "3px solid red"
        mainContainer.style.border = "5px solid red"
        let feedbackWrong = `<section class="result-box-wrong">Wrong! The correct answer is "${correctAnswer}"</section>`
        $('#answer-btns').append(feedbackWrong)
        correctAnswer = "";
        submitButton.classList.add('hide')
        nextButton.classList.remove('hide')
    }
}

function updateBorder(element) {
    if(element) {
        setTimeout(function() {
            element.style.border = "3px solid black"
        }, 1000)
    }
}

function finalResults() {
  let resultsScreen = $(
    `<div id="question-container">
            <p id="complete">COMPLETE!</p>

            <p>You Scored: ${STORE.score} / ${STORE.questions.length}</p>

            <div class="controls">
                <button id="restart" class="restart-btn">RESTART QUIZ</button></div> </div>`);
    STORE.currentQuestion = 0;
    STORE.score = 0;
  $("question-container").html(resultsScreen);
}

function restartQuiz() {
  window.location.reload()
}

startQuiz()
