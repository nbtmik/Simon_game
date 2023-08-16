var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level = 0;
var started = false;

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);
}

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber=Math.random();
    randomNumber=randomNumber*4;
    randomNumber=Math.floor(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    // console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
