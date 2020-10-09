let score = 0;
let difficulty = "";
let timer = 0;
let numbQuestion = 0;

//get difficulty option from user
//select input element -> get value
//return difficulty
const difficultyOpt = function () {
  let option = document.querySelector("#difficulty");
  let selected = option.options[option.selectedIndex].text;
  return selected.toLowerCase();
};
//get number of questions option from user
//select input element -> get value
//return number
const noQues = function () {
  let numQues = document.querySelector("#numQues");
  let selected = numQues.options[numQues.selectedIndex].text;
  return selected;
};

//getJson
const getJson = function (url, callback) {
  //create request
  let xhr = new XMLHttpRequest();
  //open() method initializes a request.
  xhr.open("GET", url, true);
  //The responseType value defines the response type.
  xhr.responseType = "json";
  //In the onload() method, we wait for the response from the server.
  xhr.onload = function () {
    let status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status);
    }
  };
  //The send() method sends the request
  xhr.send();
};

//get questions from server depending on difficulty and amount of questions
//https://opentdb.com/api.php?amount=50&category=18&difficulty=medium
//return user question array

let quesArray = [];
const getQuestions = function () {
  let url = `https://opentdb.com/api.php?amount=${noQues()}&category=18&difficulty=${difficultyOpt()}`;

  getJson(url, function (err, data) {
    if (err != null) {
      console.log(err);
    } else {
      quesArray = data.results;
      return quesArray;
    }
  });

  return quesArray;
};

//start button onclick, get questions, read userQ[0], populate card, start timer
//remove first page inputs, show card, start timer, show score
let questions = [];
let number = 0;
const startBtn = function () {
  questions = getQuestions();
  console.log(questions);

  populateCard(number);
};
//answered button on click, check if userQ is empty, check answer, update score
//if userQ is empty game over
//if answer correct -> background green, score + 1
//else answer wrong -> background red
//change card attributes

const submit = function () {
  let selected = "";
  let radioBtn = document.querySelectorAll(".radio");
  for (let i = 0; i < radioBtn.length; i++) {
    if (radioBtn[i].checked) {
      selected = radioBtn[i].id;
    }
  }
  let card = document.querySelector("#card");
  let scoreP = document.querySelector("#score");
  if (selected !== "") {
    if (selected == questions[number].correct_answer) {
      score++;
      scoreP.innerHTML = score;
      alert("Correct");
      card.classList.remove("bg-primary");
      card.classList.add("bg-success");
    } else {
      alert(`Wrong, correct answer is ${questions[number].correct_answer}`);
      card.classList.remove("bg-primary");
      card.classList.add("bg-danger");
    }
    number++;
    if (number >= questions.length) {
      alert("Complete");
    } else {
      populateCard(number);
    }
  } else {
    alert("Pick an answer");
  }

  console.log(selected);
};

const populateCard = function (num) {
  //find the card on html and populate card
  let card = document.querySelector("#card");
  //if questions tag not created create it
  if (document.querySelector("h3") === null) {
    let questionP = document.createElement("h3");
    questionP.setAttribute("id", "question");
    card.append(questionP);
  }
  let questionP = document.querySelector("#question");
  questionP.innerHTML = questions[num].question;
  card.append(questionP);
  let answers = [];
  answers.push(questions[num].correct_answer);
  questions[num].incorrect_answers.forEach((answer) => {
    answers.push(answer);
  });
  //randomizes answers
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = answers[i];
    answers[i] = answers[j];
    answers[j] = temp;
  }
  //if answer tags not created, create it, else remove all and create again
  if (document.querySelector(".radio") !== null) {
    let radio = document.querySelectorAll(".radio");
    let label = document.querySelectorAll("label");
    radio.forEach((i) => {
      i.remove();
    });
    label.forEach((i) => {
      i.remove();
    });
  }
  if (document.querySelector(".radio") === null) {
    answers.forEach((answer) => {
      let answerP = document.createElement("input");
      answerP.setAttribute("type", "radio");
      answerP.setAttribute("class", "radio");
      answerP.setAttribute("id", answer);
      answerP.name = "answer";
      let label = document.createElement("label");
      label.appendChild(answerP);
      label.appendChild(document.createTextNode(answer));
      card.append(label);
    });
  }
  card.classList.remove("bg-danger");
  card.classList.remove("bg-success");
  card.classList.add("bg-primary");
};
