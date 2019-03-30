function Ship() {
	this.pos = createVector(width/2, height/2);
	this.r = width/53.3;
	this.heading = PI*1.5;
	this.rotation = 0;
	this.vel = createVector(0, 0);
	this.isBoosting = false;
	this.isDestroyed = false;
	this.explosionRadius = width/10.66;
	this.explosionSpeed = 1;
	this.shieldLength = 180;

	this.render = function() {
		if (this.isDestroyed) {
			ellipse(this.pos.x, this.pos.y, this.explosionRadius, this.explosionRadius);
			this.explosionRadius*=this.explosionSpeed;
			this.explosionSpeed-=0.004;
		} else {
			push();
			fill(0);
			translate(this.pos.x, this.pos.y);
			rotate(this.heading + PI/2);
			if (this.isBoosting) {
				if (frameCount % 5 == 0) {
					stroke(255, 65, 0);
					strokeWeight(2);
					triangle(-this.r/2, this.r, this.r/2, this.r, 0, width/26.65);
					stroke(255);
					strokeWeight(1);
				}
			}
			if (this.shieldLength > 0 && lives > 0) {
				stroke(128, 128, 255);
			} else {
				stroke(255);
			}
			triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
			pop();
		}
	}

	this.update = function() {
		if (this.isDestroyed == false) {
			if (this.isBoosting) {
				this.boost();
			}
			this.pos.add(this.vel);
			this.vel.mult(0.99);
		} else {
			this.pos.add(this.vel);
			this.vel.mult(0.90)
		}
		this.shieldLength--;
	}

	this.hits = function(asteroid) {
		if (this.isDestroyed == false && this.shieldLength < 0) {
			var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
			return (d < this.r + asteroid.r);
		} else {
			return false;
		}
	}

	this.setRotation = function(angle) {
		this.rotation = angle;
	}

	this.turn = function() {
		this.heading += this.rotation;
	}

	this.boosting = function(b) {
		this.isBoosting = b;
	}

	this.boost = function() {
		var force = p5.Vector.fromAngle(this.heading);
		force.mult(0.1);
		this.vel.add(force);
	}

	this.edges = function() {
		if (this.pos.x > width + this.r) {
			this.pos.x = -this.r;
		} else if (this.pos.x < -this.r) {
			this.pos.x = width + this.r;
		} if (this.pos.y > height + this.r) {
			this.pos.y = -this.r;
		} else if (this.pos.y < -this.r) {
			this.pos.y = height + this.r;
		}
	}
}