var timer;

//IMPORTANT GAME VARIABLES IN STATS OBJECT
var stats = {
    responseCounter: 0,
    promptArray: [],
    answerArray: [],
    responseArray: [],
    level: 0,
    seconds: 45,
    highScore: 0,
    lastScore: 0    
};

//RANDOM COLOR GENERATOR
var randomColor = function() {
    var curr = Math.floor(Math.random() * 6) + 1;
    switch (curr) {
        case 1:
            return "red";
            break;
        case 2:
            return "orange";
            break;
        case 3:
            return "yellow";
            break;
        case 4:
            return "green";
            break;
        case 5:
            return "blue";
            break;
        case 6:
            return "purple";
            break;
    }  
};
//

//MAIN GAME MECHANICS
var twoColorCombo = function(color1, color2) {
    if (color1 === color2) {
        return color1;
    }
  
    else if (color1 === "red" && color2 === "yellow" || color1 === "yellow" && color2 === "red") {
        return "orange";
    }
    else if (color1 === "blue" && color2 === "yellow" || color1 === "yellow" && color2 === "blue") {
        return "green";
    }
    else if (color1 === "red" && color2 === "blue" || color1 === "blue" && color2 === "red") {
        return "purple";
    }
    else if (color1 === "red" && color2 === "orange" || color1 === "orange" && color2 === "red") {
        return "yellow";
    }
    else if (color1 === "red" && color2 === "purple" || color1 === "purple" && color2 === "red") {
        return "blue";
    }
    else if (color1 === "blue" && color2 === "purple" || color1 === "purple" && color2 === "blue") {
        return "red";
    }
    else if (color1 === "green" && color2 === "blue" || color1 === "blue" && color2 === "green") {
        return "yellow";
    }
    else if (color1 === "yellow" && color2 === "orange" || color1 === "orange" && color2 === "yellow") {
        return "red";
    }
    else if (color1 === "yellow" && color2 === "green" || color1 === "green" && color2 === "yellow") {
        return "blue";
    }
    //both non-primary colors
    else if (color1 === "green" && color2 === "purple" || color1 === "purple" && color2 === "green") {
        return "blue";
    }
    else if (color1 === "purple" && color2 === "orange" || color1 === "orange" && color2 === "purple") {
        return "red";
    }
    else if (color1 === "green" && color2 === "orange" || color1 === "orange" && color2 === "green") {
        return "yellow";
    }
    else  /* ANY OF THESE, NO RESPONSE NEEDED (color1 === "green" && color2 === "red" || color1 === "red" && color2 === "green" || color1 === "blue" && color2 === "orange" || color1 === "orange" && color2 === "blue" || color1 === "purple" && color2 === "yellow" || color1 === "yellow" && color2 === "purple")*/ {
        return null;
    }  
}
//

//CREATES AND DISPLAYS THE PROMPT
var promptCreator = function(){
    var numOfSquares;
    if (stats.level < 40) {
        numOfSquares = 3;
    }
    else if (stats.level < 90) {
        numOfSquares = 4;
    }
    else if (stats.level < 120) {
        numOfSquares = 5;
    }
    else if (stats.level < 150) {
        numOfSquares = 6;
    }
    else {
        numOfSquares = 7;
    }
    for (var i = 1; i < numOfSquares; i++) {
    var curr = randomColor();
    $("#square"+i).css({display: "inline-block", backgroundColor: curr});
    stats.promptArray.push(curr); 
    }
};
//

//CREATES AN ARRAY WITH THE CORRECT ANSWER FOR GIVEN PROMPT
var getAnswer = function(array){
    if (array.length === 1) {
        stats.answerArray.push(array[0]);
    }
    else {
        for (var i = 0; i < array.length-1; i++) {
            var curr = twoColorCombo(array[i], array[i+1]);
            if (curr !== null) {
            stats.answerArray.push(curr);
            }
        }
    }
};
//

//TIMER RESET
var resetTimer = function(){
    //window.clearInterval(timer);
    $("#seconds").text("45");
    stats.seconds = 45;
}
//

var updateScore = function() {
    $("#score").text(stats.level);
}

var resetBorder = function(){
    $("#responseBox").css("border", "2px solid #333");
}

var onCorrectAnswer = function(){
    $(".response, .square").fadeOut("fast");
    $("#responseBox").css("border", "2px solid #2DFC3B");
    setTimeout(resetBorder, 300);
    setTimeout(promptCreator, 500);
    stats.responseCounter = 0;
    stats.promptArray = [];
    stats.responseArray = [];
    stats.answerArray = [];
    stats.level += 10;
    setTimeout(updateScore, 400);
    stats.seconds += 3;
    $("#seconds").text(stats.seconds);
}

var onWrongAnswer = function(){
    $(".response").css("display", "none");
    $("#responseBox").css("border", "2px solid red");
    setTimeout(resetBorder, 500);
    stats.responseCounter = 0;
    stats.promptArray = [];
    stats.responseArray = [];
    stats.answerArray - [];
    if (stats.seconds >= 5) {
    stats.seconds -= 5;
    }
    else if (stats.seconds >= 2) {
        stats.seconds -= 2;
    }
    $("#seconds").text(stats.seconds);
}

var onGameStart = function(){
    $(".response").css("display", "none");
    stats.level = 0;
    stats.responseCounter = 0;
    stats.promptArray = [];
    stats.responseArray = [];
    stats.answerArray = [];
    updateScore();
    
}

//COMPARES PLAYER'S ANSWER WITH CORRECT ANSWER
var checkAnswer = function() {
    if (stats.answerArray.length === 0 && stats.responseArray.length === 0) {
        onCorrectAnswer();
        return true; 
    }
    else {
    for (var i = 0; i <= stats.responseArray.length; i++) {
        if (stats.answerArray.length !== stats.responseArray.length || stats.answerArray[i] !== stats.responseArray[i]){
            onWrongAnswer();
            return false;
        }
    }
    onCorrectAnswer();
    return true;
    }
}
//

//TIMER
var countDown = function() {
    if (stats.seconds >= 1) {
    stats.seconds -= 1;
    $("#seconds").text(stats.seconds);
    }
    else {
        $("#currScore").text(stats.level);
        if (stats.level > stats.highScore) {
            stats.highScore = stats.level;
            $("#bestScore").text(stats.highScore);
        }
        $("#lastScore").text(stats.lastScore);
        $("#seconds").text("0");
        window.clearInterval(timer);
        $("#gameState").css("display", "none");
        $("#scoreState").fadeIn("slow");
    }
}
//

var buttonFunction = function() {
    stats.responseCounter += 1;
    var curr = $(this).attr("id");
    $("#response"+stats.responseCounter).css({display: "inline-block", backgroundColor: curr});
    stats.responseArray.push(curr);
};

var submitFunction = function() {
    getAnswer(stats.promptArray);
    checkAnswer();
};

var startFunction = function() {
    onGameStart();
    timer = setInterval(countDown, 1000);
    promptCreator();
    $(".button").on("click", buttonFunction);
    $("#submit").on("click", submitFunction);
}

//For switching player from main menu to game screen
var stateSwitch = function(){
    $("#menuState").css("display", "none");
    $("#gameState").css("display", "block");
};

//For switching player from score screen to main menu
var scoreStateSwitch = function(){
     $("#scoreState").css("display", "none");
     $("#menuState").css("display", "block"); 
};

//The press here to play button from main menu screen, takes player to game screen
$(".startButton").click(function(){
    $("#menuState").fadeOut(1000);
    $("#byLine").fadeOut(1000);
    setTimeout(stateSwitch, 1000);
    $(".button").off("click");
    $("#submit").off("click");
});

//This refers to the button on game board that starts the round
$("#start").click(function(){
   startFunction();
});

//This is for the colored circle buttons from which the player creates their response
$(".button").click(function(){
   buttonFunction(); 
});

//Clears player's choices and lets them choose new colors
$("#clear").click(function(){
   $(".response").css("display", "none");
    stats.responseCounter = 0;
    stats.responseArray = [];
});

//Submits player's response
$("#submit").click(function(){
    submitFunction();
});

//Takes player back to the main menu from the score screen
$("#backToMenu").click(function(){
    $("#scoreState").css("display", "none");
    $("#menuState, #title, .startButton, #menuSquares, #Msquare1, #Msquare2, #Msquare3, #Msquare4, #Msquare5, #Msquare6, #rulesButton1, #subtitle, #byLine").fadeIn("slow");
    stats.lastScore = stats.level;
    resetTimer();
    onGameStart();
    for (var i = 1; i < 7; i++) {
     $("#square"+i).css("display", "none");
    }
});

//Lets player start game over from score screen
$("#playAgain").click(function(){
    stats.lastScore = stats.level;
    resetTimer();
    onGameStart();
    for (var i = 1; i < 7; i++) {
     $("#square"+i).css("display", "none");
    }
    $("#scoreState").css("display", "none");
    $("#gameState").css("display", "block");
    $(".button").off("click");
    $("#submit").off("click");
});

//This exits last page of rules screen and takes player back to the main menu
$("#startButton2").click(function(){
    $("#rulesStatePart2").css("display", "none");
    $("#menuState, #title, .startButton, #menuSquares, #Msquare1, #Msquare2, #Msquare3, #Msquare4, #Msquare5, #Msquare6, #rulesButton1, #subtitle, #byLine").fadeIn("slow");
});

//These allow player to go through the three rules pages
$("#rulesPart2Button").click(function(){
    $("#rulesPrimerState").css("display", "none");
    $("#rulesStatePart1").fadeIn("fast");
    $('html, body').animate({scrollTop : 0},1000);
});

$("#rulesPart3Button").click(function(){
    //$("#rulesStatePart1").fadeOut("slow");
    $("#rulesStatePart1").css("display", "none");
    $("#rulesStatePart2").fadeIn("fast");
    $('html, body').animate({scrollTop : 0},1000);
});

$("#rulesButton1").click(function(){
    $("#menuState").css("display", "none");
    $("#byLine").css("display", "none");
    $("#rulesPrimerState").fadeIn("fast");
});

//Back buttons allow player to toggle back and forth through the rules pages
$("#backButton").click(function(){
    $("#rulesStatePart1").css("display", "none");
    $("#rulesPrimerState").fadeIn("fast");
    $('html, body').animate({scrollTop : 0},100);
});

$("#backButton2").click(function(){
    $("#rulesStatePart2").css("display", "none");
    $("#rulesStatePart1").fadeIn("fast");
    $('html, body').animate({scrollTop : 0},100);
});


