/**
 * ...
 * @author ...Arthur Wang
 */

//是否秀出此次名次 
function procShowHighScore(isShowRank){
	//clearScreen();
	drawPageColor();
	
	scoreSheet.load();
	
		
	setHtmlObjectVisible( "page_highScore", true );	
	//先按照分數排序
	scoreSheet.sortRecords();
		
	createHighScoreTable();
	var highScoreTitle=document.getElementById("highScoreTitle");	
	highScoreTitle.innerHTML="排行榜";
	
	if(isShowRank){
		var index=scoreSheet.findGameKeyIndex(gameOverTime);
		showScoreRank(index);
		highScoreTitle.innerHTML="排行榜(第 "+ (index+1) +" 名)";

	}
	

}


function doExitHighScore(){
	//alert("doExitHighScore");
	setHtmlObjectVisible( "page_highScore", false );
	switchGameState(ST_TITLE);
	procTitle();
}

function createHighScoreTable(){
	var highScoreTable=document.getElementById("highScoreList");
	removeHTMLTableRows(highScoreTable);	//清除舊有資料
	
	for(var i=0, len=scoreSheet.dataArray.length; i<len; ++i){
		var newRow=highScoreTable.insertRow(-1);	//插到最後一列
		var scoreRecord= scoreSheet.dataArray[i];
		scoreRecordToRow( scoreRecord, i, newRow );
	}
}

//將 scoreRecord 轉化成 table 內新的一列
function scoreRecordToRow( scoreRecord, index, newRow ){
	var elapsed = scoreRecord.elapsedTime/1000;	//挑戰完成時花了幾秒
	var cell1=newRow.insertCell(0),
		cell2=newRow.insertCell(1),
		cell3=newRow.insertCell(2),
		cell4=newRow.insertCell(3);

	cell1.innerHTML= "第" + fillSpaceAt( index+1, 3, "left" ) + "名";
	cell2.innerHTML= scoreRecord.userClass +" "+  scoreRecord.userNum;
	cell3.innerHTML= scoreRecord.score;
	cell4.innerHTML= elapsed.toFixed(2);
/*	
	cell1.style.textAlign="center";
	cell2.style.textAlign="center";
	cell3.style.textAlign="center";
	cell4.style.textAlign="center";	
*/	
	cell1.align="center";
	cell2.align="center";	
	cell3.align="center";	
	cell4.align="center";
	
}




//在 HTML table 內，將此次的名次做出改變，例如改變底色
/*
table 和 tbody 都有 rows 屬性，而且是對各自而言
例如有一列 <theard><tr><th>... ，之後緊接著 tbody
table.rows[1] 會指到 tbody 的首列
此時， table.rows[1]= tbody.rows[0]
*/
function showScoreRank(index){
	var highScoreTable=document.getElementById("highScoreList");
	var rowData= highScoreTable.rows[index].cells; //取出一整列
	//rowDta 裡的每個 cell 都要設定
	for(var i=0, len=rowData.length; i<len; i++){
		//rowData[i].innerHTML="Arthur";	
		rowData[i].style.background="red";
	}
	
}


