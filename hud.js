function Hud() {
	var size = width/53.3;
	var padding = width/106.6;
	var lifeWidth = width/53.3;

	var digitMaps = [
		[true,  true,  true,  false, true,  true,  true ], //0
		[false, false, true,  false, false, true,  false], //1
		[true,  false, true,  true,  true,  false, true ], //2
		[true,  false, true,  true,  false, true,  true ], //3
		[false, true,  true,  true,  false, true,  false], //4
		[true,  true,  false, true,  false, true,  true ], //5
		[true,  true,  false, true,  true,  true,  true ], //6
		[true,  false, true,  false, false, true,  false], //7
		[true,  true,  true,  true,  true,  true,  true ], //8
		[true,  true,  true,  true,  false, true,  true ]  //9
	];

	this.render = function() {
		var scoreString = "" + score;
		var x = (width - (scoreString.length * (size + padding))) / 2;
		var digitPos = createVector(x, padding);
		for(var i = 0; i < scoreString.length; i++) {
			var dmap = digitMaps[scoreString.charAt(i)];
			drawDigit(dmap, i, digitPos);
			digitPos.x += size + padding;
		}
		drawLives();
		if (lives <= 0) {
			push();
			textSize(width/33.3125);
			fill(255);
			text("GAME OVER", (width/2)-width/10.66, (height/2)-width/21.32);
			textSize(width/48.454);
			text("Shoot to play again", width/2.468, width/2.132);
			noFill();
			buttons = [];
			buttons[0] = new Button(width/2.6, width/2.28, width/4.634, width/21.32, 4);
			buttons[0].update();
			buttons[0].render();
		}
	}

	function drawLives() {
		push();
		fill(0);
		translate(-(width/118.44), 0);
		var top = createVector((width / 2) + lifeWidth * 2, padding * 2 + size * 2);
		for (var i = 0; i < lives; i++) {
			triangle(top.x, top.y, top.x - lifeWidth / 2, top.y + 25, top.x + lifeWidth / 2, top.y + 25);
			top.x -= 20 + padding;
		}
		pop();
	}

	function drawDigit(digitMap, index, pos) {
		push();
		translate(width/213.2, 0);
		for(var i = 0; i < digitMap.length; i++) {
			if(digitMap[i] === true)
				drawLine(i, pos);
			}
		pop();
	}

	function drawLine(lineMap, pos) {
		switch(lineMap) {
			case 0:
				line(pos.x, pos.y, pos.x + size, pos.y);
				break;
			case 1:
				line(pos.x, pos.y, pos.x, pos.y + size);
				break;
			case 2:
				line(pos.x + size, pos.y, pos.x + size, pos.y + size);
				break;
			case 3:
				line(pos.x, pos.y + size, pos.x + size, pos.y + size);
				break;
			case 4:
				line(pos.x, pos.y + size, pos.x, pos.y + 2 * size);
				break;
			case 5:
				line(pos.x + size, pos.y + size, pos.x + size, pos.y + 2 * size);
				break;
			case 6:
				line(pos.x, pos.y + size * 2, pos.x + size, pos.y + 2 * size);
				break;
			default:
				break;
		}
	}
}