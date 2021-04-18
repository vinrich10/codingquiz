// Variables set with array for questions and answers
var questions = [
    {
        question: "What is Code?",
        choices: ["Up, down, right, Left ", "One or more commands designed to be carried out by a computer", "All of the above"],
        answer: "One or more commands designed to be carried out by a computer"
    },
    {
        question: "What is a String?",
        choices: ["A data type used to represent text rather than numbers", "Sewing thread", "All of the above"],
        answer: "A data type used to represent text rather than numbers"
    },
    {
        question: "Which of the following is not a primitive data type",
        choices: ["Array", "Boolean", "String", "All of the Above"],
        answer: "Array"
    },
    {
        question: "What is a Loop?",
        choices: ["A toy", "The action of doing something over and over again", "All of the Above"],
        answer: "The action of doing something over and over again"
    },
    {
        question: "Is the following statement true or false? var x = 0; boolean(x);",
        choices: ["False", "True"],
        answer: "False"
    },

];

// Variables to keep track of quiz
var score = 0;
var currentquestionIndex = 0;

// Variables to reference DOM elements
var currentClock = document.querySelector("#currentClock");
var clock = document.querySelector("#startTime");
var quizInfo = document.querySelector("#quizInfo");
var questionsDiv = document.querySelector("#questionsDiv");

// Clock left is for amount of seconds per question:
var clockLeft = 101;
// wrongAnswer time
var wrongAnswer = 15;
// Holds interval time
var holdInterval = 0;
// Creates new element
var ulCreate = document.createElement("ul");

// Triggers clock to start and shows clock on screen
clock.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            clockLeft--;
            currentClock.textContent = "Time: " + clockLeft;

            if (clockLeft <= 0) {
                clearInterval(holdInterval);
                completed();
                currentClock.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(currentquestionIndex);
});

// function to show questions and choices on page: 
function render(currentquestionIndex) {
    // Clears page 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to display the questions and choices
    for (var i = 0; i < questions.length; i++) {
        // Displays new question only
        var userQuestion = questions[currentquestionIndex].question;
        var userChoices = questions[currentquestionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // Displays new choices in list form for each question
    userChoices.forEach(function (newItem) {
        var newChoices = document.createElement("li");
        newChoices.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(newChoices);
        newChoices.addEventListener("click", (compare));
    })
}
// Function to determine whether user answer is correct or not.
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var rightWrong = document.createElement("div");
        rightWrong.setAttribute("id", "createDiv");
        // Correct answer 
        if (element.textContent == questions[currentquestionIndex].answer) {
            score++;
            rightWrong.textContent = "Correct!";
        } else {
            // Will deduct 15 seconds off clockLeft for wrong answers
            clockLeft = clockLeft - wrongAnswer;
            rightWrong.textContent = "Incorrect!";
        }

    }

        // Current Question Index determines question user is on
        currentquestionIndex++;

        if (currentquestionIndex >= questions.length) {
            // Completed will append last page with user stats
            completed();
            rightWrong.textContent = "Quiz Completed!" + " You got  " + score + "/" + questions.length + " Correct!";
        } else {
            render(currentquestionIndex);
        }
        questionsDiv.appendChild(rightWrong);
    
    }
    // Completed function will append last page
    function completed() {
        questionsDiv.innerHTML = "";
        currentClock.innerHTML = "";
    
        // Quiz Completed Heading
        var createQC = document.createElement("h1");
        createQC.setAttribute("id", "createQC");
        createQC.textContent = "Quiz Completed"
    
        questionsDiv.appendChild(createQC);
    
        // New Paragraph where time will be displayed
        var newParagraph = document.createElement("p");
        newParagraph.setAttribute("id", "createP");
    
        questionsDiv.appendChild(newParagraph);
    
        // New variable to calculate score and display on screen
        if (clockLeft >= 0) {
            var timeRemaining = clockLeft;
            var newP2 = document.createElement("p");
            clearInterval(holdInterval);
            createP.textContent = "You scored " + timeRemaining;
    
            questionsDiv.appendChild(newP2);
        }


    // Asking user to enter name
    var askName = document.createElement("askName");
    askName.setAttribute("id", "createLabel");
    askName.textContent = "Enter your Name: ";

    questionsDiv.appendChild(askName);

    // Input space to enter Name at end of quiz
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "Name");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit button for final score
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submitFinal");
    createSubmit.textContent = "Submit Final Score";

    questionsDiv.appendChild(createSubmit);

    // Event listener for Name and local storage for name and score
    createSubmit.addEventListener("click", function () {
        var Name = createInput.value;

        if (Name === null) {

            console.log("No name entered");

        } else {
            var finalScore = {
                Name: Name,
                score: timeRemaining
            }
            console.log(finalScore);
            var totalScores = localStorage.getItem("allScores");
            if (totalScores === null) {
                totalScores = [];
            } else {
                totalScores = JSON.parse(totalScores);
            }
            totalScores.push(finalScore);
            var newScore = JSON.stringify(totalScores);
            localStorage.setItem("allScores", newScore);
            // Opens highscores page
            window.location.replace("./leaderboard.html");
        }
    });

}