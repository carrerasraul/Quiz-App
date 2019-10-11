const startButton = document.getElementById('main-container')
const questionContainer = document.getElementById('question-container')

startButton.addEventListener('click', startQuiz)

function startQuiz() {
    $('#start').on('click', function(event) {
        displayQuestion();
        startButton.classList.add('hide')
        questionContainer.classList.remove('hide')
    });
}

function displayQuestion() {
    let question = STORE.questions[STORE.currentQuestion];
    console.log(question.question)
    $("#question").html(question.question)

    /*const questionList = $(`<div id="question-container"></div>
    <p id="question">${question.question}</p>
    <div id="answer-btns" class="answer-btn">
        <button class="btn">Answer</button>
        <button class="btn">Answer</button>
        <button class="btn">Answer</button>
        <button class="btn">Answer</button>
    </div>

    <div class="controls">
        <button id="start-quiz" class="start-btn">START</button>
        <button id="next-btn" class="next-btn hide">NEXT</button>
    </div>`);
    console.log(questionList) */
}







startQuiz()
