(function () {
  function buildQuiz() {
    const output = [];
    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answers = [];

      for (letter in currentQuestion.answers) {
        answers.push(
          `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
        );
      }

      output.push(
        `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
      );
    });

    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");

    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        answerContainers[questionNumber].style.color = "red";
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("Quiz");
  const resultsContainer = document.getElementById("Result");
  const submitButton = document.getElementById("Submit");
  const myQuestions = [
    {
      question: "1. What does HTML stands for?",
      answers: {
        a: "Hypertext Machine language.",
        b: "Hypertext and links markup language.",
        c: "Hypertext Markup Language.",
        d: "Hightext machine language.",
      },
      correctAnswer: "c",
    },
    {
      question: "2. Question-2",
      answers: {
        a: "wrong answer",
        b: "wrong answer",
        c: "correct answer",
        d: "wrong answer",
      },
      correctAnswer: "c",
    },
    {
      question: "3. Question-3",
      answers: {
        a: "wrong answer",
        b: "wrong answer",
        c: "wrong answer",
        d: "correct answer",
      },
      correctAnswer: "d",
    },
    {
      question: "4. Question-4",
      answers: {
        a: "wrong answer",
        b: "correct answer",
        c: "wrong answer",
        d: "wrong answer",
      },
      correctAnswer: "b",
    },
    {
      question: "5. Question-5",
      answers: {
        a: "wrong answer",
        b: "wrong answer",
        c: "wrong answer",
        d: "correct answer",
      },
      correctAnswer: "d",
    },
  ];

  buildQuiz();
  const previousButton = document.getElementById("Previous");
  const nextButton = document.getElementById("Next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(currentSlide);

  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
