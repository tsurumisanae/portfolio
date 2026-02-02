let answers = {
    q1: null,
    q2: null
};

function startTest() {
    switchScreen('start-screen', 'question-1');
}

function answerQ1(answer) {
    answers.q1 = answer;
    // Add a small delay for better UX
    setTimeout(() => {
        switchScreen('question-1', 'question-2');
    }, 300);
}

function answerQ2(answer) {
    answers.q2 = answer;
    calculateResult();
    setTimeout(() => {
        switchScreen('question-2', 'result-screen');
    }, 300);
}

function switchScreen(fromId, toId) {
    const fromScreen = document.getElementById(fromId);
    const toScreen = document.getElementById(toId);

    fromScreen.classList.remove('active');

    // Wait for fade out animation (if we were using one, but simple display toggle is safer for now with the CSS setup)
    // Actually our CSS uses active class for display flex/none. 
    // To make it smooth, we can just toggle immediately or add transition logic.
    // The current CSS has a fade-in animation on .active.

    setTimeout(() => {
        toScreen.classList.add('active');
    }, 100);
}

function calculateResult() {
    let score = 0;
    if (answers.q1 === 'B') score++;
    if (answers.q2 === 'B') score++;

    const resultTextElement = document.getElementById('result-text');
    const resultMessageElement = document.getElementById('result-message');

    let resultText = '';
    let resultMessage = '';
    let color = '';

    if (score === 2) {
        resultText = '鬱 100％';
        resultMessage = 'かなりお疲れのようです。<br>無理をせず、専門機関への相談も検討してください。';
        color = '#ec4899'; // Pink/Red for warning
    } else if (score === 1) {
        resultText = '鬱 50％';
        resultMessage = '少し疲れが溜まっているかもしれません。<br>ゆっくり休む時間を作りましょう。';
        color = '#8b5cf6'; // Purple for neutral/caution
    } else {
        resultText = '健康';
        resultMessage = '心身ともに良好な状態です！<br>この調子で過ごしましょう。';
        color = '#38bdf8'; // Blue for healthy
    }

    resultTextElement.textContent = resultText;
    resultTextElement.style.color = color;
    resultMessageElement.innerHTML = resultMessage;
}

function resetTest() {
    answers.q1 = null;
    answers.q2 = null;
    switchScreen('result-screen', 'start-screen');
}
