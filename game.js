//var v = [6,1,6,11,1,6,11,1,6,11,6];
//var h = [3,11,11,11,19,19,19,27,27,27,35];
var posx = [0,1,1,1,2,2,2,3,3,3,4];
var posy = [1,0,1,2,0,1,2,0,1,2,1];
var s = new Array(165).fill(0);
var r = new Array(2).fill(0).map(() => new Array(30).fill(0));
var l = new Array(11,11);
var w = new Array(4);
//var a = new Array(165,11);
var a = new Array(165).fill(0).map(() => new Array(11).fill(0));
var b = 0;
var moveStr = '';
var listenForKey = false;
var numOfMoves = 0;
var s3=0;
var m4=0;
var w1=0;

validMoves = [
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,2,2,2,0,0,0,0,0,0,0],
	[0,1,0,2,0,2,2,0,0,0,0,0],
	[0,1,2,0,2,0,2,0,0,0,0,0],
	[0,1,0,2,0,0,2,2,0,0,0,0],
	[0,0,1,0,0,0,2,0,2,0,0,0],
	[0,0,1,1,1,2,0,2,2,2,2,0],
	[0,0,0,0,1,0,2,0,0,0,2,0],
	[0,0,0,0,0,1,1,0,0,2,0,2],
	[0,0,0,0,0,0,1,0,2,0,2,2],
	[0,0,0,0,0,0,1,1,0,2,0,2],
	[0,0,0,0,0,0,0,0,2,2,2,0]
];

var l1 = 0;
var m1 = 0;
var i1 = 0;
for(var i=1;i<=9;i++) {
	l1=fnp(i);//console.log('i=' + i + ', l1='+l1);
	for(var m=i+1;m<=10;m++) {
		m1=fnp(m);//console.log('m1='+m1);
		for(var rr=m+1;rr<=11;rr++) {
			s[i1]=l1+m1+(fnp(rr));
			//console.log(i1 + " " + s[i1]);
			i1++;
		}
	}
}


$(document).ready(function () {
	drawIntroScreen();
});

function clearboard() {
	//$('#gameboard').clearCanvas();
	$('canvas').removeLayers();
	$('canvas').drawLayers();
}


function drawIntroScreen() {
	clearboard();
	$('canvas').drawText({
		fillStyle: '#fff', strokeWidth: 2, 	x: 380, y: 100, fontSize: '32pt', fontFamily: 'Verdana, sans-serif',
		text: 'The French Military Game', layer: true
	  }).drawText({
		fillStyle: '#fff', strokeWidth: 2, 	x: 380, y: 140, fontSize: '18pt', fontFamily: 'Verdana, sans-serif',
		text: 'by Martin Gardner', layer: true
	  }).drawText({
		fillStyle: '#fff', strokeWidth: 2, 	x: 380, y: 180, fontSize: '18pt', fontFamily: 'Verdana, sans-serif',
		text: '<Revised by Alan Gardner for the C-64>', layer: true
	  }).drawText({
		fillStyle: '#fff', strokeWidth: 2, 	x: 550, y: 330, fontSize: '13pt', fontFamily: 'Verdana, sans-serif',
		text: 'Instructions', layer: true, 
		  mouseup: function(layer) {
			showInstructions1();
		  },
		  mouseover: function(layer) {
			$('canvas').css('cursor', 'pointer');
		  },
		  mouseout: function(layer) {
			$('canvas').css('cursor', 'default');
		  },
	  }).drawText({
		fillStyle: '#fff', strokeWidth: 2, 	x: 270, y: 330, fontSize: '13pt', fontFamily: 'Verdana, sans-serif',
		text: 'Start Game', layer: true, 
		  mouseup: function(layer) {
			startGame();
		  },
		  mouseover: function(layer) {
			$('canvas').css('cursor', 'pointer');
		  },
		  mouseout: function(layer) {
			$('canvas').css('cursor', 'default');
		  }
	  });
}

function showInstructions1() {
	clearboard();
	drawBoard(180,60,100);
	$('canvas').drawText({
		fillStyle: '#fff', strokeWidth: 2, 	x: 380, y: 340, fontSize: '13pt', fontFamily: 'Verdana, sans-serif', align: 'left', layer: true,
		text: ' The playing field for the French Military game is shown above. You will \n play white and will start with three men located at 1, 2, and 4. Black has \n only one man, which starts at 6. White has the first move and may move any one \n piece one space. White may only move up, down, or to the right. Black may move \n in any direction. No piece may move to a space occupied by another piece.'
	  });
	  $('canvas').drawText({
		fillStyle: '#fff', strokeWidth: 2, 	x: 620, y: 440, fontSize: '13pt', fontFamily: 'Verdana, sans-serif', layer: true,
		text: 'Next', layer: true, click: function(layer) {
			showInstructions2();
		  },
		  mouseover: function(layer) {
			$('canvas').css('cursor', 'pointer');
		  },
		  mouseout: function(layer) {
			$('canvas').css('cursor', 'default');
		  }
	  });
}

function showInstructions2() {
	clearboard();
	drawBoard(180,60,100);
	$('canvas').drawText({
		fillStyle: '#fff', strokeWidth: 2, 	x: 380, y: 340, fontSize: '13pt', fontFamily: 'Verdana, sans-serif', align: 'left', layer: true,
		text: ' White wins the game by pinning the black piece so that black has no move. \n This usually occurs with black trapped at 11, but if black plays poorly it may \n be pinned at 5 or 7. Black wins by reaching 1 or by evading being pinned \n for 20 moves. White can always win if he plays correctly and does not make any \n mistakes, but if you want to resign just type 0,0.'
	  });
	  $('canvas').drawText({
		fillStyle: '#fff', strokeWidth: 2, 	x: 620, y: 440, fontSize: '13pt', fontFamily: 'Verdana, sans-serif',
		text: 'Next', layer: true, click: function(layer) {
			showInstructions3();
		  },
		  mouseover: function(layer) {
			$('canvas').css('cursor', 'pointer');
		  },
		  mouseout: function(layer) {
			$('canvas').css('cursor', 'default');
		  }
	  });
}

function showInstructions3() {
	clearboard();
	drawBoard(180,60,100);
	$('canvas').drawText({
		fillStyle: '#fff', strokeWidth: 2, 	x: 380, y: 340, fontSize: '13pt', fontFamily: 'Verdana, sans-serif', align: 'left', layer: true,
		text: ' The game is very easy to win the first few times it is played, but it \n will learn from its mistakes and become	increasingly more difficult to beat. \n The program stores what it has learned in an array, therefore \n the game gets increasingly difficult as time goes on.'
	  });
	  $('canvas').drawText({
		fillStyle: '#fff', strokeWidth: 2, 	x: 620, y: 440, fontSize: '13pt', fontFamily: 'Verdana, sans-serif',
		text: 'Main Menu', layer: true, click: function(layer) {
			drawIntroScreen();
		  },
		  mouseover: function(layer) {
			$('canvas').css('cursor', 'pointer');
		  },
		  mouseout: function(layer) {
			$('canvas').css('cursor', 'default');
		  }
	  });
}

function startGame() {
	clearboard();
	b=6;
	w[1]=1;
	w[2]=2;
	w[3]=4;
	numOfMoves=1;
	s3 = CalcS3();

	drawBoard(180,60,100);
	moveStr = '';
	document.body.onkeydown = function(e){
		if (listenForKey) {
			if ((e.key >= '0' && e.key <= '9') || e.key == ',') {
				moveStr += e.key;
				drawMoveStr();
			}
			if (e.key == 'Backspace') {
				moveStr = moveStr.substring(0,moveStr.length-1);
				drawMoveStr();
			}
			if (e.key == 'Enter') {
				updateMove();
			}
		}
	};
	listenForKey = true;
}

function updateMove() {
	listenForKey = false;
	$('canvas').removeLayer('moveStr');
	$('canvas').drawLayers();
	const myArray = moveStr.split(",");
	if (moveStr == '0,0') {
		displayIWin();``
		displayGameEndButtons();
	} else {
		if (moveIsValid(myArray[0],myArray[1])) {
			clearboard();
			drawBoard(180,60,100);
			if (numOfMoves > 19) {
				$('canvas').drawText({
					fillStyle: '#fff', strokeWidth: 2, 	x: 380, y: 400, fontSize: '18pt', fontFamily: 'Verdana, sans-serif', align: 'left', 
					layer: true, name: 'moveStr',
					text: 'That\'s 20 moves, ace, and you haven\'t trapped me.',  
				});
				displayIWin();
				displayGameEndButtons();
			} else {
				s3 = CalcS3();
				m4 = CalculateNextMove();
				if (m4==0) {
					displayILost();
					displayGameEndButtons();
				} else {
					r[0][numOfMoves-1]=s3;
					r[1][numOfMoves-1]=m4;
					b=m4;
					clearboard();
					drawBoard(180,60,100,m4);
					numOfMoves++;
					if (b==1) {
						displayIWin();
						displayGameEndButtons();
					} else {
						listenForKey = true;
					}
				}
			}
		} else {
			$('canvas').drawText({
				fillStyle: '#fff', strokeWidth: 2, 	x: 380, y: 400, fontSize: '18pt', fontFamily: 'Verdana, sans-serif', align: 'left', 
				layer: true, name: 'moveStr',
				text: 'Foul !!!!! Click here to try again.',  
				mouseup: function(layer) {
					listenForKey = true;
					$('canvas').removeLayer('moveStr');
					$('canvas').drawLayers();
				},
				mouseover: function(layer) {
				  $('canvas').css('cursor', 'pointer');
				},
				mouseout: function(layer) {
				  $('canvas').css('cursor', 'default');
				}
			  });
		}
	}
	moveStr = '';
}

function displayIWin() {
	$('canvas').drawText({
		fillStyle: '#fff', strokeWidth: 2, 	x: 380, y: 400, fontSize: '18pt', fontFamily: 'Verdana, sans-serif', align: 'left', 
		layer: true, name: 'moveStr',
		text: 'I win......'
	});
	w1=1;
	ResetArrays();
}

function displayILost() {
	$('canvas').drawText({
		fillStyle: '#fff', strokeWidth: 2, 	x: 380, y: 400, fontSize: '18pt', fontFamily: 'Verdana, sans-serif', align: 'left', 
		layer: true, name: 'moveStr',
		text: 'I lost......'
	});
	w1=-1;
	ResetArrays();
}

function displayGameEndButtons() {
	$('canvas').drawText({
		fillStyle: '#fff', strokeWidth: 2, 	x: 620, y: 440, fontSize: '13pt', fontFamily: 'Verdana, sans-serif', layer: true,
		text: 'Play Again', layer: true, click: function(layer) {
			startGame();
		  },
		  mouseover: function(layer) {
			$('canvas').css('cursor', 'pointer');
		  },
		  mouseout: function(layer) {
			$('canvas').css('cursor', 'default');
		  }
	  }).drawText({
		fillStyle: '#fff', strokeWidth: 2, 	x: 120, y: 440, fontSize: '13pt', fontFamily: 'Verdana, sans-serif', layer: true,
		text: 'Main Menu', layer: true, click: function(layer) {
			drawIntroScreen();
		  },
		  mouseover: function(layer) {
			$('canvas').css('cursor', 'pointer');
		  },
		  mouseout: function(layer) {
			$('canvas').css('cursor', 'default');
		  }
	});
}

function CalcS3() {
	a3=fnp(w[1])+fnp(w[2])+fnp(w[3]);
	for(var i=1; i<=165; i++) {
		if(s[i] == a3) {
			console.log('S3='+i);

			return i;
		}
	}
	console.log('S3='+165);
	return 165;
}

function CalculateNextMove() {
	m4=0;
	var continuej = true;
	for(var i=1;i<=11;i++) {
		continuej = true;
		if (validMoves[b][i] == 0)
			continue;
		for(var j=1;j<=3;j++) {
			if(w[j]==i) {
				continuej = false;
				break;
			}
		}
		if (continuej) {
			if (m4 == 0) {
				m4 = i;
			} else {
				if (a[s3-1][m4-1] < a[s3-1][i-1]) {
					m4 = i;
				}
			}
		}
	}

	return m4;
}

function ResetArrays() {
	for(var i=1;i<=numOfMoves-1;i++) {
		s1=r[0][i-1]-1;
		m1=r[1][i-1]-1;
		a[s1][m1]=a[s1][m1]+w1;
	}
	return;
}

function moveIsValid(from, to) {
	var isValidStart = false;
	var j2 = 0;
	if (from > 11 || to > 11)
		return false;
	for(var i=1;i<=3;i++) {
		j2 = i;
		if (w[i]==from)
			break;
	}
	if(from == w[1] || from == w[2] || from == w[3])
		isValidStart = true;
	if (to == b || to == w[1] || to == w[2] || to == w[3]) 
		return false;
	if (validMoves[from][to] != 2)
		return false;
	w[j2] = to;
	return true;
}

function drawMoveStr() {
	$('canvas').removeLayer('moveStr');
	$('canvas').drawLayers();
	$('canvas').drawText({
		fillStyle: '#fff', strokeWidth: 2, 	x: 380, y: 400, fontSize: '18pt', fontFamily: 'Verdana, sans-serif', align: 'left', 
		layer: true, name: 'moveStr',
		text: moveStr
	  });
}


function drawBoard(x, y, scale, lastMove = '') {

	$('canvas').drawLine({strokeStyle: '#FFF', strokeWidth: 3, x1: x+0, y1: y+1*scale, x2: x+1*scale, y2: y+0, layer: true });
	$('canvas').drawLine({strokeStyle: '#FFF', strokeWidth: 3, x1: x+1*scale, y1: y+0, x2: x+2*scale, y2: y+0, layer: true });
	$('canvas').drawLine({strokeStyle: '#FFF', strokeWidth: 3, x1: x+2*scale, y1: y+0 , x2: x+3*scale, y2: y+0, layer: true });
	$('canvas').drawLine({strokeStyle: '#FFF', strokeWidth: 3, x1: x+3*scale, y1: y+0, x2: x+4*scale, y2: y+1*scale, layer: true });

	$('canvas').drawLine({strokeStyle: '#FFF', strokeWidth: 3, x1: x+0, y1: y+1*scale, x2: x+4*scale, y2: y+1*scale, layer: true });

	$('canvas').drawLine({strokeStyle: '#FFF', strokeWidth: 3, x1: x+0, y1: y+1*scale, x2: x+1*scale, y2: y+2*scale, layer: true });
	$('canvas').drawLine({strokeStyle: '#FFF', strokeWidth: 3, x1: x+1*scale, y1: y+2*scale, x2: x+2*scale, y2: y+2*scale, layer: true });
	$('canvas').drawLine({strokeStyle: '#FFF', strokeWidth: 3, x1: x+2*scale, y1: y+2*scale , x2: x+3*scale, y2: y+2*scale, layer: true });
	$('canvas').drawLine({strokeStyle: '#FFF', strokeWidth: 3, x1: x+3*scale, y1: y+2*scale, x2: x+4*scale, y2: y+1*scale, layer: true });

	$('canvas').drawLine({strokeStyle: '#FFF', strokeWidth: 3, x1: x+1*scale, y1: y+0, x2: x+3*scale, y2: y+2*scale, layer: true });
	$('canvas').drawLine({strokeStyle: '#FFF', strokeWidth: 3, x1: x+1*scale, y1: y+2*scale, x2: x+3*scale, y2: y+0, layer: true });

	$('canvas').drawLine({strokeStyle: '#FFF', strokeWidth: 3, x1: x+1*scale, y1: y+0, x2: x+1*scale, y2: y+2*scale, layer: true });
	$('canvas').drawLine({strokeStyle: '#FFF', strokeWidth: 3, x1: x+2*scale, y1: y+0, x2: x+2*scale, y2: y+2*scale, layer: true });
	$('canvas').drawLine({strokeStyle: '#FFF', strokeWidth: 3, x1: x+3*scale, y1: y+0, x2: x+3*scale, y2: y+2*scale, layer: true });
	
	var color = '';
	var lastMoveText = '';
	for(var i=1;i<12;i++) {
		color = '';
		if (i==b)
			color = '#000';
		if (i==w[1] || i==w[2] || i==w[3])
			color = '#fff';
		drawPosNum(i, x,y,scale, color);
	}
	if (b > 0) {
		if (lastMove != null && lastMove > 0) {
			lastMoveText = '\nI move to ' + lastMove;
		}
		$('canvas').drawText({
			fillStyle: '#fff', strokeWidth: 2, 	x: 380, y: 340, fontSize: '13pt', fontFamily: 'Verdana, sans-serif', align: 'left', layer: true,
			text: 'White pieces are at  ' + w[1] + '   ' + w[2] + '   ' + w[3] + '\nThe black piece is at  ' + b + '\nYour move, from-to X,Y ?' + lastMoveText
		  });
	}
}

function drawPosNum(pos, x, y, scale, color) {
	var backcolor = '#323ee0';
	var forecolor = '#fff';
	var size = 20;
	if (color != null && color != '') {
		backcolor = color;
		size = 40;
	}
	if (backcolor == '#fff')
		forecolor = '#000';
	$('canvas').drawRect({fillStyle: backcolor, x: x+posx[pos-1]*scale, y: y+posy[pos-1]*scale, width: size, height: size, layer: true });
	$('canvas').drawText({
		fillStyle: forecolor, strokeWidth: 2, 	x: x+posx[pos-1]*scale, y: y+posy[pos-1]*scale, fontSize: '13pt', fontFamily: 'Verdana, sans-serif', align: 'left',
		text: pos, layer: true
	  });
}
	

function fnp(x) {
	return Math.pow(2,x-1);
}