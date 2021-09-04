/**
 * ...
 * @author ...Arthur Wang
 */

function procPlayLevel(){
	//alert("procPlayLevel");
	drawPageColor();
	updatePlayFrame();
}


//傳回是否超過指定時間
function updatePlayFrame(){


	drawGameNameTitle();
	drawScore();	//36px
	drawRemainQuestions();	//36px		
	table.draw();	//special
	
	if( !  questions.isOver ){
		drawCurrentQuestion(); //100px	
	
		var t= (+new Date) - currentQuestion.startTime;
		drawLifeBar( maxGuessTime-t ); //special
	}	
	
	updateHintSprite();	
	Fireworks.update();
	
}




function updateHintSprite(){
	if( hintSprite.visible )
		drawHintSprite();
}

function drawHintSprite(){
	hintSprite.x += hintSprite.vx;
	hintSprite.y += hintSprite.vy;	
	
	//ctx.save();	
	ctx.textAlign="left";
	ctx.font = '100px Arial';
	ctx.fillStyle="rgb(255,223,5)";	
	ctx.fillText( hintSprite.text, hintSprite.x, hintSprite.y);
	//ctx.restore();
}

//**********************************************************
//      draw
//**********************************************************
function drawCurrentQuestion(){
	//ctx.save();	
	ctx.textAlign="left";
	ctx.font = '100px Arial';
	ctx.fillStyle="rgb(255,223,5)";	
	ctx.fillText(currentQuestion.text+" =", currentQuestion.x, currentQuestion.y);
	//ctx.restore();
}



function drawScore(){
	var scoreX=185;	//score 座標
	var scoreY=75;	//score 座標
	
//	ctx.save();		
	ctx.textAlign="right";	
	ctx.font = '36px Arial';

	
//	ctx.strokeStyle="rgb(60,23,1)";
//	ctx.strokeText( score.toFixed(0) , scoreX+0, scoreY+0);
	
	ctx.fillStyle="rgb(255,223,5)";
	ctx.fillText( score.toFixed(0) , scoreX, scoreY);
//	ctx.stroke();	
	
}


//以剩餘時間畫出 HP 長度
function drawLifeBar(leftTime){
	var x=70,y=465;
	ctx.save();
	
	//外框
	ctx.strokeStyle="silver";		
	ctx.lineCap="round";	
	ctx.lineWidth=20;
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(750-x,y);
	ctx.stroke();



	//底框
	ctx.strokeStyle="black";		
	ctx.lineCap="round";	
	ctx.lineWidth=16;
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(750-x,y);
	ctx.stroke();

	//HP
	var w= interpolation(leftTime,0, maxGuessTime, 0, 750-x-x);//用內插求出 HP 長度
	ctx.strokeStyle="red";		
	ctx.lineCap="butt";	
	ctx.lineWidth=12;
	
	ctx.beginPath();
	ctx.moveTo(750-x,y);
	ctx.lineTo(750-x-w,y);	
	ctx.stroke();
	
	ctx.restore();
}



//還剩幾題要考
function drawRemainQuestions(){
	var scoreY=75;	//score 座標	
	
//	ctx.save();		
	ctx.textAlign="right";	
	ctx.font = '36px Arial';	
	var txt= questions.qArray.length + " / " +table.totalQuestions;
	ctx.fillText( txt , 670, scoreY);	
//	ctx.restore();
}


//印出 快打九乘九
function drawGameNameTitle(){
	drawRoundedRect("silver",  "rgba(255,255,255,0.2)",  68,  9,  612,  71, 10);	
	
	for(var i=0; i<5; ++i){
		ctx.drawImage( titleTextImages[i],  200+ i*69, 12, 64,64);		
	}
}	

