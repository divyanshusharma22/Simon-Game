var userClickedPattern=[];

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var started=false;

var level=0;

$(document).keydown(function(event){
  if(!started){
  $("h1").text("Level "+ level);
  nextSequence();
  started=true;
}
});


function nextSequence() {

  userClickedPattern=[];

  level++;

  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
 playSound(randomChosenColour);

}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length -1 );
});

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){

   $("#"+currentColour).addClass("pressed");

   setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel){
  var x=userClickedPattern[currentLevel];
  var y=gamePattern[currentLevel];
  if(x===y){
       console.log("Success");
       if(userClickedPattern.length==gamePattern.length){
        setTimeout(function(){
          nextSequence();
        },1000);

       }
  }
  else{
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();

  }

}

function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}















