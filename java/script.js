//VARIABLES
var rollBtnActive = 1;
var outcome;
var turn = "A";
var delay = 1500;

var arr = [];
arr['A'] = {pegs: [], lockerActive: 0, activity: 0, leftPegs: 2, score: 0};
arr['B'] = {pegs: [], lockerActive: 0, activity: 0, leftPegs: 2, score: 0};
arr['B'].pegs[0] = {peg: document.getElementById('pegB0').style, firstChance: 1, current: 0, activeStatus: 0};
arr['B'].pegs[1] = {peg: document.getElementById('pegB1').style, firstChance: 1, current: 0, activeStatus: 0};
arr['A'].pegs[0] = {peg: document.getElementById('pegA0').style, firstChance: 1, current: 0, activeStatus: 0};
arr['A'].pegs[1] = {peg: document.getElementById('pegA1').style, firstChance: 1, current: 0, activeStatus: 0};

//dice roll function
function roll(){
	console.log("roll btn active: " + rollBtnActive);
	if(rollBtnActive == 1){
		//roll the dice.
		outcome = Math.floor(Math.random() * 6 + 1);

		if(document.getElementById('controller').value >= 1 && document.getElementById('controller').value <=6){
			outcome = parseInt(document.getElementById('controller').value);
		}

		document.getElementById('rollOutcome').innerHTML = turn + "'s outcome: " + outcome;
		var number = outcome;
		init(number);
		arr['A'].activity = 0;
		arr['B'].activity = 0;
	}

	if(outcome != 6 && turn == "B" && arr["B"].leftPegs == 2){
		rollBtnActive = 0;
		arr['A'].activity = 0;
		arr['B'].activity = 1;
	}
	else if(outcome != 6 && turn == "A" && arr["A"].leftPegs == 2){
		rollBtnActive = 0;
		arr['A'].activity = 0;
		arr['B'].activity = 1;		
	}

	else if(outcome == 6 && arr[turn].leftPegs > 0) {
		arr[turn].lockerActive = 1;
		alert("PLAYER " + turn + ": CLICK ON YOUR LOCKER TO UNLOCK IT");
		rollBtnActive = 0;
		arr['A'].activity = 0;
		arr['B'].activity = 0;
	}

	if(outcome!=6 && arr[turn].pegs[0].firstChance == 1 && arr[turn].pegs[1].firstChance == 1){
		turn = turnChange(turn);
		rollBtnActive = 1;
	}

	if(arr["A"].pegs[0].current + outcome > 28 && arr["A"].activity == 0 && arr["B"].activity == 0 && arr["A"].pegs[1].current + outcome > 28 && score == 0){
		rollBtnActive = 1;
		arr[turn].activity = 1;
		turn = turnChange(turn);
	}
	else if(arr["A"].pegs[0].current + outcome > 28 && arr["A"].activity == 0 && arr["B"].activity == 0 && arr[turn].pegs[1].current == 43){	
		rollBtnActive = 1;
		arr[turn].activity = 1;
		turn = turnChange(turn);
	}
	else if(arr["A"].pegs[1].current + outcome > 28 && arr["A"].activity == 0 && arr["B"].activity == 0 && arr[turn].pegs[0].current == 43){	
		rollBtnActive = 1;
		arr[turn].activity = 1;
		turn = turnChange(turn);
	}
	if(arr["B"].pegs[0].current + outcome > 42 && arr["A"].activity == 0 && arr["B"].activity == 0 && arr["B"].pegs[1].current + outcome > 42 && score == 0){
		rollBtnActive = 1;
		arr[turn].activity = 1;
		turn = turnChange(turn);
	}
	else if(arr["B"].pegs[0].current + outcome > 43 && arr["A"].activity == 0 && arr["B"].activity == 0 && arr[turn].pegs[1].current == 43){	
		rollBtnActive = 1;
		arr[turn].activity = 1;
		turn = turnChange(turn);
	}	
	else if(arr["B"].pegs[1].current + outcome > 43 && arr["A"].activity == 0 && arr["B"].activity == 0 && arr[turn].pegs[0].current == 43){	
		rollBtnActive = 1;
		arr[turn].activity = 1;
		turn = turnChange(turn);
	}

}


//CHANGING TURN FUNCTION
function turnChange(turn){
	if(turn == "A" && outcome != 6){
		document.getElementById('whoseTurn').innerHTML = "TURN: Player B";
		return "B";
	}
	else if(turn == "A" && outcome == 6){
		document.getElementById('whoseTurn').innerHTML = "TURN: Player A";
		return "A";
	}
	else if(turn == "B" && outcome !=6){
		document.getElementById('whoseTurn').innerHTML = "TURN: Player A";
		return "A";
	}
	else if(turn == "B" && outcome ==6){
		document.getElementById('whoseTurn').innerHTML = "TURN: Player B";
		return "B";
	}

}

//PLAY
function play(){

	if(turn == "A"){

		if(arr[turn].pegs[0].firstChance == 1 && outcome == 6 && arr[turn].lockerActive == 1 && arr[turn].pegs[1].activeStatus == 0){

			arr[turn].pegs[0].peg.display = "block";	
			arr[turn].pegs[0].firstChance = 0; 
			arr[turn].pegs[0].current = 1;
			arr[turn].pegs[0].peg.left = Left(1);
			arr[turn].pegs[0].peg.top = Top(1);	
			cut();	
			rollBtnActive = 1;
			arr[turn].lockerActive = 0;
			arr[turn].activity = 1;
			arr[turn].leftPegs--;
			document.getElementById('playerNameA').innerHTML = arr["A"].leftPegs + turn;	
		}
		if(arr[turn].pegs[1].firstChance == 1 && outcome == 6 && arr[turn].pegs[0].firstChance == 0 && arr[turn].lockerActive == 1 && arr[turn].pegs[0].activeStatus == 0){

			arr[turn].pegs[1].peg.display = "block";	
			arr[turn].pegs[1].firstChance = 0; 
			arr[turn].pegs[1].current = 1;
			arr[turn].pegs[1].peg.left = Left(1);
			arr[turn].pegs[1].peg.top = Top(1);		
			cut();
			rollBtnActive = 1;
			arr[turn].lockerActive = 0;
			arr[turn].activity = 1;
			arr[turn].leftPegs--;
			document.getElementById('playerNameA').innerHTML = arr["A"].leftPegs + turn;	
		}

		else if(arr[turn].pegs[0].current + outcome < 28 && arr[turn].pegs[0].activeStatus == 1 && arr["A"].activity == 0 && arr["B"].activity == 0){
			animate(turn, 0, outcome);
			arr[turn].pegs[0].current = arr[turn].pegs[0].current + outcome;
			arr[turn].lockerActive = 0;
			cut();
			arr[turn].activity = 1;
			arr[turn].pegs[0].activeStatus = 0; 
			turn = turnChange("A");
			rollBtnActive = 1;
		}

		else if(arr[turn].pegs[1].current + outcome < 28 && arr[turn].pegs[1].activeStatus == 1 && arr["A"].activity == 0 && arr["B"].activity == 0){

			animate(turn, 1, outcome);
			arr[turn].pegs[1].current = arr[turn].pegs[1].current + outcome;
			arr[turn].lockerActive = 0;
			cut();
			arr[turn].activity = 1; 
			turn = turnChange("A");
			rollBtnActive = 1;
		}

		else if(arr[turn].pegs[0].current + outcome == 28 && arr[turn].pegs[0].activeStatus == 1 && arr["A"].activity == 0 && arr["B"].activity == 0){

			arr[turn].pegs[0].current = 28;
			cut();
			arr[turn].pegs[0].peg.top = 150;
			arr[turn].pegs[0].peg.left = 390;
			rollBtnActive = 1;
			arr[turn].pegs[0].activeStatus = 0
			arr[turn].pegs[0].current = 43;
			arr[turn].activity = 1;
			arr[turn].pegs[0].activeStatus = 0; 
			
			arr[turn].score++;
			turn = turnChange("A");
			win();
		}
		else if(arr[turn].pegs[1].current + outcome == 28 && arr[turn].pegs[1].activeStatus == 1 && arr["A"].activity == 0 && arr["B"].activity == 0){

			arr[turn].pegs[1].current = 28;
			cut();
			arr[turn].pegs[1].peg.top = 150;
			arr[turn].pegs[1].peg.left = 350;
			rollBtnActive = 1;
			arr[turn].pegs[1].activeStatus = 0
			arr[turn].pegs[1].current = arr[turn].pegs[1].current + outcome;
			arr[turn].activity = 1; 

			arr[turn].score++;
			turn = turnChange("A");
			win();
		}

		else if(arr[turn].pegs[0].current + outcome > 28 && arr[turn].pegs[0].activeStatus == 1 && arr["A"].activity == 0 && arr["B"].activity == 0){
			alert("PLAYER " + turn + ": YOU NEED TO LAND EXACTLY ON THE FINISHING BLOCK!");
		}
		else if(arr[turn].pegs[1].current + outcome > 28 && arr[turn].pegs[1].activeStatus == 1 && arr["A"].activity == 0 && arr["B"].activity == 0){
			alert("PLAYER " + turn + ": YOU NEED TO LAND EXACTLY ON THE FINISHING BLOCK!");
		}
	}

	if(turn == "B"){
		
		if(arr[turn].pegs[0].firstChance == 1 && outcome == 6 && arr[turn].lockerActive == 1 && arr[turn].pegs[1].activeStatus == 0){

			arr[turn].pegs[0].peg.display = "block";	
			arr[turn].pegs[0].firstChance = 0; 
			arr[turn].pegs[0].current = 15;
			arr[turn].pegs[0].peg.left = Left(15);
			arr[turn].pegs[0].peg.top = Top(15);
			cut();			
			rollBtnActive = 1;
			arr[turn].lockerActive = 0;
			arr[turn].activity = 1;
			turn = turnChange("B");
			arr[turn].leftPegs--;
			document.getElementById('playerNameB').innerHTML = arr["B"].leftPegs + turn;	
		}
		if(arr[turn].pegs[1].firstChance == 1 && outcome == 6 && arr[turn].pegs[0].firstChance == 0 && arr[turn].lockerActive == 1 && arr[turn].pegs[0].activeStatus == 0){ 

			arr[turn].pegs[1].peg.display = "block";	
			arr[turn].pegs[1].firstChance = 0; 
			arr[turn].pegs[1].current = 15;
			arr[turn].pegs[1].peg.left = Left(15);
			arr[turn].pegs[1].peg.top = Top(15);
			cut();			
			rollBtnActive = 1;
			arr[turn].lockerActive = 1;
			arr[turn].activity = 1;
			turn = turnChange("B");
			arr[turn].leftPegs--;
			document.getElementById('playerNameB').innerHTML = arr["B"].leftPegs + turn;	
		}

		else if(arr[turn].pegs[0].current + outcome < 42 && arr[turn].pegs[0].activeStatus == 1 && arr["A"].activity == 0 && arr["B"].activity == 0){

			animate(turn, 0, outcome);
			arr[turn].pegs[0].current = arr[turn].pegs[0].current + outcome;
			arr[turn].lockerActive = 0;
			cut();	
			arr[turn].activity = 1;
			arr[turn].pegs[0].activeStatus = 0; 
			turn = turnChange("B");
			rollBtnActive = 1;
		}
		if(arr[turn].pegs[1].current + outcome < 42 && arr[turn].pegs[1].activeStatus == 1 && arr["A"].activity == 0 && arr["B"].activity == 0){

			animate(turn, 1, outcome);
			arr[turn].pegs[1].current = arr[turn].pegs[1].current + outcome;
			arr[turn].lockerActive = 0;
			cut();	
			arr[turn].activity = 1;
			arr[turn].pegs[1].activeStatus = 0; 
			turn = turnChange("B");
			rollBtnActive = 1;
		}
		if(arr[turn].pegs[0].current + outcome == 42 && arr[turn].pegs[0].activeStatus == 1 && arr["A"].activity == 0 && arr["B"].activity == 0){

			arr[turn].pegs[0].current = 14;
			cut();
			arr[turn].pegs[0].peg.top = 385;
			arr[turn].pegs[0].peg.left = 930;
			rollBtnActive = 1;
			arr[turn].pegs[0].activeStatus = 0
			arr[turn].pegs[0].current = 43; 
			arr[turn].score++;
			turn = turnChange("B");
			win();
		}
		if(arr[turn].pegs[1].current + outcome == 42 && arr[turn].pegs[1].activeStatus == 1 && arr["A"].activity == 0 && arr["B"].activity == 0){

			arr[turn].pegs[1].current = 14;
			cut();
			arr[turn].pegs[1].peg.top = 385;
			arr[turn].pegs[1].peg.left = 890;
			rollBtnActive = 1;
			arr[turn].pegs[1].activeStatus = 0
			arr[turn].pegs[1].current = 43; 
			arr[turn].score++;
			turn = turnChange("B");
			win();
		}

		if(arr[turn].pegs[0].current + outcome > 42 && arr[turn].pegs[0].activeStatus == 1 && arr["A"].activity == 0 && arr["B"].activity == 0){
			alert("PLAYER " + turn + ": YOU NEED TO LAND EXACTLY ON THE FINISHING BLOCK!");
		}
		if(arr[turn].pegs[1].current + outcome > 42 && arr[turn].pegs[1].activeStatus == 1 && arr["A"].activity == 0 && arr["B"].activity == 0){
			alert("PLAYER " + turn + ": YOU NEED TO LAND EXACTLY ON THE FINISHING BLOCK!");
		}
	}
}


//Activate peg
function activate(id){
	var pegIndex = Number(id.substring(4, 5));
	var whoseTurn = id.substring(3, 4);
	if(arr[turn].activity == 0 && whoseTurn == turn){
		arr[whoseTurn].pegs[pegIndex].activeStatus = 1;
		play(); 
	}
}



//FUNCTIONS TO GET THE ELEMENT'S POSITION W.R.T. DOM IN TERMS OF BOX-NUMBER!
function Left(i){
	return getOffsetLeft(document.getElementById(("box" + i)));
}
function Top(i){
	return getOffsetTop(document.getElementById(("box" + i)));
}

//FUNCTIONS TO GET POSITION OF AN ELEMENT RELATIVE TO THE DOM:
function getOffsetLeft( elem )
{
	var offsetLeft = 0;
	do {
		if ( !isNaN( elem.offsetLeft ) )
		{
			offsetLeft += elem.offsetLeft;
		}
	} while( elem = elem.offsetParent );
	return offsetLeft;
}

function getOffsetTop( elem )
{
	var offsetTop = 0;
	do {
		if ( !isNaN( elem.offsetTop ) )
		{
			offsetTop += elem.offsetTop;
		}
	} while( elem = elem.offsetParent );
	return offsetTop;
}	


//CASE: TWO OR MORE PEGS ON SAME BOX
function cut(){
	var killed;
	console.log("arr[A].pegs[0].current: " + arr["A"].pegs[0].current);
	console.log("arr[B].pegs[1].current: " + arr["B"].pegs[1].current);
	console.log("arr[A].pegs[1].firstChance: " + arr["A"].pegs[1].firstChance);
	console.log("arr[B].pegs[1].firstChance: " + arr["B"].pegs[1].firstChance);
	console.log("arr[A].pegs[0].firstChance: " + arr["A"].pegs[0].firstChance );
	console.log("arr[B].pegs[0].firstChance: " + arr["B"].pegs[0].firstChance );
	console.log("arr[A].pegs[1].current: " + arr["A"].pegs[1].current);
	console.log("arr[B].pegs[0].current: " + arr["B"].pegs[0].current);
	if(arr[turn].pegs[0].current == arr[turn].pegs[1].current && arr[turn].pegs[1].firstChance == 0 && arr[turn].pegs[0].firstChance == 0){
		arr[turn].pegs[0].peg.width = 18;
		arr[turn].pegs[0].peg.height = 18;
		arr[turn].pegs[1].peg.width = 18;
		arr[turn].pegs[1].peg.height = 18;
		arr[turn].pegs[0].peg.margin = 8;
		arr[turn].pegs[1].peg.margin = 22;
	}
	else if(arr[turn].pegs[0].current != arr[turn].pegs[1].current && arr[turn].pegs[1].firstChance == 0 && arr[turn].pegs[0].firstChance == 0){
		console.log('imhere');
		arr[turn].pegs[0].peg.width = 25;
		arr[turn].pegs[0].peg.height = 25;
		arr[turn].pegs[1].peg.width = 25;
		arr[turn].pegs[1].peg.height = 25;
		arr[turn].pegs[0].peg.margin = 11;
		arr[turn].pegs[1].peg.margin = 11;
	}

	for(var i=0; i<2; i++){
		if(((arr["A"].pegs[i].current == arr["B"].pegs[i].current) || (arr["A"].pegs[i].current + 28 == arr["B"].pegs[i].current)) && arr["A"].pegs[i].firstChance == 0 && arr["B"].pegs[i].firstChance == 0){
			if(turn == "A") killed = "B";
			else killed = "A";

			arr[killed].pegs[i].current = 0;
			arr[killed].pegs[i].firstChance = 1;
			arr[killed].pegs[i].peg.display = "none";
			arr[killed].leftPegs++;
			if(killed == "A")
				document.getElementById('playerNameA').innerHTML = arr[killed].leftPegs + turn;
			if(killed == "B")
				document.getElementById('playerNameB').innerHTML = arr[killed].leftPegs + turn;

		}
	}

	if(((arr["A"].pegs[1].current == arr["B"].pegs[0].current) || (arr["A"].pegs[1].current + 28 == arr["B"].pegs[0].current)) && arr["A"].pegs[1].firstChance == 0 && arr["B"].pegs[0].firstChance == 0){
		if(turn == "A"){
			arr["B"].pegs[0].current = 0;
			arr["B"].pegs[0].firstChance = 1;
			arr["B"].pegs[0].peg.display = "none";
			arr["B"].leftPegs++;
			document.getElementById('playerNameB').innerHTML = arr["B"].leftPegs + turn;	
		}
		else{
			arr["A"].pegs[1].current = 0;
			arr["A"].pegs[1].firstChance = 1;
			arr["A"].pegs[1].peg.display = "none";
			arr["A"].leftPegs++;
			document.getElementById('playerNameA').innerHTML = arr["A"].leftPegs + turn;
		}
	} 
	if(((arr["A"].pegs[0].current == arr["B"].pegs[1].current) || (arr["A"].pegs[0].current  + 28 == arr["B"].pegs[1].current)) && arr["A"].pegs[0].firstChance == 0 && arr["B"].pegs[1].firstChance == 0){
		if(turn == "A"){
			arr["B"].pegs[1].current = 0;
			arr["B"].pegs[1].firstChance = 1;
			arr["B"].pegs[1].peg.display = "none";
			arr["B"].leftPegs++;
			document.getElementById('playerNameB').innerHTML = arr["B"].leftPegs + turn;	
		}
		else{
			arr["A"].pegs[0].current = 0;
			arr["A"].pegs[0].firstChance = 1;
			arr["A"].pegs[0].peg.display = "none";
			arr["A"].leftPegs++;
			document.getElementById('playerNameA').innerHTML = arr["A"].leftPegs + turn;
		}
	} 
}

//WIN FUNCTION
function win(){
	if(arr["A"].score == 2){
		alert("PLAYER " + "A" + " WINS");
	}

	if(arr["B"].score == 2){
		alert("PLAYER " + "B" + " WINS");
	}
}

//ANIMATE FUNCTION

function animate( turn, pegIndex, outcome){

	var current = arr[turn].pegs[pegIndex].current;

	var pxLeft = Left(current);
	var pxTop = Top(current);
	var destination = current + outcome;

	var id = setInterval(frame, 6-outcome);
	var i =0;

	function frame(){
		if(current <= destination){

			if((current >=1 && current <8) || (current >=29 && current <36)){
                //animate a block towards right  
                pxLeft++;
                arr[turn].pegs[pegIndex].peg.left = pxLeft + "px";
            }

            else if((current >=8 && current < 15) || (current >=36 && current <43)){
                //move bottom
                pxTop++;
                arr[turn].pegs[pegIndex].peg.top = pxTop + "px";
            }

            else if(current >= 15 && current < 22){
                //move Left
                pxLeft--;
                arr[turn].pegs[pegIndex].peg.left = pxLeft + "px";
            }

            else if(current >= 22 && current <= 28){
                //move Top
                pxTop--;
                arr[turn].pegs[pegIndex].peg.top = pxTop + "px";
            }
        }
        i++;    	
        if(i%50 == 0){
        	current++;
        }
        if(i == 50*outcome) clearInterval( id );
    }   
}

document.getElementById('lockerA').style.opacity = 0.01;		
document.getElementById('lockerB').style.opacity = 0.01;
document.getElementById('rollBtn').style.opacity = 0.01;
document.getElementById('controller').style.opacity = 0.01;
document.getElementById('rollOutcome').style.opacity = 0.01;
document.getElementById('playerNameA').style.opacity = 0.01;
document.getElementById('playerNameB').style.opacity = 0.01;
document.getElementById('whoseTurn').style.opacity = 0.01;
var i = 1;
while(i < 50) {
	document.getElementById("box" + i).style.opacity = 0.01;
	i++
}

function appearLocker(){
	setTimeout(function locker(){
		var opac = 0;
		var id = setInterval(frame1, 9);
		var flag = 0;
		var id1;
		if(flag == 0){
			document.getElementById('playerNameA').style.opacity = 0;
			document.getElementById('playerNameB').style.opacity = 0;
			document.getElementById('whoseTurn').style.opacity = 0;
			document.getElementById('controller').style.opacity = 0.0;
			document.getElementById('rollOutcome').style.opacity = 0;
		}
		function frame1(){

			document.getElementById('lockerA').style.opacity = .1 + opac*0.01;		
			document.getElementById('lockerB').style.opacity = .1 + opac*0.01;
			document.getElementById('rollBtn').style.opacity = .1 + opac*0.01;

			opac ++;

			if(opac == 90){
				clearInterval(id);	
				flag = 1;
				opac = 0;
			}
			if(flag == 1) id1 = setInterval(frame2, 9);
		}


		function frame2(){
			document.getElementById('playerNameA').style.opacity = .1 + opac*0.01;
			document.getElementById('playerNameB').style.opacity = .1 + opac*0.01;
			document.getElementById('whoseTurn').style.opacity = .1 + opac*0.01;
			document.getElementById('rollOutcome').style.opacity = .1 + opac*0.01;
			document.getElementById('controller').style.opacity = .1 + opac*0.01;
			opac++;

			if(opac == 90){
				clearInterval(id1);
			}
		}
	}, delay);

}

function appearBoxes(){
	setTimeout(function boxes(){
		var opac = 0;
		var id = setInterval(frame, 10);
		var i = 1;

		function frame(){
			while(i < 50) {
				document.getElementById("box" + i).style.opacity = 0.1 + opac*0.01;
				i++
			}
			opac++;
			i=1;
			if(opac == 90) clearInterval(id);
		}
	}, delay)
}

//ANIMATING CIRCLES
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.height = 306;
canvas.width = 306;

var radius = 3;
var x = 153;
var y = 153;
var dx = Math.random()*4 - 2;
var dy = Math.random()*4 - 2;

function Circle(dx, dy, radius, color){
	this.x = 153;
	this.y = 153;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;

	this.draw = function (){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		c.fillStyle = color;
		c.stroke();
		c.fill();
		c.closePath();
	}

	this.update = function(){

		// if(this.x + this.radius> canvas.width || this.x - this.radius < 0){
		// 	if(this.dx < 5) this.dx = -this.dx*1.1;
		// 	else if(this.dy >5) this.dx = -this.dx;
		// } 
		// if(this.y + this.radius> canvas.height || this.y - this.radius< 0) this.dy = -this.dy;{
		// 	if(this.dy < 5) this.dy = -this.dy*1.1;
		// 	else if(this.dy > 5) this.dy = -this.dy;
		// }

		if(this.x + this.radius> canvas.width || this.x - this.radius < 0) this.dx = -this.dx;
		if(this.y + this.radius> canvas.height || this.y - this.radius< 0) this.dy = -this.dy;

		this.x += this.dx;
		this.y += this.dy;	
		this.draw();
	}
}
var circle = [];
var colorArray = [
	"#110904",
	"#2A1300",
	"#2A0500",
	"#0C1000",
	"#392F00",
	"#802E00"
];
function randomInRange(min, max){
	return Math.random()*(max-min) + min;
}

function init(number){
	circle = [];
	for(i=0; i < number; i++){
		dx = randomInRange(-3, 3);
		dy = randomInRange(-3, 3);
		radius = randomInRange(3, 6);
		color = colorArray[Math.floor(Math.random()*7 + 1)];
		circle.push(new Circle(dx, dy, radius, color));
		circle[i].draw();
	}
}

function animateCircles(){
	requestAnimationFrame(animateCircles);

	c.clearRect(0, 0, canvas.width, canvas.height);
	for(i=0; i<circle.length; i++){
		circle[i].update();
	}
}
animateCircles();

//MOUSE ANIMATION
function Sparkle(){
	this.x = x
}

//INTERACTIVITY
// var controlTop = document.getElementById('controller').style.top;
// var controlLeft = document.getElementById('controller').style.left;

// var mouse = {x: undefined, y: undefined};

// window.addEventListener('mousemove', 
// 	function(event){
// 		mouse.x = event.x;
// 		mouse.y = event.y;
// document.getElementById('roll').style.top = -mouse.y*0.04;
// document.getElementById('roll').style.left = -mouse.x*0.04;
// 	})
