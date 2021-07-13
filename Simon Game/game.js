var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern=[];
var gamePattern=[];
var count=0;
var started=false;
var level=0;

function nextSequence(){
    userClickedPattern = [];
    level++;
    var randomNumber=Math.floor(Math.random()*4);
    // console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(randomChosenColour);
    $("#level-title").text("level "+count);
    count+=1;

}


$(".btn").click(function() {



    //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    $("#" + userChosenColour).fadeOut(40).fadeIn(40);
    animatePress(userChosenColour);

  
    //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

    
  
    //console.log(userClickedPattern);
  
  });

function playSound(name){
    var audio = new Audio("sounds/" +name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {

    //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    $("#" + currentColor).addClass("pressed");
  
    //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 50);
  }


$("body").keydown(function(){
  if(!started){
    nextSequence();
    started=true;
  }
})


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}



function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  count=0;

}
