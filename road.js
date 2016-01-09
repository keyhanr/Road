var height = 768;
var width = 1366;

var cX = width/2;
var cY = height/2;

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

// offset from top left corner of canvas
var mx = -60;
var my = -120;

var paused = false;

var l = []; // array of lights

var d; // depth layers
var dk; // darkness
var s; // speed
var p; // particles
var maxL = 50; // max luminosity
var minL = 40; //min luminosity
var dChange;
var animS = 45;
var mR; // max radius

var rY = 50; // range of gen on x
var rX = 50; // range of gen on y


function genLight () {
	// distance, radius, x, y
	l.push([d, Math.random()*rX + width/2 - rX/2,
			Math.random()*rY + height/2 - rY/2]);
}

var amount = 0;

//document.getElementById('wrapper').onmousemove = setMouseLoc;

// function setMouseLoc(event) {
//     var rect = ctx.canvas.getBoundingClientRect();
//     cX = event.clientX - rect.left;
//     cY = event.clientY - rect.top;
// }

function setD (nD) {
	d = nD;
}

function setS (nS) {
	s = nS/100;
}

function setP (nP) {
	p = nP;
}

function setDC (nDC) {
	dChange = nDC;
}

function setRX (nRX) {
	rX = nRX;
}

function setRY (nRY) {
	rY = nRY;
}

function setDK (nDK) {
	dk = nDK/100;
}

function setAS (nAS) {
	pause();
	animS = 252 - nAS;
	pause();
}

function setMR (nMR) {
	mR = nMR/10;
}

setD(document.getElementById('dS').value);
setS(document.getElementById('sS').value);
setP(document.getElementById('pS').value);
setDC(document.getElementById('dC').value);
setRX(document.getElementById('rXS').value);
setRY(document.getElementById('rYS').value);
setDK(document.getElementById('dkS').value);
setMR(document.getElementById('mrS').value);

function road() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < p; i++) {
		genLight();
	}
	for(var i = l.length - 1; i > 0; i--){
		if (l[i][0] <= dChange || l[i][1] > width || l[i][2] > height) {
			l.splice(i, 1);
		}
		else {
			ctx.beginPath();
		    ctx.arc(
		    	l[i][1], // x
		    	l[i][2], // y
		    	mR - (l[i][0]*1.2)/d, // r
		    	0, 6.2832);
		    l[i][0] -= dChange;
		    l[i][1] = (l[i][1] - cX)*s + cX; // x change
		    l[i][2] = (l[i][2] - cY)*s + cY; // y change
	    	ctx.fillStyle = "hsl(" + (l[i][0]/d)*360
	    		+ ", 90%, " + (50 - 100*dk*(l[i][0]/d)) + "%)";
	    	ctx.fill();
		}
	}
}

var interval = setInterval(road, animS);

function pause () {
	if (!paused) {
		paused = true;
		interval = clearTimeout(interval);
	}
	else {
		paused = false;
		interval = setInterval(road, animS);
	}
}

c.onmousedown = pause;
