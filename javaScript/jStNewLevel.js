/**
 * ...
 * @author ...Arthur Wang
 */

//alert("jNewLevel");


function procNewLevel(){
	makeLevelSelectItems();
	setHtmlObjectVisible("div_selectLevel",true);
}


function chooseLevel(){
	var selectLevel=document.getElementById("selectLevel");
	var level=selectLevel.value;

	if ( level>=1 && level<=9){
		setHtmlObjectVisible("div_selectLevel",false);	
		setHtmlObjectVisible("page_newGame",false);				
		setLevel( level );
	}
}


//挑戰第幾個 level
//level=1：Final Test
//level=2：2 的乘法
//level=3：3 的乘法...
function setLevel(level){
	//alert("setLevel");		
	var totalQuestions;	//共幾題
	
	if( level==1){	//final test
		testType=finalTest;
		totalQuestions=9*8;		
		cardStartId= 0; //找出第一張卡		
		currentPersonalSheet= personalSheets.finalTest; 
	}
	else{
		testType=practiceTest;		
		totalQuestions=9;
		cardStartId= (level-2)*9; //找出第一張卡		
		currentPersonalSheet= personalSheets.practiceTest; 
	}
	
	table.reset(cardStartId, totalQuestions);	//製造螢幕中間的可視化題目	
	questions.createAll( table );	//製造題目	

	
	lastGameFinishTime = currentPersonalSheet.getLastFinishTime( cardStartId, totalQuestions);
	
	switchGameState(ST_PLAYER_START);	
	procPlayerStart();	
}

function makeLevelSelectItems(){
	var selectLevel=document.getElementById("selectLevel");
	clearHtmlSelectOptions(selectLevel);
	//alert("ok");			
	
	var levelTexts=["----- 乘法 2 -----","----- 乘法 3 -----","----- 乘法 4 -----",
					"----- 乘法 5 -----","----- 乘法 6 -----","----- 乘法 7 -----",
					"----- 乘法 8 -----","----- 乘法 9 -----","=== Final Test ==="];
					
	var levelValues=[2,3,4,5,6,7,8,9,1];
	var levelRanks=getLevelRanks();
		
	for(var i=0, len=levelTexts.length; i<len; ++i){
		var optText= levelTexts[i]+ levelRanks[i];
		var opt=new Option( optText , levelValues[i] );
		selectLevel.options.add( opt );
		
	}
		
		
}
