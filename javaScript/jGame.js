/**
 * ...
 * @author ...Arthur Wang
 */

//init 
//**********************************************************

const maxElapsedTime= 1000*100;	//假定耗時 100 秒才猜出，代表這題還不會
const maxGuessTime=1000*10;	//每題最多猜十秒
const maxQuestionTry=2; //如果答錯這一題，最多可以試幾次
const finalTest=0;	//判斷正在挑戰 finalTest 或 平日練習
const practiceTest=1;	//判斷正在挑戰 finalTest 或 平日練習
	
var 

	wrongSheet=new WrongSheet(), //wrongSheet 是集合 WrongRecord 的陣列，記錄學生的錯誤訊息
	scoreSheet=new ScoreSheet(), //排行榜的紀錄
	personalSheets=new PersonalSheets(),//包含兩張 sheet, finalSheet 及 practiceSheet	
	questions=new Questions(), //所有的問題，存放 table.cells 物件	
	currentQuestion=new CurrentQuestion(),	//代表要猜的題目，內含 Cell 類別 	
	table=new QTable(), //將所有的問題，呈現在螢幕中央	
	cards=[],	//所有的問題，做成卡片，等待取出
	currentPersonalSheet=null, //指出目前要使用到 personalSheets 的 finalTest 或 practiceTest
	//gameOver 畫面呈現的文字格式
	gameOverObject={
			textWrongRate: "0 / 9",
			textMeanSec: "9.99 秒",
			textDiffStr: "退步9.99秒",
			textRank: "★　★　★　★　★",
			textScore: "12345 分"
		},

	
	userClass="",
	userNum="",
	userGuess="",	//指向 input id="userGuess"	
	score,	
	gameFinishTime=0,	//關卡結束時間
	lastGameFinishTime=0,	//上次關卡結束時間，用來評估是否進步
	
	testType=practiceTest,		//判斷正在挑戰 finalTest 或 平日練習
	//以遊戲結束時間為 keyValue，存入 scoreSheet
	gameOverTime=new Date,	//顯示目前玩家的排行榜名次時會用到	
	
	
	

	canvas,
    ctx,	//context

	
	//當答錯時，出現的提示
	hintSprite={x:165,	y:435,	vx:0, vy:-20, text:"", visible:false },

	

	titleTextImages=[],	//存放 快打九乘九的 image
	
	//bigGlow=new Image(),	//煙火partten	
	//smallGlow=new Image(),	//煙火partten	

	gameLoop={}; 	//迴圈函式
	



 //沒有 document.onload 喔!
window.onload=function(){ 
	//alert("onload");
	initCanvas();
	userGuess=document.getElementById('userGuess');
	createAllCrads();

	
	window.addEventListener('keyup',doKeyUp,false); //為了監控 ESC
	canvas.addEventListener('click',doCanvasClick,false); //為了讓玩家切換到下一個 gameState
	addButtonsEvent();

	setBackgroundColor();//以漸層顏色塗滿背景
	
	

	loadImages();
	

};



	

function addButtonsEvent(){
	//title page
	document.getElementById("btnShowScore").addEventListener("click",doBtnShowScore);
	document.getElementById("btnNewGame").addEventListener("click",doBtnNewGame);
	//Login , choose Level
	document.getElementById("btnLogin").addEventListener("click",login);
	document.getElementById("btnNewLevel").addEventListener("click",chooseLevel);	
	//成績退步，是否存檔
	document.getElementById("btnYes").addEventListener("click", doSaveBadScoreConfirm );
	document.getElementById("btnNo").addEventListener("click" , doSaveBadScoreConfirm );
	//高分榜
	document.getElementById("btnExitHighScore").addEventListener("click", doExitHighScore);
}



function loadImages(){
	//若不載入煙火遮罩圖檔，很大一塊正方形，效果好像不賴
	//bigGlow.src= "images/big-glow.png";
	//smallGlow.src="images/small-glow.png";
	

	
	var imagesSrc=[
		"images/titleText1.png",
		"images/titleText2.png",
		"images/titleText3.png",
		"images/titleText4.png",
		"images/titleText5.png",
	];


	LoadImagesManager( imagesSrc, titleTextImages, onImagesLoad);
	
	
	function onImagesLoad(){
		//alert("圖檔載入完畢");
		switchGameState( ST_TITLE );
		procTitle();
	}
}


