/**
 * ...
 * @author ...Arthur Wang
 */
 
/* 
為了了解某位學生背誦的進度，將每個乘法所花的 [時間] 存入 個人專屬的 personalSheets，
personalSheets 包含兩張 sheet： finalSheet 及 practiceSheet
		
每個 sheet 其實只是單純的 Array(9*8)，紀錄每個乘法所耗費的時間 
timeArray[0] 紀錄算出 2*1 所花的時間， 
timeArray[1] 紀錄算出 2*2 所花的時間
timeArray[2] 紀錄算出 2*3 所花的時間... 		

 var 
	personalSheets,	//包含兩張 sheet, finalSheet 及 practiceSheet
	currentPersonalSheet, // Array(72),記錄算出每個乘法表所耗掉的時間
*/	


/*********************************************************************/
/*                       PersonalTimeArray                           */
/*********************************************************************/


//當還沒有個人遊戲紀錄時，以最爛的成績(最多的時間)填入
function PersonalTimeArray( timeArray ){
	if( timeArray ){
		this.timeArray=timeArray;
	}
	else{	//卡片從 2*1 ~ 9*9, 共 72 張	
		this.timeArray=new Array(9*8);	
		this.fillWorstDatas( 0, 9*8);
	}
}


//填入最差的成績(最慢的時間)
PersonalTimeArray.prototype.fillWorstDatas=function (cardStartId,count){ 
	var k=cardStartId;
	for(var i=0; i<count; ++i){
		this.timeArray[k++] = maxElapsedTime;
	}
};

//從 sheet 裡讀出上次的挑戰時間
PersonalTimeArray.prototype.getLastFinishTime=function (cardStartId, count){
	var k=cardStartId;
	var t=0;
	for(var i=0; i<count; ++i){
		t += this.timeArray[k++];
	}
	return t;
};




//把每一題的測驗時間寫入 sheet
PersonalTimeArray.prototype.copyElapsedTimeFromTable=function ( table ){
	for(var i=0, len=table.totalQuestions; i<len; ++i){
		var cell=table.cells[i];
		var idx= cell.card.id;
		this.timeArray[ idx ]= cell.elapsedTime;
	}
};


//算出 sheet 內，從 cardStartId 開始，共 count 筆資料，
//該學生答題的平均時間(毫秒)
//主要用在 新遊戲時，讀取舊檔資料，以評估星等
PersonalTimeArray.prototype.getAnswerMeanTime=function (cardStartId,count){ 
	var k=cardStartId;
	var ms=0;
	for(var i=0; i<count; ++i, ++k){
		ms += this.timeArray[k];
	}
	return ms/count;
};

/*********************************************************************/
/*                       PersonalSheets                              */
/*********************************************************************/


function PersonalSheets(){
	this.finalTest=null;
	this.practiceTest=null;
}


//由 localStroge 讀出的 self 已經變成普通的 object, 必須再次物件化，
//才能成為正確的 PersonalTimeArray 類別的 finalTest 和 practiceTest
PersonalSheets.prototype.load=function( userName ){
	var self = loadStorage(userName);
	if( self ){
		this.finalTest		=new PersonalTimeArray( self.finalTest.timeArray );
		this.practiceTest	=new PersonalTimeArray( self.practiceTest.timeArray );
		return true;
	}else{
		this.finalTest		=new PersonalTimeArray();
		this.practiceTest	=new PersonalTimeArray();
		return false;
	}
	
};


//記錄此次的測驗，每個題目的答題時間
PersonalSheets.prototype.save=function ( table, currentPersonalSheet ){
	var userName= getUserName(userClass,userNum);
	currentPersonalSheet.copyElapsedTimeFromTable(table);
	saveStorage( userName, this );
};



