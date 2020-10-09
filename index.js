const { func } = require("prop-types");

let score = 0;
let difficulty = "";
let timer = 0;
let numbQuestion = 0;

//get difficulty option from user
//select input element -> get value
//return difficulty
const difficulty = function () {};
//get number of questions option from user
//select input element -> get value
//return number
const noQues = function () {};
//get questions from server depending on difficulty and amount of questions
//https://opentdb.com/api.php?amount=50&category=18&difficulty=medium
//return user question array
const getQuestions = function (difficulty, noQues) {};
//start button onclick, read userQ[0], populate card, start timer
//remove first page inputs, show card, start timer, show score
const startBtn = function (userQ) {};
//answered button on click, check if userQ is empty, check answer, update score
//if userQ is empty game over
//if answer correct -> background green, score + 1
//else answer wrong -> background red
//change card attributes
const ansInput = function (ansInput) {};
