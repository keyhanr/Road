var height = 768;
var width = 1366;

var cX = width/2;
var cY = height/2;

var c=document.getElementById("canvas");
var ctx=c.getContext("2d");

// offset from top left corner of canvas
var mx = -60;
var my = -120;

var grd = ctx.createLinearGradient(0,0, width, height);
grd.addColorStop(0,"#090");
grd.addColorStop(1,"#65c");

ctx.fillStyle="#000";
ctx.fillRect(0,0,width, height);

ctx.fillStyle=grd;

var d; // depth layers
var s; // speed
var p; // particles
var maxL = 50; // max luminosity
var minL = 40; //min luminosity
var dChange;
var animS = 45;

var rY = 50; // range of gen on x
var rX = 50; // range of gen on y


var l = []; // array of lights


function genLight () {
	// distance, radius, x, y
	var x = Math.random()*rX + width/2 - rX/2;
	var y = Math.random()*rY + height/2 - rY/2;
	l.push([d, 1, x, y]);
}

var amount = 0;

//document.getElementById('wrapper').onmousemove = setMouseLoc;

// function setMouseLoc(event) {
//     var rect = ctx.canvas.getBoundingClientRect();
//     cX = event.clientX - rect.left;
//     cY = event.clientY - rect.top;
// }


function setOptions() {
	d = document.getElementById('dS').value; // depth layers
	s = document.getElementById('sS').value; // speed
	p = document.getElementById('pS').value; // particles
	maxL = 50; // max luminosity
	minL = 20; //min luminosity
	dChange = document.getElementById('dC').value;
}

function setD (nD) {
	d = nD;
}

function setS (nS) {
	s = nS;
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

function setAS (nAS) {
	animS = nAS;
}

setD(document.getElementById('dS').value);
setS(document.getElementById('sS').value);
setP(document.getElementById('pS').value);
setDC(document.getElementById('dC').value);
setRX(document.getElementById('rXS').value);
setRY(document.getElementById('rYS').value);

setTimeout(function() {
	var interval = setInterval(function() {
		amount += 0.00;
        if (amount > 1) {
            amount = 1;
            clearInterval(interval);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth=1;
        ctx.fillStyle="#000";
		ctx.fillRect(0,0,width, height);
		for (var i = 0; i < p; i++) {
			genLight();
		}
		for(var i = l.length - 1; i > 0; i--){
			if (l[i][0] <= dChange) {
				l.splice(i, 1);
			}
			else {
				ctx.beginPath();
			    ctx.arc(
			    	l[i][2], // x
			    	l[i][3], // y
			    	Math.max(1.7 - l[i][0]*1.4/d, 0.4), // r
			    	0, Math.PI * 2);
			    l[i][0] -= dChange;
			    l[i][2] = (l[i][2] - cX)*s + cX; // x change
			    l[i][3] = (l[i][3] - cY)*s + cY; // x change
		    	ctx.strokeStyle = "hsl(" + Math.floor(l[i][0]*(360/d)) 
		    		+ ", 40%, " + 50 + "%)";
		    	ctx.stroke();
			}
		}
	}, animS);
}, 300);
