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



var high_scores_El = document.getElementById("hi_scores");
var time_remaining_El = document.getElementById("time_remaining");
var content_box_El = document.getElementById("boundary_box");
var answer1_El = document.getElementById("answer1");

const game_length = 75;

var score = game_length;
var q = 0;
var running = false; //if the timer is running decrement the score.
var showing_result = 0;
time_remaining_El.textContent = "Time: " + score;

initialize_game(); //draw the start page

function start_game() {
  running = true;
  do_a_question();
}

function do_a_question() {
  $("#boundary_box").empty();
  var new_header = $("<h1></h1>");
  new_header.text(questions[q].title);
  new_header.addClass("question");

  $("#boundary_box").append(new_header);

  for (i = 0; i < 4; i++) {
    var new_button = $("<button>");
    $(new_button).addClass(
      "btn btn-primary btn-sm button_show question_button"
    );
    $(new_button).text(i + ": " + questions[q].choices[i]);
    $(new_button).attr("choice", questions[q].choices[i]);
    $(new_button).on("click", check_answer);
    $("#boundary_box").append(new_button);
  }
} // do a question

high_scores_El.addEventListener("click", function() {
  draw_score_page();
});

interval = setInterval(function() {
  //this is the engine of the game.  the other functions set flags that affect this.
  if (running) {
    score--;
    renderTime();
    if (score == 0) {
      running = false;
      all_done();
    }
    if (showing_result > 0) {
      showing_result--;

      if (showing_result == 0) {
        //get rid of the result after 2 ticks
        $("#result_id").delete;
        $("#hr").delete;
        if (q == questions.length) {
          all_done();
        } else {
          do_a_question();
        }
      } //if showing result
    } //if running
  }
}, 1000);

function renderTime() {
  time_remaining_El.textContent = "Time: " + score;
}

function all_done() {
  running = false;
  $("#boundary_box").empty();

  var new_header = $("<h1></h1>");
  new_header.text("All Done!");

  $("#boundary_box").append(new_header);

  var my_string = "<p>Your final score is " + score + ".</p>";
  var new_p = $(my_string);
  console.log(my_string);
  $("#boundary_box").append(new_p);

  var new_form = $('<form class="form-inline initials_form"></form>');
  var new_div = $(
    '<div class="form-group mb-2"><label for="Initials_label" class="sr-only"></label><input type="text" readonly class="form-control-plaintext" id="Initials_label" value="Enter Initials"></div>'
  );
  $(new_form).append(new_div);
  new_div = $(
    '<div class="form-group mx-sm-3 mb-2"><label for="Input_initials" class="sr-only">Password</label><input type="text" class="form-control-sm" id="text_box" ></div>'
  );
  $(new_form).append(new_div);
  var new_button = $(
    '<button type="text" class="btn btn-primary mb-2 question_button submit_button">Submit</button>'
  );
  $(new_button).on("click", add_score_v2);
  $(new_form).append(new_button);
  $("#boundary_box").append(new_form);
}

function check_answer() {
  if (showing_result == 0) {
    //if the answer is being shown, freeze out clicks
    var new_string = $(this).attr("choice");
    $("#boundary_box").append("<hr>");
    if (questions[q].answer === new_string) {
      $("#boundary_box").append('<p class="result">Correct!</p>');
    } else {
      $("#boundary_box").append('<p class="result">Incorrect!</p>');
      score = score - 15;
    }
    q++;
    showing_result = 2; //show the result for 2 ticks
  } //if showing answer
} //check_answer

function add_score_v2() {
  //this one is goign to avoid the stringify thing and just do ordered pairs

  var my_thing = document.getElementById("text_box");
  console.log(my_thing.value); //I couldn't get the jquery one to work
  localStorage.setItem(my_thing.value, score);

  draw_score_page();
}

function draw_score_page() {
  //draw the scores, add a clear button and a new game button
  //first grab an array of the existing, old scores:
  var my_array_of_scores = [];
  for (var i = 0; i < localStorage.length; i++) {
    var temp_thing = localStorage.key(i);
    temp_thing = localStorage.getItem(localStorage.key(i));
    my_array_of_scores.push(localStorage.key(i)); //push appends to the array.
    my_array_of_scores.push(localStorage.getItem(localStorage.key(i)));
  }

  $("#boundary_box").empty();

  //build up the table.
  var my_table = $("<table></table>"); // table, then <tr> then <td>

  for (i = 0; i < my_array_of_scores.length; i = i + 2) {
    var my_row = $("<tr></tr>");
    var my_data = $('<td id="hi_scores_table"></td>');
    $(my_data).text(
      i / 2 +
        1 +
        ": " +
        my_array_of_scores[i] +
        "- " +
        my_array_of_scores[i + 1]
    );
    my_row.append(my_data);
    my_table.append(my_row);
  }
  //$(my_table).addId("hi_scores")
  $("#boundary_box").append(my_table); //table is built, just add it now

  new_thing = $(
    '<button type="button" id="score_button" class="btn btn-primary btn-sm">Go Back</button>'
  );
  new_thing.on("click", initialize_game);
  $("#boundary_box").append(new_thing);
  new_thing = $(
    '<button type="button" id="score_button" class="btn btn-primary btn-sm">Clear High Scores</button>'
  );
  new_thing.on("click", clear_high_scores);
  $("#boundary_box").append(new_thing);
}

function initialize_game() {
  //draw the instructions and the start button.  done at the very start and after entering initials.
  q = 0;
  score = game_length;
  $("#boundary_box").empty();
  renderTime();

  var new_thing = $("<h1>Coding Quiz Challenge</h1>");
  $("#boundary_box").append(new_thing);
  new_thing = $(
    "<p>Try to answer the following code-related questions within the time limit.  Keep in mind that incorrect answers will penalize your score Time by ten seconds!</p>"
  );
  $("#boundary_box").append(new_thing);
  new_thing = $(
    '<button type="button" id="start_button" class="btn btn-primary btn-sm">Start Quiz</button>'
  );
  new_thing.on("click", start_game);
  $("#boundary_box").append(new_thing);
}

function sort_array(my_array) {
  //take an array wich is a list of initials,score pairs and sort them from highest to lowest, return that sorted array.
  // var pair
  // for (var i=0;i<my_array.length-1;i=i+2){

  // }

  return my_array; //for now just return the unsorted list
}

function clear_high_scores() {
  localStorage.clear();
  draw_score_page();
}

//form prototype:
// <form class="form-inline">
//   <div class="form-group mb-2">
//     <label for="Initials_label" class="sr-only"></label>
//     <input type="text" readonly class="form-control-plaintext" id="Initials_label" value="Enter Initials">
//   </div>
//   <div class="form-group mx-sm-3 mb-2">
//     <label for="Input_initials" class="sr-only">Password</label>
//     <input type="text" class="form-control" id="Submit" >
//   </div>
//   <button type="submit" class="btn btn-primary mb-2">Submit</button>
// </form>
