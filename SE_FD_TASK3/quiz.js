const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Technical Markdown Language"
    ],
    answer: 0
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Syntax"
    ],
    answer: 2
  },
  {
    question: "What is the correct syntax for referring to an external script called 'app.js'?",
    options: [
      "<script href='app.js'>",
      "<script name='app.js'>",
      "<script src='app.js'>",
      "<script file='app.js'>"
    ],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => checkAnswer(li, index));
    optionsEl.appendChild(li);
  });
}

function checkAnswer(selectedLi, selectedIndex) {
  const correctIndex = quizData[currentQuestion].answer;
  const allOptions = optionsEl.querySelectorAll("li");

  allOptions.forEach((li, index) => {
    li.classList.remove("correct", "wrong");
    if (index === correctIndex) li.classList.add("correct");
    else if (index === selectedIndex) li.classList.add("wrong");
    li.style.pointerEvents = "none";
  });

  if (selectedIndex === correctIndex) score++;
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
    nextBtn.style.display = "none";
  } else {
    showResults();
  }
});

function showResults() {
  document.getElementById("quiz-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `You scored ${score} out of ${quizData.length}`;
}

// Initialize quiz
loadQuestion();
