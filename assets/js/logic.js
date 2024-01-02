// Dom Elements 
// Explanation of the quiz
// Start button

var questionElement = document.querySelector("#questions");
var timer = document.querySelector("#time");
var choicesElement = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#initials");
var feedbackElem = document.querySelector("#feedback");
var promptElem = document.getElementById("question-title");
var screenEnd = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");

// Set of questions --> array of objects
// Question text
// Set of answers
var questions = [
  {
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mars", "Mercury", "Earth"],
    answer: "Mercury",
  },
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome",],
    answer: "Paris",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answer: "Blue Whale",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Ernest Hemingway", "Mark Twain", "Harper Lee", "J.D. Salinger"],
    answer: "Harper Lee",
  },
];


var questionIndex = 0;
var time = questions.length * 15;
var timerId;

// Start quiz

function startQuiz() {
  timerId = setInterval(clockTick, 1000);
  timer.textContent = time;
  var landingScreenEl = document.getElementById("start-screen");
  landingScreenEl.setAttribute("class", "hide");
  questionElement.removeAttribute("class");
  showQuestion();
}

// Loop through array of questions and answers and create list with buttons

function showQuestion() {
  var currQuestion = questions[questionIndex];
  promptElem.textContent = currQuestion.question;
  choicesElement.innerHTML = "";
  currQuestion.options.forEach(function (choice, i) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    choiceBtn.onclick = questionClick;
    choicesElement.appendChild(choiceBtn);
  });
}

  // Which answer is correct
  // Timer starts
  // Their choice is compared to the correct answer as stored in the question's object
  // If correct, tell them
  // If incorrect, tell them AND subtract time from the timer

function questionClick() {
  if (this.value !== questions[questionIndex].answer) {
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    timer.textContent = time;
    feedbackElem.textContent = `Wrong! The correct answer is ${questions[questionIndex].answer}.`;
    feedbackElem.style.color = "orange";
  } else {
    feedbackElem.textContent = "Correct!";
    feedbackElem.style.color = "yellow";
  }
  feedbackElem.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackElem.setAttribute("class", "feedback hide");
  }, 2000);
  questionIndex++;
  questionIndex === questions.length ? finishQuiz() : showQuestion();
}

  // Question disappears

function finishQuiz() {
  clearInterval(timerId);
  screenEnd.removeAttribute("class");
  finalScore.textContent = time;
  questionElement.setAttribute("class", "hide");
}

// End quiz if timer reaches 0

function clockTick() {
  time--;
  timer.textContent = time;
  if (time <= 0) {
    finishQuiz();
  }
}

// Save score in local storage , Display their score

function saveHighscore() {
  var name = nameEl.value.trim();
  if (name !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      name: name,
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
  }
}

// Save users' score after clicking submit

submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz

startBtn.onclick = startQuiz;
