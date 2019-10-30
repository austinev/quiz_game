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

var high_scores_El=document.getElementById("hi_scores");
var time_remaining_El=document.getElementById("time_remaining");
var content_box_El=document.getElementById("boundary_box");
var start_button_El=document.getElementById("start_button");

var answer1_El=document.getElementById("answer1");


var score=75;
var question_index=0;
var running=false;              //if the timer is running

time_remaining_El.textContent="Time: "+score;

start_button_El.addEventListener("click",function(){
    //I think the whole quiz can be in here.  This cycles through the question array, 
    //then at the end shows the end screen and has the chance to restart
    startTimer();
    for ( question_index=0; question_index<questions2.length-1; question_index++){
        $("#boundary_box").html("<h1> "+ questions2[question_index].title+"</h1>");
        $("#boundary_box").append("<p> hi</p>");
        console.log(questions2[question_index]);
        for (var i=0; i<questions2[question_index].choices.length-1;i++){
            console.log(questions2[question_index].choices[i]);
            $("#boundary_box").append("<p id=\"answer1\"> "+ questions2[question_index].choices[i]+"</p>");

        }
        


    }
   
});

high_scores_El.addEventListener("click",function(){
    $("#boundary_box").html("<h1> High Scores shown here</h1>");
});

answer1_El.addEventListener("click",function(){
    alert("hi, a dynamically added thing was clicked");
});

function startTimer() {
    //setTime();
  
    interval = setInterval(function() {
      score--;
      renderTime();
    }, 1000);
  }

  function renderTime() {
    time_remaining_El.textContent="Time: "+score;

  }

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
    
    ///etc.
  ];

  



