/**
 * ...
 * @author ...Arthur Wang
 */

  
 const ST_TITLE=0;
 const ST_NEW_GAME=1;
 const ST_NEW_LEVEL=2;
 const ST_PLAYER_START=3;
 const ST_PLAY_LEVEL=4;
 const ST_PLAYER_DIE=5;
 const ST_GAME_OVER=6;
 const ST_SHOW_HIGH_SCORE=7;
 var currentGameState=0;
 var currentGameStatePROC=null;	//目前 state 將會自動呼叫的程序名稱
 
 
 
 function runGame(){	//每個 frame 都會呼叫的主函式
	 currentGameStatePROC();
 }

 function switchGameState(newState){
	//alert("switchGameState");
	//alert(newState);		 
	currentGameState=newState;
	switch( currentGameState ){
		
		case ST_TITLE:
			currentGameStatePROC= procTitle;
			break;
		case ST_NEW_GAME:
			currentGameStatePROC= procNewGame;
			break;
		case ST_NEW_LEVEL:
			currentGameStatePROC= procNewLevel;
			break;
		case ST_PLAYER_START:
			currentGameStatePROC= procPlayerStart;
			break;
		case ST_PLAY_LEVEL:
			currentGameStatePROC= procPlayLevel;
			break;
		case ST_PLAYER_DIE:
			currentGameStatePROC= procPlayerDie;
			break;
		case ST_GAME_OVER:
			currentGameStatePROC= procGameOver;
			break;
		case ST_SHOW_HIGH_SCORE:
			currentGameStatePROC= procShowHighScore;
			break;
	}

 }
 
 //在 window.onload 完成後，將底下兩行程式加入 onload 之內
 
 //	switchGameState( ST_TITLE );
 //	setInterval( runGame, 33 );
 
