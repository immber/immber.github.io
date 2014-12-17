 // U3.W7: Design your own Code Combat Mission

// This is a solo challenge

// Your mission description:
// Overall mission: Help Seven find his ball
// Goals: help 7 find his ball
// Characters: My dog Seven
// Objects: Seven, Ball
// Functions: Move Seven, Find Ball, Play with ball. Had the idea later to add an evil gopher, included it in the first part of the javascript, but took the gopher out in the html/css/js version.
//

// Pseudocode
// Seven = object with properties - location, has ball (boolean),
// Ball = object wiht properites - location
// Gopher = object with properties - location, move ball
//
//Function = move Seven
//Function = Find ball
//Function = when has ball = true, play with ball
//Function = gopher pops up in Seven's way moves the ball to make it harder???

// Initial Code
//    This is my solution that works in node, modifed for web under refactored version

// var Seven = {
//   name: "Seven",
//   location: 0,
//   has_ball: false,
// }

// var Ball = {
//   name: "the ball",
//   location: 3,
// }

// var Gopher = {
//   name: "Evil Gopher",
//   visible: false,
// }

// function move_seven(move_space) {
//   var start = Seven.location;
//   Seven.location = start + move_space;
// }

// function find_ball() {
//   Seven.has_ball = true;
//   console.log("Good Boy Seven, you found your ball!")
// }

// function play_with_ball() {
//   if (Seven.has_ball == true)
//     console.log("Seven loves playing with his ball!");
//   else
//     console.log("Seven can't play with his ball until he finds it!")

// }

// function evil_gopher(move_ball_by) {
//   Gopher.visible = true
//   Ball.location = Ball.location + move_ball_by
//   console.log("<<<Maniacal  Laughter>>> You will never find the ball Seven!")
// }


// //--------------------------------Test Code for running in node
// console.log(Seven.name)
// move_seven(1)
// move_seven(1)
// move_seven(1)

// evil_gopher(5)

// move_seven(5)


// if (Seven.location == Ball.location)
//   find_ball();

// play_with_ball()
//  //___________________________________________________________________


// Refactored Code- updated for running in browser - took out gopher for now

var sevenImg = document.getElementById("seven");
// var gopherImg = document.getElementById("gopher");
var ballImg = document.getElementById("ball");

// gopherImg.style.visible = "hidden";

var Seven = {
  name: "Seven",
  location: sevenImg.style.margin,
  has_ball: false,
}

var Ball = {
  name: "the ball",
}

// var Gopher = {
//   name: "Evil Gopher",
//   visible: gopherImg.style.visible,
// }

//this is his starting position
var Sevens_position = 0

//called when you click on sevenImg
function move_seven() {

  // added random movement to make it slightly more interesting
  Sevens_position = Sevens_position + Math.floor((Math.random() * 100) + 10);
  sevenImg.style.margin = Sevens_position + "px";
  if (Sevens_position > 400)
      alert("Stay in the yard Seven!!");
    if (Sevens_position > 300 )
      find_ball();


};

function find_ball() {
  Seven.has_ball = true;
  alert("Good Boy Seven, you found your ball!")
}

//called by click on ballImg
function play_with_ball() {
  if (Seven.has_ball == true)
    alert("Seven loves playing with his ball!");
  else
    alert("Seven can't play with his ball until he finds it!")

}

// function evil_gopher(move_ball_by) {
//   Gopher.visible = true
//   Ball.location = Ball.location + move_ball_by
//   alert("<<<Maniacal  Laughter>>> You will never find the ball Seven!")
// }



// Reflection
// OK this challenge was waaaayyy too much fun, and I'm super proud of my result!! This is rad!!!
// I was totally nervous going into javascript this week, and now I'm not anymore. When I first read through
// the challenge, I was like "okay, yeah right". I didn't think that I could pull it off, or that I could build
//what I did in just a few hours, but I knew I wanted to try the optional release of making it into a webpage.
// I actually started with the html and css first. I had to picture the game from
//the interface before I could start writing my objects and functions. I've always developed software by
//designing the interface first, so that seemed natural. Once I had the basic outline of page, then I could
//organize the functions and objects. Then I did all of the javascript and checked it was running in node
// before trying to link anything to the html. I wasn't sure if I'd be able to access the events and make it
//actually work. I used the source code for the Orpheus example, and w3schools documentation extensivly to get
//all of this working. I was struggling with the CSS positioning, so that's why I took out the gopher. Maybe
//if I have sometime in the future I'll go back through and add him back in. This challenge was just all fun,
//nothing was tedious, and I feel like I learned a lot about practical applications of javascript.