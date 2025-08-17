let questionPool = [...questions];
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

const quizEl = document.getElementById("quiz");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const retryBtn = document.getElementById("retry-btn");

function pickRandomQuestions() {
  quizQuestions = [];
  let pool = [...questionPool];
  while (quizQuestions.length < 10) {
    const idx = Math.floor(Math.random() * pool.length);
    quizQuestions.push(pool[idx]);
    pool.splice(idx, 1);
  }
}

function loadQuestion() {
  feedbackEl.textContent = "";
  const currentQuestion = quizQuestions[currentQuestionIndex];
  quizEl.innerHTML = `<h2>${currentQuestion.question}</h2>` +
    currentQuestion.options.map(option => `<button class='option'>${option}</button>`).join("");
  document.querySelectorAll(".option").forEach(button => {
    button.onclick = () => selectAnswer(button, currentQuestion.answer);
  });
}

function selectAnswer(button, correctAnswer) {
  document.querySelectorAll(".option").forEach(btn => btn.onclick = null);
  if (button.textContent === correctAnswer) {
    feedbackEl.textContent = "✅ Correct!";
    score++;
  } else {
    feedbackEl.textContent = "❌ Wrong! Correct answer: " + correctAnswer;
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    showFinalScore();
  }
});

function showFinalScore() {
  quizEl.innerHTML = `<h2>🎉 Congratulations! You finished the quiz.</h2>
                      <p>Your final score is: ${score} / ${quizQuestions.length}</p>`;
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
  retryBtn.classList.remove("hidden");
}

retryBtn.addEventListener("click", () => {
  score = 0;
  currentQuestionIndex = 0;
  nextBtn.style.display = "inline-block";
  retryBtn.classList.add("hidden");
  pickRandomQuestions();
  loadQuestion();
});

// Initialize quiz
pickRandomQuestions();
loadQuestion();