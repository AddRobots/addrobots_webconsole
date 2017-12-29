var dial = new Dial(0, 360, 180, "dial");
dial.render();
var controls = new DialControls(dial);
function getResult() {
	requestAnimationFrame(getResult);
	document.getElementById("result").innerHTML = dial.getCurrent();
}
function annoyingFunctionIHaveToMakeToRunTheOverlapUrrg() {
	requestAnimationFrame(annoyingFunctionIHaveToMakeToRunTheOverlapUrrg);
	dial.overlap();
}
annoyingFunctionIHaveToMakeToRunTheOverlapUrrg();
getResult();