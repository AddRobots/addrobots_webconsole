/*
 Dial.js
 A javascript library for making dials
 Developed by https://github.com/KittiesFTW
*/

function Dial(minVal, maxVal, startVal, id) {
	if (minVal === undefined
	    || maxVal === undefined
	    || startVal === undefined
	    || id === undefined) {
		console.error("dial.js: missing parameter for dial");
		if (id === undefined) {
			delete this;
		}
	}
	this.minVal = minVal;
	this.maxVal = maxVal;
	this.current = startVal;
	this.dialElement = document.getElementById(id);
	this.reset = function () {
		this.current = startVal;
	};
	this.getCurrent = function () {
		return this.current;
	};
	this.render = function () {
		this.dialElement.innerHTML = "<div class='dialjs'><div class='dialjs-inner' style='transform: rotate(" + (this.getCurrent() + 90) + "deg ) translateY( 30px ) rotate( -" + this.getCurrent()
		                             + "deg );'></div></div>";
	};
	this.update = function (newVal) {
		if (newVal >= this.minVal && newVal <= this.maxVal) {
			this.current = newVal;
			this.render();
		} else {
			console.error("dial.js: error while updating (attempted to set value to " + newVal + ", that's outside the range!");
		}
	};
	this.overlap = function () {
		if (this.current === this.minVal) {
			this.current = this.maxVal;
			this.render();
		} else if (this.current === this.maxVal) {
			this.current = this.minVal;
			this.render();
		}
	}
}

function DialControls(dial) {
	let mousedown = false;
	this.dialElement = null;
	if (dial === undefined) {
		console.error("dial.js: No dial for dial controls");
		delete this;
	} else {
		this.dialElement = dial.dialElement;
	}
	let dialRect = this.dialElement.getBoundingClientRect();
	let centerX = dialRect.left + (80 / 2);
	let centerY = dialRect.top + (dialRect.height / 2);
	this.click = false;
	this.lock = function () {
		if (this.islocking === true) {
			this.islocking = false;
		} else if (this.islocking === false) {
			this.islocking = true;
		}
		islock = this.islocking;
	};
	this.removeControls = function () {
		console.log(delete this);
	};
	this.dialElement.onmousedown = function () {
		mousedown = true;
	};
	document.body.onmouseup = function () {
		mousedown = false;
	};
	document.body.onmousemove = function (event) {
		if (mousedown === true) {
			let angle = Math.atan2(centerY - event.pageY, centerX - event.pageX) * 180 / Math.PI;
			if (angle < 0) {
				angle += 360;
			}
			console.log();
			dial.update(angle);
		}
	};
}