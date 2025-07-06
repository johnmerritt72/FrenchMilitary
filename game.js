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
var draggedPiece = null;
var dragStartNode = 0;
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
}

function updateMove(fromNode, toNode) {
	if (moveIsValid(fromNode, toNode)) {
		// Execute the move
		executeMoveUpdate(fromNode, toNode);
		
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
				}
			}
		}
	} else {
		// Invalid move - reset piece position
		clearboard();
		drawBoard(180,60,100);
		$('canvas').drawText({
			fillStyle: '#fff', strokeWidth: 2, 	x: 380, y: 400, fontSize: '18pt', fontFamily: 'Verdana, sans-serif', align: 'left', 
			layer: true, name: 'moveStr',
			text: 'Invalid move! Try again.',  
		});
	}
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
	if (from > 11 || to > 11 || from < 1 || to < 1)
		return false;
	
	// Check if the 'from' position has a white piece
	for(var i=1;i<=3;i++) {
		if (w[i]==from) {
			isValidStart = true;
			j2 = i;
			break;
		}
	}
	
	if (!isValidStart)
		return false;
		
	// Check if target position is occupied
	if (to == b || to == w[1] || to == w[2] || to == w[3]) 
		return false;
		
	// Check if move is valid according to game rules
	if (validMoves[from][to] != 2)
		return false;
		
	return true;
}

function executeMoveUpdate(from, to) {
	// Find which white piece is moving and update its position
	for(var i=1;i<=3;i++) {
		if (w[i]==from) {
			w[i] = to;
			break;
		}
	}
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
	
	// Draw numbered positions
	for(var i=1;i<12;i++) {
		drawPosNum(i, x, y, scale);
	}
	
	// Draw game pieces
	drawGamePieces(x, y, scale);
	
	// Draw status text
	var lastMoveText = '';
	if (b > 0) {
		if (lastMove != null && lastMove > 0) {
			lastMoveText = '\nI move to ' + lastMove;
		}
		$('canvas').drawText({
			fillStyle: '#fff', strokeWidth: 2, 	x: 380, y: 340, fontSize: '13pt', fontFamily: 'Verdana, sans-serif', align: 'left', layer: true,
			text: 'White pieces are at  ' + w[1] + '   ' + w[2] + '   ' + w[3] + '\nThe black piece is at  ' + b + '\nDrag a white piece to move it.' + lastMoveText
		});
		
		// Add resign button
		$('canvas').drawText({
			fillStyle: '#ff4444', strokeWidth: 2, 	x: 120, y: 400, fontSize: '13pt', fontFamily: 'Verdana, sans-serif', layer: true,
			text: 'Resign', layer: true, 
			name: 'resignButton',
			mouseup: function(layer) {
				displayIWin();
				displayGameEndButtons();
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

function drawPosNum(pos, x, y, scale) {
	var backcolor = '#323ee0';
	var forecolor = '#fff';
	var size = 20;
	
	$('canvas').drawRect({
		fillStyle: backcolor, 
		x: x+posx[pos-1]*scale, 
		y: y+posy[pos-1]*scale, 
		width: size, 
		height: size, 
		layer: true,
		name: 'node_' + pos
	});
	$('canvas').drawText({
		fillStyle: forecolor, 
		strokeWidth: 2, 	
		x: x+posx[pos-1]*scale, 
		y: y+posy[pos-1]*scale, 
		fontSize: '13pt', 
		fontFamily: 'Verdana, sans-serif', 
		align: 'left',
		text: pos, 
		layer: true,
		name: 'nodeText_' + pos
	});
}

function drawGamePieces(x, y, scale) {
	// Draw black piece
	if (b > 0) {
		$('canvas').drawRect({
			fillStyle: '#000', 
			x: x+posx[b-1]*scale, 
			y: y+posy[b-1]*scale, 
			width: 40, 
			height: 40, 
			layer: true,
			name: 'blackPiece'
		});
		// Draw node number on top of black piece
		$('canvas').drawText({
			fillStyle: '#fff', 
			strokeWidth: 2, 	
			x: x+posx[b-1]*scale, 
			y: y+posy[b-1]*scale, 
			fontSize: '13pt', 
			fontFamily: 'Verdana, sans-serif', 
			align: 'left',
			text: b, 
			layer: true,
			name: 'blackPieceText'
		});
	}
	
	// Draw white pieces (draggable)
	for(var i=1; i<=3; i++) {
		if (w[i] > 0) {
			$('canvas').drawRect({
				fillStyle: '#fff', 
				x: x+posx[w[i]-1]*scale, 
				y: y+posy[w[i]-1]*scale, 
				width: 40, 
				height: 40, 
				layer: true,
				draggable: true,
				name: 'whitePiece_' + i,
				data: {
					pieceIndex: i,
					originalNode: w[i],
					boardX: x,
					boardY: y,
					scale: scale
				},
				dragstart: function(layer) {
					draggedPiece = layer;
					dragStartNode = layer.data.originalNode;
					$(this).css('cursor', 'grabbing');
					showValidMoves(dragStartNode, layer.data.boardX, layer.data.boardY, layer.data.scale);
				},
				drag: function(layer) {
					// Visual feedback during drag - valid moves are already shown
				},
				dragstop: function(layer) {
					// Hide valid move indicators
					hideValidMoves();
					
					var dropNode = getNodeAtPosition(layer.x, layer.y, layer.data.boardX, layer.data.boardY, layer.data.scale);
					
					if (dropNode > 0 && dropNode != dragStartNode) {
						// Attempt to make the move
						if (moveIsValid(dragStartNode, dropNode)) {
							updateMove(dragStartNode, dropNode);
						} else {
							// Invalid move - snap back to original position
							layer.x = layer.data.boardX + posx[dragStartNode-1] * layer.data.scale;
							layer.y = layer.data.boardY + posy[dragStartNode-1] * layer.data.scale;
							$('canvas').drawLayers();
							
							$('canvas').drawText({
								fillStyle: '#ff0000', 
								strokeWidth: 2, 	
								x: 380, 
								y: 420, 
								fontSize: '14pt', 
								fontFamily: 'Verdana, sans-serif', 
								align: 'left', 
								layer: true,
								name: 'errorMessage',
								text: 'Invalid move! White can only move up, down, or right.',
								click: function() {
									$('canvas').removeLayer('errorMessage');
									$('canvas').drawLayers();
								}
							});
						}
					} else {
						// No valid drop target - snap back
						layer.x = layer.data.boardX + posx[dragStartNode-1] * layer.data.scale;
						layer.y = layer.data.boardY + posy[dragStartNode-1] * layer.data.scale;
						$('canvas').drawLayers();
					}
					
					draggedPiece = null;
					dragStartNode = 0;
					$(this).css('cursor', 'grab');
				},
				mouseover: function() {
					$(this).css('cursor', 'grab');
				},
				mouseout: function() {
					$(this).css('cursor', 'default');
				}
			});
			
			// Draw node number on top of white piece
			$('canvas').drawText({
				fillStyle: '#000', 
				strokeWidth: 2, 	
				x: x+posx[w[i]-1]*scale, 
				y: y+posy[w[i]-1]*scale, 
				fontSize: '13pt', 
				fontFamily: 'Verdana, sans-serif', 
				align: 'left',
				text: w[i], 
				layer: true,
				name: 'whitePieceText_' + i
			});
		}
	}
}

function getNodeAtPosition(x, y, boardX, boardY, scale) {
	var threshold = 30; // Distance threshold for snapping to a node
	
	for(var i=1; i<=11; i++) {
		var nodeX = boardX + posx[i-1] * scale;
		var nodeY = boardY + posy[i-1] * scale;
		
		var distance = Math.sqrt(Math.pow(x - nodeX, 2) + Math.pow(y - nodeY, 2));
		
		if (distance < threshold) {
			return i;
		}
	}
	
	return 0; // No node found
}
	

function fnp(x) {
	return Math.pow(2,x-1);
}

function showValidMoves(fromNode, boardX, boardY, scale) {
	// Check each node to see if it's a valid move destination
	for(var i=1; i<=11; i++) {
		if (i != fromNode && isValidMoveDestination(fromNode, i)) {
			// Draw dotted white rectangle at this position
			$('canvas').drawRect({
				strokeStyle: '#fff',
				strokeWidth: 2,
				strokeDash: [5, 5], // Creates dotted line pattern
				x: boardX + posx[i-1] * scale,
				y: boardY + posy[i-1] * scale,
				width: 40,
				height: 40,
				layer: true,
				name: 'validMove_' + i
			});
		}
	}
	$('canvas').drawLayers();
}

function hideValidMoves() {
	// Remove all valid move indicators
	for(var i=1; i<=11; i++) {
		$('canvas').removeLayer('validMove_' + i);
	}
	$('canvas').drawLayers();
}

function isValidMoveDestination(fromNode, toNode) {
	// Check if this would be a valid move without modifying game state
	if (fromNode > 11 || toNode > 11 || fromNode < 1 || toNode < 1)
		return false;
	
	// Check if target position is occupied
	if (toNode == b || toNode == w[1] || toNode == w[2] || toNode == w[3]) 
		return false;
		
	// Check if move is valid according to game rules
	if (validMoves[fromNode][toNode] != 2)
		return false;
		
	return true;
}