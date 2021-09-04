/**
 * ...
 * @author ...Arthur Wang
 */
 

 
function procPlayerStart(){
	setHtmlObjectVisible("userGuess", true );			
	userGuess.focus();	//設定輸入框焦點，若要取消焦點，用 blur()		
	userGuess.value="";
	
	questions.isOver=true;	//當 questions.isOver 時，不會畫出題目和血條
	Fireworks.initialize(); //它會自動清除上次遺留下來的 particles
	score=0;

	//兩秒後開始挑戰
	setTimeout( function(){  
			questions.next();	
			questions.isOver=false;			
		},2000);
	
	switchGameState(ST_PLAY_LEVEL);	
	//procPlayLevel();	//強迫 update, 將題目顯現出來
	gameLoop=setInterval( runGame, 33 );		
}


//當按下 ESC 鍵，會自動呼叫此程序
function exitPlay(){
	setHtmlObjectVisible("userGuess", false );		
	clearInterval(gameLoop);
	switchGameState( ST_TITLE );
	procTitle();
	//alert("EXIT");			
}