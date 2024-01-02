// Keep previous scores in order by updated from localStorage

function highscorePrint() {
    var highscore = JSON.parse(window.localStorage.getItem("highscores")) || [];
    highscore.sort(function(x, y) {
      return x.score - y.score;
    });
    highscore.forEach(function(score) {
      var li = document.createElement("li");
      li.textContent = `${score.name} - ${score.score}`;
      var el = document.getElementById("highscores");
      el.appendChild(li);
    });
}

// Clear previous scores
  function clearScores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  } 
  
document.getElementById("clear").onclick = clearScores;
  
highscorePrint();