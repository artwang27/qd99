/**
 * ...
 * @author ... Arthur Wang
 */

// check input key  
//********************************************************
function checkKey(e){
	//alert("keyPress");
    var keyCode = window.event ? e.keyCode : e.which;
    //alert(keyCode);	
	
	if( keyCode == 13){ //按下 Enter 鍵
		//alert("Press Enter");
		currentQuestion.checkAnswer();
		return false;
	}else{
		return isNumberKey(keyCode);
		
	}
	
}


function isNumberKey(keyCode)
{
	const BACK_SPACE=8; //keyCode=8, 代表按下倒退鍵

    if( (48<=keyCode && keyCode<=57) || keyCode == BACK_SPACE ){
        return true;
    }else {
        //document.getElementById("tip").innerHTML = "提示：只能輸入數字！";
        return false;
    }
}   


function doKeyUp(evt){
	//alert("keyup");
	const KEY_ESC=27;
	//const KEY_SPACE=32;
	var key = evt.keyCode;
	switch( key ){
		case KEY_ESC:	//ESC
			//alert("ESC");			
			
			if(currentGameState== ST_PLAY_LEVEL && confirm("確定要離開遊戲？") ){
					exitPlay();
			}	
			
			break;
			
	}//end switch

}//end fn


function doCanvasClick(evt){
	//alert("click");
	if( currentGameState==ST_GAME_OVER ){
		doGameOverClick(evt);
	}

}//end fn


