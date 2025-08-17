let currentQuestionIndex = 0;
let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0;

function loadQuestion() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";
  if (currentQuestionIndex < questions.length) {
    const q = questions[currentQuestionIndex];
    const questionEl = document.createElement("h2");
    questionEl.textContent = q.question;
    container.appendChild(questionEl);
    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(i);
      container.appendChild(btn);
    });
  } else {
    showResults();
  }
}

function checkAnswer(i) {
  const q = questions[currentQuestionIndex];
  const result = document.getElementById("result-container");
  if (i === q.answer) {
    score++;
    result.innerHTML = `<p class='correct'>Correct! ${q.explanation}</p>`;
  } else {
    result.innerHTML = `<p class='wrong'>Wrong! ${q.explanation}</p>`;
  }
  updateScore();
}

function updateScore() {
  const scoreContainer = document.getElementById("score-container");
  scoreContainer.innerHTML = `Score: ${score} | Best Score: ${bestScore}`;
}

function nextQuestion() {
  currentQuestionIndex++;
  document.getElementById("result-container").innerHTML = "";
  loadQuestion();
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    document.getElementById("result-container").innerHTML = "";
    loadQuestion();
  }
}

function skipQuestion() {
  currentQuestionIndex++;
  loadQuestion();
}

function showResults() {
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);
  }
  document.getElementById("quiz-container").innerHTML = `<h2>Quiz Completed!</h2>`;
  document.getElementById("result-container").innerHTML = `<p>Your Score: ${score}/${questions.length}</p>`;
  updateScore();
}

document.getElementById("next").onclick = nextQuestion;
document.getElementById("prev").onclick = prevQuestion;
document.getElementById("skip").onclick = skipQuestion;

loadQuestion();
updateScore();
