var buttons = [];
window.onload = function() {
	buttons[0] = new Button(width/9.269, width/2.28, width/4.634, width/21.32, 1);
	buttons[1] = new Button(width/2.6,   width/2.28, width/4.264, width/21.32, 2);
	buttons[2] = new Button(width/1.491, width/2.28, width/4.634, width/21.32, 3);
}

function Button(x, y, w, h, mode) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.mode = mode;

	this.render = function() {
		rect(this.x, this.y, this.w, this.h);
	}

	this.update = function() {
		for (var i = lasers.length-1; i >= 0; i--) {
			if (lasers[i].pos.x > this.x && lasers[i].pos.x < this.x + this.w && lasers[i].pos.y > this.y && lasers[i].pos.y < this.y + this.h) {
				if (this.mode == 1) {
					gameMode = 1;
					ship.shieldLength = 300;
					for (var i = 0; i < 6+level; i++) {
						asteroids.push(new Asteroid());
					}
				} else if (this.mode == 2) {
					gameMode = 2;
					ship.shieldLength = 180;
					for (var i = 0; i < 10+level; i++) {
						asteroids.push(new Asteroid());
					}
				} else if (this.mode == 3) {
					gameMode = 3;
					ship.shieldLength = 60;
					for (var i = 0; i < 14+level; i++) {
						asteroids.push(new Asteroid());
					}
				} else if (this.mode == 4) {
					location.reload();
				}
				ship.pos.x = width/2;
				ship.pos.y = height/2;
				ship.heading = PI*1.5;
				ship.vel = createVector();
				menuActive = false;
				lasers = []
				hud = new Hud();
				break;
			}
		}
	}
}

function showMenu() {
	fill(255)
	textSize(width/29.611);
	text("Turn", width/3.362, width/10.66);
	text("Boost", width/2.188, width/10.66);
	text("Shoot", width/1.545, width/10.66);
	textSize(width/48.454);
	text("Space", width/1.512, width/5.922);
	text("Shoot for easy mode", width/8.2, width/2.132);
	text("Shoot for normal mode", width/2.508, width/2.132);
	text("Shoot for hard mode", width/1.46, width/2.132);
	text("Shield", width/7.896, width/2.961);
	text("Get another life", width/1.309, width/2.961);
	text("every 1,000 points", width/1.332, width/2.733);
	textSize(width/59.222);
	text("5s shield", width/8.2, width/1.938);
	text("3s shield", width/2.508, width/1.938);
	text("1s shield", width/1.46, width/1.938);
	text("50% score", width/4.441, width/1.938);
	text("100% score", width/1.938, width/1.938);
	text("150% score", width/1.284, width/1.938);
	text("Less asteroids", width/6.27, width/1.853);
	text("Average asteroids", width/2.317, width/1.853);
	text("More asteroids", width/1.384, width/1.853);
	noFill();
	rect(width/3.553, width/7.106, width/21.32, width/21.32);
	rect(width/2.961, width/7.106, width/21.32, width/21.32);
	rect(width/2.09,  width/7.106, width/21.32, width/21.32);
	rect(width/1.615, width/7.106, width/7.106, width/21.32);
	line(width/1.992, width/6.662, width/1.992, width/5.61);
	line(width/1.992, width/6.662, width/2.03,  width/6.27);
	line(width/1.992, width/6.662, width/1.955, width/6.27);
	line(width/3.438, width/6.091, width/3.135, width/6.091);
	line(width/3.438, width/6.091, width/3.331, width/6.46);
	line(width/3.438, width/6.091, width/3.331, width/5.762);
	line(width/2.881, width/6.091, width/2.665, width/6.091);
	line(width/2.665, width/6.091, width/2.733, width/6.46);
	line(width/2.665, width/6.091, width/2.733, width/5.762);
	line(width/7.614, width/2.768, width/5.61,  width/2.768);
	line(width/5.61,  width/2.768, width/5.922, width/2.842);
	line(width/5.61,  width/2.768, width/5.922, width/2.698);
	triangle(width/10.66, width/2.665, width/8.2, width/2.665, width/9.269, width/2.881);
	stroke(128, 128, 255);
	triangle(width/5.33, width/2.665, width/4.634, width/2.665, width/4.958, width/2.881);
	stroke(255);
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].update();
		buttons[i].render();
	}
	noFill();
}