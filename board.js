// Declared variables
var highScore = document.querySelector("#leaderboard");
var Back = document.querySelector("#Back");
var clear = document.querySelector("#clear");

// Event listener to clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retreives local stroage 
var totalScores = localStorage.getItem("allScores");
totalScores = JSON.parse(totalScores);

if (totalScores !== null) {

    for (var i = 0; i < totalScores.length; i++) {

        var oldHighscores = document.createElement("li");
        oldHighscores.textContent = totalScores[i].Name + " " + totalScores[i].score;
        highScore.appendChild(oldHighscores);

    }
}
// Event listener to move to index page
Back.addEventListener("click", function () {
    window.location.replace("./index.html");
});