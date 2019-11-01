// From scratch, build a timer-based quiz application that stores high scores client-side. Following the common templates for user stories, we can frame this challenge as follows:

// As a coding bootcamp student
// I want to take a timed quiz on JavaScript fundamentals that stores high scores
// so that I can gauge my progress compared to my peers
// How do you deliver this? Here are some guidelines:

// Play proceeds as follows:

// The user arrives at the landing page and is presented with a call-to-action to "Start Quiz." Also note the navigation option to "View Highscores" and the "Time" value set at 0.

// Clicking the "Start Quiz" button presents the user with a series of questions. The timer is initialized with a value and immediately begins countdown.

// Score is calculated by time remaining. Answering quickly and correctly results in a higher score. Answering incorrectly results in a time penalty (for example, 15 seconds are subtracted from time remaining).

// When time runs out and/or all questions are answered, the user is presented with their final score and asked to enter their initials. Their final score and initials are then stored in localStorage.

// Your application should also be responsive, ensuring that it adapts to multiple screen sizes.

// Refer to the animated GIF below for a demonstration of the application functionality.

var questions2 = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  }
];

var high_scores_El = document.getElementById("hi_scores");
var time_remaining_El = document.getElementById("time_remaining");
var content_box_El = document.getElementById("boundary_box");
//var start_button_El = document.getElementById("start_button");

var answer1_El = document.getElementById("answer1");

var score = 5;
var q = 0;
var running = false; //if the timer is running

time_remaining_El.textContent = "Time: " + score;



$("#start_button").on("click", function(){
  //I think the whole quiz can be in here.  This cycles through the question array,
  //then at the end shows the end screen and has the chance to restart
  startTimer();

  /////////////////////////////////////////////////////////////////////////////////////////////
  //here I will make one set of buttons manually.  Clear the intro text. and make one question
  if (false) {
    $("#boundary_box").empty();
    var new_header = $("<h1></h1>");
    new_header.text(questions2[0].title);

    new_header.addClass("question");
    console.log("new header is", new_header);
    $("#boundary_box").append(new_header);

    var new_button = $("<button>");
    new_button.addClass("btn btn-primary btn-sm button_show question_button");
    console.log(questions2);
    console.log(questions2[0].choices[0]);
    //start_button_El.textContent="xxxxxxx";  //works
    // new_button.textContent="hi";  //these are garbage
    //new_button.innerText="hi";
    //new_button.text="hi";   //these are garbage
    new_button.text(questions2[0].choices[0]);
    console.log(new_button);
    $("#boundary_box").append(new_button);
    ///////////////////end of manual question///////////////////////////
  }

  for (q = 0; q < questions2.length - 1; q++) {
    $("#boundary_box").empty();
    var new_header = $("<h1></h1>");
    new_header.text(questions2[q].title);
    new_header.addClass("question");
    console.log("new header is", new_header);
    $("#boundary_box").append(new_header);

    for (i = 0; i < 4; i++) {
      var new_button = $("<button>");
      $(new_button).addClass(
        "btn btn-primary btn-sm button_show question_button"
      );
      $(new_button).text(i + ": " + questions2[q].choices[i]);
      $(new_button).attr("choice", questions2[q].choices[i]);
      $(document).on( "click", ".question_button", check_answer );
      //new_button.onclick=check_answer;
      //console.log(new_button);
      $("#boundary_box").append(new_button);
    }
  }
}); //start button

high_scores_El.addEventListener("click", function() {
  $("#boundary_box").html("<h1> High Scores shown here</h1>");
});

// answer1_El.addEventListener("click",function(){
//     alert("hi, a dynamically added thing was clicked");
// });

function startTimer() {
  //setTime();
  running = true;
}

interval = setInterval(function() {
  if (running) {
    score--;
    renderTime();
    if (score == 0) {
      running = false;
      //this just handles running out of time.  the game can also end at the last question.
      //alert("hout of time");
      //go display the score page now
    }
  }
}, 1000);

function renderTime() {
  time_remaining_El.textContent = "Time: " + score;
}


function check_answer(){
  //$(".question_button").on("click",function(){
    
    alert("clicky"+$(this).attr("choice"));
   // fridgeMagnet.text($(this).attr("data-letter"));
  
  };
