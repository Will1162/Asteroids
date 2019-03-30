function Laser(spos, angle) {
	this.pos = createVector(spos.x, spos.y);
	this.vel = p5.Vector.fromAngle(angle);
	this.vel.mult(width/106.6)

	this.update = function() {
		this.pos.add(this.vel);
	}

	this.render = function() {
		push();
		strokeWeight(width/213.2);
		point(this.pos.x, this.pos.y);
		pop();
	}

	this.hits = function(asteroid) {
		var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
		return (d < asteroid.r);
	}

	this.offScreen = function() {
		return (this.pos.x > width  ||
				this.pos.x < 0 		||
				this.pos.y > height ||
				this.pos.y < 0)
	}
}