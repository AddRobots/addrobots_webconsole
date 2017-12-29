//Dial.js

//A javascript library for making dials

//Developed by https://github.com/KittiesFTW

function Dial(startNum, stopNum, startAs, id) {
	if (startNum === undefined || stopNum === undefined || startAs === undefined || id === undefined) {
		console.error("dial.js: missing parameter for dial");
		if (id === undefined) {
			delete this;
		}
	}
	this.stN = startNum;
	this.spN = stopNum;
	this.current = startAs;
	this.id = document.getElementById(id);
	this.reset = function() {
		this.current = startAs;
	};
	this.getCurrent = function() {
		return this.current;
	};
	this.render = function() {
		var tempstart = this.stN;
		var tempstop = this.spN;
		var tempcurrent = this.getCurrent();

		this.id.innerHTML = "<div class='dialjs'><div class='dialjs-inner' style='transform: rotate( " + this.getCurrent() + "deg ) translateY( 30px ) rotate( -" + this.getCurrent() +"deg );'></div></div>";
	};
	this.update = function(newval) {
		if (newval >= this.stN && newval <= this.spN) {
			this.current = newval;
			this.render();
		} else {
			console.error("dial.js: error while updating (attempted to set value to " + newval + ", that's outside the range!");
		}
	};
	this.overlap = function() {
		if (this.current == this.stN) {
			this.current = this.spN;
			this.render();
		} else if (this.current == this.spN) {
			this.current = this.stN;
			this.render();
		}
	}
}

function DialControls(dial) {
	var mousedown, mCrds;
	this.id = null;
	if (dial === undefined) {
		console.error("dial.js: No dial for dial controls");
		delete this;
	} else {
		this.id = dial.id;
	}
	this.rectCoords = this.id.getBoundingClientRect();
	var coords = {
		x: parseInt(40, 10),
		y: parseInt(40, 10)
	}
	this.click = false;
	this.lock = function () {
		if (this.islocking == true) {
			this.islocking = false;
		} else if (this.islocking == false) {
			this.islocking = true;
		}
		islock = this.islocking;
	};
	this.removeControls = function () {
		console.log(delete this);
	};
	this.id.onmousedown = function () {
		mousedown = true;
	};
	document.body.onmouseup = function () {
		mousedown = false;
	};
	document.body.onmousemove = function (e) {
		if (mousedown == true) {
			var angle = 0;
			mCrds = {
				x: e.pageX,
				y: e.pageY
			};
			var foo = Math.atan2(coords.y - mCrds.y, coords.x - mCrds.x);
			angle = foo * (180 / Math.PI);
			console.log();
			dial.update(angle);
		}
	};
}