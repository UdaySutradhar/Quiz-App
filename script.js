let currentQuestionIndex = 0;
let score = 0;

const quizEl = document.getElementById("quiz");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
  feedbackEl.textContent = "";
  const currentQuestion = questions[currentQuestionIndex];
  quizEl.innerHTML = `
    <h2>${currentQuestion.question}</h2>
    ${currentQuestion.options.map(option => `<button class='option'>${option}</button>`).join("")}
  `;
  document.querySelectorAll(".option").forEach(button => {
    button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
  });
}

function selectAnswer(button, correctAnswer) {
  if (button.textContent === correctAnswer) {
    feedbackEl.textContent = "Correct!";
    score++;
  } else {
    feedbackEl.textContent = "Wrong! Correct answer: " + correctAnswer;
  }
  nextBtn.style.display = "block";
}

function showFinalScore() {
  quizEl.innerHTML = `<h2>🎉 Congratulations! You finished the quiz.</h2>
                      <p>Your final score is: ${score} / ${questions.length}</p>`;
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
    nextBtn.style.display = "none";
  } else {
    showFinalScore();
  }
});

// Start quiz
loadQuestion();
nextBtn.style.display = "none";