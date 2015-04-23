$(document).ready(function() {
	
	currentGame = new Board();
	gameType = setGameType();
	xMoves = [];
	oMoves = [];
	placeFirstX();
	bindEvents();

});

function bindEvents(){
	$(".corner, .edge, .center").on('click', function(event) {
		if (currentGame.legalMove(this.id)){
			currentGame.playerMove(this.id);
		} else {
			alert("You can't do that, that spot is already taken")
		}
	});
}

function setGameType(){
	var rand = Math.random() >= .5;
	if (rand == 0) {
		gameType = "CENTER"
	}else {
		gameType = "CORNER"
	};
	return gameType
}

function placeFirstX(){	
	if (gameType == "CENTER") {
		currentGame.computerMove(5)
	} else if (gameType == "CORNER") {
		var corners = [1,3,7,9];
		var corner = corners[(Math.floor(Math.random() * 4))];
		currentGame.computerMove(corner);
	}
};



function Board(){
	this.gameBoard = ["-","-","-","-","-","-","-","-","-"];
	this.magicSquare = [2, 7, 6, 9, 5, 1, 4, 3, 8]
}

Board.prototype.legalMove = function(space) {
	return this.gameBoard[space-1] == "-";
}

Board.prototype.playerMove = function(space) {
	this.gameBoard[space -1] = "o";
	$("#" + space).html("o");
	updatePlayerMoves(space);
	findPossibleMoves();
};

Board.prototype.computerMove = function(space) {
	this.gameBoard[space -1] = "x";
	$("#" + space).html("x");
	updateComputerMoves(space);
	this.keepPlaying()
};

function updatePlayerMoves(space) {
	var value = currentGame.magicSquare[space-1];
	oMoves.push(value);
	// console.log("o moves " + oMoves.toString());

}

function updateComputerMoves(space) {
	var value = currentGame.magicSquare[space-1];
	xMoves.push(value);
	// console.log("x moves " + xMoves.toString());
}


Board.prototype.keepPlaying = function(){
	//check for tictactoe
	for (i=0; i < this.gameBoard.length; i++) {
		console.log('divided ' + (Math.floor(i / 3)))
		console.log('mod ' + (Math.floor(i % 3)))
	}

	// var row1 = this.gameBoard.slice(0, 3)
	// console.log(row1)
	// var row2 = this.gameBoard.slice(3, 6)
	// console.log(row2)
	// var row3 = this.gameBoard.slice(6, 9)
	// console.log(row3)

	// var xTotal = 0
	// var oTotal = 0
	// for (i = 0; i < this.gameBoard.length; i++) {
	// 	if (this.gameBoard[i] == "x") {
	// 		xTotal += (i + 1);
	// 	} else if (this.gameBoard[i] == "o") {
	// 		oTotal += (i + 1);
	// 	}
	// }
	// if ((xScore == 15) || (oScore == 15)) {
	// 	alert("There is a winner! Refresh the page to play again")
	// } else {
		return true
	// }
}

function pickNextLargestNum() {
	var oneToNine = [1,2,3,4,5,6,7,8,9]
	var taken = (xMoves.concat(oMoves)).join("")
	// console.log('taken are ' + taken)
	for (i = 0; i < taken.length; i++) {
		// console.log(taken[i])
		var index = oneToNine.indexOf(parseInt(taken[i]))
		oneToNine.splice(index, 1)
	}
	// console.log('heres whats left ' + oneToNine)
	var nextMove = oneToNine.pop()
	// console.log('next move should be magic ' + nextMove)
	var space = (currentGame.magicSquare.indexOf(nextMove) + 1)
	// console.log('thats in space ' + space)
	return space
}

function findPossibleMoves () {	
	// console.log(xMoves.length)
	if (xMoves.length == 1) {
		//find the next highest number in the magic square that is available and use that
		// console.log("first move")
		var space = pickNextLargestNum()
		currentGame.computerMove(space)
		//put the win spot into an array for later
		// var xScore = parseInt(xMoves[0]) + parseInt(xMoves[1])
		
	} else if (xMoves.length >= 2) {
		// console.log('second move')
		//find possible moves by blocking or winning
		//check for win option first, block if can't win
		var xScore = parseInt(xMoves[0]) + parseInt(xMoves[1])
		var winSpot = currentGame.magicSquare.indexOf(15-xScore) + 1
		if (currentGame.legalMove(winSpot)) {
			currentGame.computerMove(winSpot)
		} else {
			var oScore = parseInt(oMoves[0]) + parseInt(oMoves[1])
			var blockSpace = currentGame.magicSquare.indexOf(15 - oScore) + 1
			if (currentGame.legalMove(blockSpace)) {
				currentGame.computerMove(blockSpace)
			} else {
				var space = pickNextLargestNum();
				currentGame.computerMove(space);
			}
		}	
	} 
}

