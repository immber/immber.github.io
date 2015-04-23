$(document).ready(function() {
	
	currentGame = new Board();
	xMoves = [];
	oMoves = [];
	xWinner = false;
	oWinner = false;
	placeFirstX();
	bindEvents();

});

function bindEvents(){
	$(".corner, .edge, .center").on('click', function(event) {
		if (currentGame.legalMove(this.id)){
			currentGame.playerMove(this.id);
		} else {
			alert("You can't do that, that spot is already taken.")
		}
	});
}

function placeFirstX(){	
	var rand = Math.random() >= .5;
	if (rand == 0) {
		//use Center spot # 5
		currentGame.computerMove(5)
	} else {
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
	trackPlayerMoves(space);
	findPossibleMoves();
};

Board.prototype.computerMove = function(space) {
	this.gameBoard[space -1] = "x";
	$("#" + space).html("x");
	trackComputerMoves(space);
	this.keepPlaying()
};

function trackPlayerMoves(space) {
	var value = currentGame.magicSquare[space-1];
	oMoves.push(value);

}

function trackComputerMoves(space) {
	var value = currentGame.magicSquare[space-1];
	xMoves.push(value);
}


Board.prototype.keepPlaying = function(){
	//find all the groups of 3
	rowsColsDiags = []
	rowsColsDiags.push(this.gameBoard.slice(0, 3))
	rowsColsDiags.push(this.gameBoard.slice(3, 6))
	rowsColsDiags.push(this.gameBoard.slice(6, 9))

	for (i=0; i < 3; i++) {
		var columns = []
		columns.push(this.gameBoard[i])
		columns.push(this.gameBoard[i + 3])
		columns.push(this.gameBoard[i + 6])
		rowsColsDiags.push(columns)
	}
	 var leftToRight = []
	 leftToRight.push(this.gameBoard[0])
	 leftToRight.push(this.gameBoard[4])
	 leftToRight.push(this.gameBoard[8])

	 var rightToLeft = []
	 rightToLeft.push(this.gameBoard[2])
	 rightToLeft.push(this.gameBoard[4])
	 rightToLeft.push(this.gameBoard[6])

	 rowsColsDiags.push(leftToRight)
	 rowsColsDiags.push(rightToLeft)

	 //check each for a winner
	for (i=0; i < rowsColsDiags.length; i++) {
		checkForTicTacToe(rowsColsDiags[i])
	}

	if ((xWinner) && (oWinner)) {
		alert("Okay, so we tied. You still didn't beat me :) Refresh the page to play again.")
		return false
	} else if (xWinner) {
		alert("X wins again. It's okay, the game is rigged, you can't beat me. Refresh the page to play again.")
		return false
	} else if (oWinner) {
		alert("Something's wrong, 'cause this wasn't supposed to happen!")
		return false
	} else {
		return true
	}
}

function checkForTicTacToe(group) {
	if (group.join("") == "xxx") {
		xWinner = true
	}
	if (group.join("") == "ooo") {
		oWinner = true
	}
}

function pickNextLargestNum() {
	var oneToNine = [1,2,3,4,5,6,7,8,9]
	var taken = (xMoves.concat(oMoves)).join("")
	for (i = 0; i < taken.length; i++) {
		var index = oneToNine.indexOf(parseInt(taken[i]))
		oneToNine.splice(index, 1)
	}
	var nextMove = oneToNine.pop()
	var space = (currentGame.magicSquare.indexOf(nextMove) + 1)
	return space
}

function findPossibleMoves () {	
	if (xMoves.length == 1) {
		var space = pickNextLargestNum()
		currentGame.computerMove(space)
		
	} else if (xMoves.length >= 2) {
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

