/**
 * ...
 * @author ...Arthur Wang
 */
//alert("jsTitle");


 
 
 function procTitle(){
	//alert("procTitle");
	setHtmlObjectVisible("page_title",true);			
	drawTitle();	
 }

 

function drawTitle(){
	drawPageColor();
	for(var i=0; i<5; ++i){
		ctx.drawImage( titleTextImages[i],  40+ i* 135, 100);		
	}
	//版權
	var allRights1="GAME DESIGN: Arthur Wang. 王鐙儀製作";	
	var allRights2="©2013 LISHAN GAME CENTER. All Rights Reserved.";

	ctx.save();
	ctx.textAlign="center";
	ctx.font = "18px '微軟正黑體'";
	ctx.fillStyle = '#c19a5c';
	ctx.strokeStyle = 'f3d6a0';	
	
	ctx.fillText( allRights1 , canvas.width/2, 450);		
	ctx.fillText( allRights2 , canvas.width/2, 480);		
	ctx.restore();
	//ctx.strokeText( allRights1 , canvas.width/2, 440);		
	//ctx.strokeText( allRights2 , canvas.width/2, 480);		

}


//*******************************************
function doBtnShowScore(){
	//alert("doBtnShowScore");
	setHtmlObjectVisible("page_title",false);	
	switchGameState(ST_SHOW_HIGH_SCORE);
	procShowHighScore();
}


function doBtnNewGame(){
	//alert("doBtnNewGame");
	setHtmlObjectVisible("page_title",false);		
	switchGameState(ST_NEW_GAME);
	procNewGame();
}

