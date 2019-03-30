var ship, hud, newTime, countdownStart;
var asteroids = [];
var lasers = [];
var score = gameMode = scoreLiveCount = level = livesAdded = 0;
var lives = 3;
var menuActive = true;

function setup() {
	var w = innerWidth*0.8;
	var h = w*0.5625;
	createCanvas(w, h);
	ship = new Ship();
	noFill();
	stroke(255);
}

function draw() {
	background(0);
		for (var i = 0; i < asteroids.length; i++) {
			if (ship.hits(asteroids[i])) {
				resetGame();
			}
			asteroids[i].update();
			asteroids[i].edges();
			asteroids[i].render();
		}

		for (var i = lasers.length-1; i >= 0; i--) {
			lasers[i].update();
			lasers[i].render();
			if (lasers[i].offScreen()) {
				lasers.splice(i, 1);
			} else {
				for (var j = asteroids.length-1; j >= 0; j--) {
					if (lasers[i].hits(asteroids[j])) {
						if (asteroids[j].r > 15) {
							var newAsteroids = asteroids[j].breakup();
							asteroids = asteroids.concat(newAsteroids);
						}
						if (gameMode == 1) {
							score += floor(100/(asteroids[j].r*1.5));
						} else if (gameMode == 2) {
							score += floor(100/(asteroids[j].r*1.0));
						} else if (gameMode == 3) {
							score += floor(100/(asteroids[j].r*0.5));
						}
						if (scoreLiveCount >= 1000) {
							lives++;
							livesAdded++;
							scoreLiveCount -= 1000;
						} else {
							scoreLiveCount = score-(livesAdded*1000);
						}
						asteroids.splice(j, 1);
						lasers.splice(i, 1);
						break;
					}
				}
			}
		}

		if (ship.isDestroyed == true) {
			newTime = new Date;
			newTime = newTime.getTime();
			if (newTime - countdownStart >= 3000) {
				ship.explosionRadius = width/10.66;
				ship.explosionSpeed = 1;
				ship.pos.x = width/2;
				ship.pos.y = height/2;
				ship.heading = PI*1.5;
				ship.isDestroyed = false;
				if (gameMode == 1) {
					ship.shieldLength = 300;
				} else if (gameMode == 2) {
					ship.shieldLength = 180;
				} else if (gameMode == 3) {
					ship.shieldLength = 60;
				}		
			}
		}

		if (asteroids.length <= 0  && menuActive == false) {
			if (gameMode == 1) {
				ship.shieldLength = 300;
				for (var i = 0; i < 6+level; i++) {
					asteroids.push(new Asteroid());
				}
			} else if (gameMode == 2) {
				ship.shieldLength = 180;
				for (var i = 0; i < 10+level; i++) {
					asteroids.push(new Asteroid());
				}
			} else if (gameMode == 3) {
				ship.shieldLength = 60;
				for (var i = 0; i < 14+level; i++) {
					asteroids.push(new Asteroid());
				}
			}
			level++;
		}

		if (lives <= 0) {
			asteroids = [];
		}

		if (menuActive == false) {
			hud.render();
		} else {
			showMenu();
		}

		checkShipMove();
		ship.update();
		ship.edges();
		ship.turn();
		ship.render();
}

function checkShipMove() {
	if (ship.isDestroyed == false) {
		if (keyIsDown(RIGHT_ARROW)) {
			ship.setRotation(0.1);
		} else if (keyIsDown(LEFT_ARROW)) {
			ship.setRotation(-0.1);
		} else {
			ship.setRotation(0);
		} if (keyIsDown(UP_ARROW)) {
			ship.boosting(true);
		} else {
			ship.boosting(false)
		}
	}
}

function resetGame() {
	ship.isDestroyed = true;
	countdownStart = new Date;
	countdownStart = countdownStart.getTime();
	lives--;
}

function keyPressed() {
	if (keyCode == 32 && ship.isDestroyed == false) {
		lasers.push(new Laser(ship.pos, ship.heading));	
	}
}

function windowResized() {
	var w = innerWidth*0.8;
	var h = w*0.5625;
	resizeCanvas(w, h);
	ship.r = width/53.3;
}