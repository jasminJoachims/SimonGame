
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var start = false;

var level = 0;

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);

  playSound(randomChosenColor);
};

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
};

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){$("#"+currentColor).removeClass("pressed")}, 200);
};

$(document).keypress(function() {
  if (start === false) {
  $("#level-title").text("Level " + level);
  nextSequence();
  start = true;
};
});

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

  }
}
  else {
    console.log("wrong");
    playSound("wrong");
    $("h1").text($("h1").text().replace("Level " + level, "Game Over, Press any Key to Restart"));
    $("body").addClass("game-over")
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
};

function startOver() {
  level = 0;
  start = false;
  gamePattern = [];
}
