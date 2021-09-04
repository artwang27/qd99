/**
 * ...
 * @author ...Arthur Wang
 */

function procGameOver(){
	//alert("procGameOver");
	drawPageColor();
	drawGameOver();
	Fireworks.update();
}

function initGameOver(){
	setGameOverObject();
	setGameOverAnimate();
}	


//gameOver 畫面呈現的文字變數
function setGameOverObject(){
	var wrongCount= table.getWrongAnswerCount();	//錯幾題	
	var meanSec= (gameFinishTime/table.totalQuestions) /1000;		//平均每題幾秒
	var diffSec= (gameFinishTime -lastGameFinishTime) / 1000; //全部答完進退步幾秒	

	gameOverObject.textWrongRate= wrongCount + " / " +table.totalQuestions;
	gameOverObject.textMeanSec = meanSec.toFixed(2) +" 秒";
	gameOverObject.textDiffStr= (diffSec>0) ? "退步"+  diffSec.toFixed(2) +"秒" : "進步"+  Math.abs(diffSec).toFixed(2)  +"秒" ;
	gameOverObject.textRank= getRankStar(meanSec);	//判定幾顆星 (0~5)
	gameOverObject.textScore= score	+ " 分";
}


//依照平均每題幾秒，顯現多少枚煙火
function setGameOverAnimate(){
	var meanSec= gameFinishTime/table.totalQuestions/1000;	//平均每題幾秒
	if( meanSec >=10 ) return;	
	
	//依照平均每題幾秒，顯現多少枚煙火
	var totalFirework= 10 - Math.floor(meanSec);
	//所有煙火會在 5 秒內施放完畢，第一枚在 0.5 秒引爆
	//求兩枚煙火點放的時間差，最遲三秒就要引爆第二顆
	var delayTime= (totalFirework<=2) ? 3000:  4500/ (totalFirework-1); 
	
	for(var i=0; i<totalFirework; i++){
		setTimeout( gameOverFirework, 500 + delayTime*i );
	}
}


function gameOverFirework(){
	var target={
			x: (Math.random()*0.6 +0.2)*canvas.width,
			y: (Math.random()*0.4 +0.1)*canvas.height
		};
		
	Fireworks.createParticle(
		// position 
			{ 	x: -1,  y: canvas.height + 10},
		//target 
			target,
		// velocity
			{	x: Math.random() * 3 - 1.5, y: 0 }
		);
}
	


function drawGameOver(){
	const w=612,h=71,space=80;

	
	ctx.save();

	//畫外框
	var x=68, y=50;	
	ctx.fillStyle= "rgba(255,255,255,0.2)"
	ctx.fillRect(x,y,w,h);
	ctx.fillRect(x,y+space,w,h);	
	ctx.fillRect(x,y+space*2,w,h);	
	ctx.fillRect(x,y+space*3,w,h);	
	ctx.fillRect(x,y+space*4,w,h);		
	//...................................
	
	ctx.fillStyle="rgb(255,223,5)";	
	
	x+=100;	y=81;
	ctx.textAlign="left";
	ctx.font = "24px '微軟正黑體' ";		
	ctx.fillText( "錯誤比率"	,x, y+space*0,w,h);			
	ctx.fillText( "每題平均"	,x, y+space*1,w,h);	
	ctx.fillText( "全部答完"	,x, y+space*2,w,h);		
	ctx.fillText( "程度等級"	,x, y+space*3,w,h);		
	ctx.fillText( "您的成績"	,x, y+space*4,w,h);


	x+=190;	y=105;	
	ctx.textAlign="left";
	ctx.font = "48px '微軟正黑體' ";		
	ctx.fillText( gameOverObject.textWrongRate	,x, y+space*0,w,h);		
	ctx.fillText( gameOverObject.textMeanSec	,x, y+space*1,w,h);	
	ctx.fillText( gameOverObject.textDiffStr	,x, y+space*2,w,h);		
	ctx.fillText( gameOverObject.textRank		,x, y+space*3,w,h);	
	ctx.fillText( gameOverObject.textScore		,x, y+space*4,w,h);


	//印出 縱向的 快打九乘九
	for(var i=0; i<5; ++i){
		ctx.drawImage( titleTextImages[i],  71, 50+space*i+3 , 64,64);		
	}
	
	ctx.restore();
}






/*
	準備要離開 Game Over 畫面了！
	1.成績若有進步，將自動存檔
	2.成績若有退步，將詢問是否存檔
	接著，才切換到適當的頁面
*/
function doGameOverClick(evt){
	if( gameFinishTime<	lastGameFinishTime ){ //成績進步了
		personalSheets.save( table, currentPersonalSheet );
		gameOverToggleNextPage();
		return;
	}
	
	
	//saveIt= window.confirm("成績有退步，是否存檔？"); 
	var diffSec= (gameFinishTime-lastGameFinishTime)/1000;  //退步幾秒		
	document.getElementById("confirmSaveScore").innerHTML
			="成績退步了 "+ diffSec.toFixed(2) +" 秒，是否存檔？<br/><br/>";
			
	setHtmlObjectVisible("page_saveConfirm",true);		
	//接著，當按下 存檔或取消 都會呼叫 doSaveBadScoreConfirm()
		
}


//成績退步，是否存檔
function doSaveBadScoreConfirm(){
	//alert(this.value);
	if(this.value=="存檔")
		personalSheets.save(table, currentPersonalSheet );
			
	setHtmlObjectVisible("page_saveConfirm",false);		
	gameOverToggleNextPage();
	return;
}


function gameOverToggleNextPage(){
	clearInterval(gameLoop);	//停止遊戲動畫	
	
	if( testType == finalTest){ //只有挑戰 Final Test 才會出現排行榜
		switchGameState(ST_SHOW_HIGH_SCORE);
		procShowHighScore(true);
	}
	else{
//		switchGameState(ST_SHOW_HIGH_SCORE);
//		procShowHighScore(true);
		
		switchGameState(ST_TITLE);
		procTitle();
	}
	
}



