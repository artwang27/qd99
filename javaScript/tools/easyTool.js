/**
 * ...
 * @author ...Arthur Wang
 */

//1.先在 HTML 定義一個 id= "debug" 的標籤，
//2.dumpData(obj) 傳入將想要偵查的物件內容
function dumpData(obj){
	var str=obj.toString();	
	//alert(str);
	document.getElementById("debug").innerHTML= str;
}


//內插，求出對應的 y
//已知 (x1,y1),(x2,y2) 求 (x,y) 中的 y 值
function interpolation(x,x1,x2,y1,y2){
	return (x-x1)*(y2-y1)/(x2-x1) + y1;
}


function initCanvas(){
	canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
	ctx.font = '50px Arial';
	ctx.fillStyle = 'cornflowerblue';
	ctx.strokeStyle = 'blue';
}

function clearScreen(){
	ctx.clearRect(0,0,canvas.width, canvas.height);	//清除 canvas
}	




//在 str 前端填上適當的空白，使其成為長度為 fixLength
//left_right: "left" 或 "right" 把空白加在字串左邊或右邊
function fillSpaceAt(str, fixLength, left_right ){
	var space="                                       ";
	var mixSpace="";
	if( left_right=="left" ){
		mixSpace= space + str;
		return mixSpace.slice( -fixLength );
	}else{
		mixSpace= str + space;
		return mixSpace.slice( 0, fixLength );		
	}

}


//刪除 輸入框中所有空白，並實際修改
function eatHtmlElementSpace(htmlElement){
	var elementInput= htmlElement.value;
	elementInput= elementInput.replace(/\s+/g, '');//刪除所有空白
	htmlElement.value=elementInput;
	return elementInput;
}




//設定 HTML 裡， id 為 idString 的元素，使其可見或不可見
function setHtmlObjectVisible( idString, isVisible ){
	if( isVisible ) 
		document.getElementById( idString ).style.display="block";
	else
		document.getElementById( idString ).style.display="none";	
}


//清除 HTML 的 Table 裡的 rows
//若未指定 count，將會把 table 中所有的列全部刪除
//若有指定 count,則會從最後一列開始刪回，目的是保留表頭 
function removeHTMLTableRows(htmlTable, count){
	if (typeof(count) === "undefined")
		count= htmlTable.rows.length;
		
	for(var i=0; i<count; i++){
		htmlTable.deleteRow(-1);	//刪除最後一列
	}
}	


//**********************************************************

//以平均每題答題的時間，來決定星等
//星等：2秒內5顆星，4秒內4星，6秒內3顆星，8秒內2顆星，10秒內1顆星
//超過 10 秒 沒有星
function getRankStar(sec){
	if( sec<2 )
		return "★　★　★　★　★";
	else if( sec<4 )
		return "★　★　★　★";
	else if( sec<6 )
		return "★　★　★";	
	else if( sec<8 )
		return "★　★";	
	else if( sec<10 )	
		return "★";
	else
		return "您尚未通過";
}


//以花掉多少毫秒來評估分數
//分數與根號 Time 成反比
//可能在第二次的最後時間才猜中，最大時間 maxGuessTime*2
//分數的範圍為 0~230 
function evaluateScore(ms){
	const maxBonus=230; //最多加幾分
	const sqrtMax2= Math.sqrt(maxGuessTime*2); //sqrt(1000*10*2)
	var ms2=Math.sqrt(ms); //與根號 T 成正比
	//alert(ms2);
	//注意最後兩個參數調換，可以變成反比
	return interpolation(ms2, 0,sqrtMax2,  maxBonus,0); 
}



//從 personalSheets 中，算出並回傳每一關的星等和平均時間
function getLevelRanks(){
	var levelRanks=[];//將要回傳每一關的平均時間和星等
	var cardStartId, meanT;
	var stars="";
	
	//算出 practice sheet 內， 2~9 乘法的星等
	var sheet= personalSheets.practiceTest;
	
	for(var i=0; i<8; ++i){
		cardStartId= 9*i;
		meanT = sheet.getAnswerMeanTime( cardStartId,9);	
		stars=getRankStar(meanT/1000);
		levelRanks[i]= stars;
	}

	
	//final Test 除了星等，還包含平均答題時間
	sheet= personalSheets.finalTest;
		cardStartId= 9*i;
		meanT = sheet.getAnswerMeanTime( 0, 9*8);	
		stars=getRankStar(meanT/1000);
		levelRanks[8]= stars +"　平均每題 "+ (meanT/1000).toFixed(2) +" 秒";

	

	return levelRanks;
}


//將 select 的所有選項(options)清空 
function clearHtmlSelectOptions(selObject){
	while( selObject.options.length ){
		selObject.remove(0);
	}
}
