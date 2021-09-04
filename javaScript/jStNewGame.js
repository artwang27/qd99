/**
 * ...
 * @author ...Arthur Wang
 */




function procNewGame(){
	//alert("new Game");
	//clearScreen();
	drawPageColor();
	
	setHtmlObjectVisible("page_newGame", true);
	
	wrongSheet.load();
	scoreSheet.load();
		
	//ready for login();
}

function login(){
	userClass=eatHtmlElementSpace( document.getElementById('userClass') );
	userNum  =eatHtmlElementSpace( document.getElementById('userNum') );	

	personalSheets.load( getUserName(userClass, userNum) );

	switchGameState(ST_NEW_LEVEL);
	procNewLevel();	
}


