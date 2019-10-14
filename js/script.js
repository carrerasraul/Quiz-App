const startButton = document.getElementById('start')
const questionContainer = document.getElementById('question-container')
const nextButton = document.getElementById('next-btn')
const findOut = document.getElementById('start-container')
const selectAnswer = document.getElementById('button')


startButton.addEventListener('click', startQuiz)

function startQuiz() {
    $('#start').on('click', function(event) {
        displayQuestion();
        startButton.classList.add('hide')
        findOut.classList.add('hide')
    });
}

function updateQuestionAndScore() {
    const html = $(
        `<div id="quiz-progress-bar" class="quiz-bar">
            <span class="quiz-progress">Question: <span class="question-num">${STORE.currentQuestion + 1}</span> / ${STORE.questions.length}</span>
        </div>


        <div id="quiz-score" class="score">
            <span class="number-correct">Current Score: <span class="num-correct">${STORE.score}</span> / ${STORE.questions.length}</span>
        </div>`);
    $('.score-and-question').html(html);
}

function displayQuestion() {
    let question = STORE.questions[STORE.currentQuestion];

    const questionList = $(`<p id="question">${question.question}</p>
    <div id="answer-btns" class="answer-btn">
        <button class="btn">${question.options[0]}</button>
        <button class="btn">${question.options[1]}</button>
        <button class="btn">${question.options[2]}</button>
        <button class="btn">${question.options[3]}</button>
    </div>`);

    $('#question-container').html(questionList)
    updateQuestionAndScore()
}

function correctAnswer() {
    if (correct) {
        Element.classList.add('correct')
    } else {
        Element.classList.add('wrong')
    }
    nextButton.classList.remove('hide')
}

function chooseAnswer() {
    $('main').on('submit', 'answer-btns', function(event) {
        let currentQ = STORE.questions[STORE.currentQuestion];
        let selection = $("input[name=options]:checked").val();
        let answer = selection.val();
        let correct = STORE[currentQuestion].answer;
        if (answer === correct) {
            correctAnswer()
        }
    });
}




chooseAnswer()
startQuiz()
