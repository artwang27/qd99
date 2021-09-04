/**
 * ...
 * @author ...Arthur Wang
 */



/*********************************************************************/
/*                     ScoreRecord                                   */
/*********************************************************************/



//ScoreRecord 有 學生號碼，分數， 總答題時間，測驗日期
function ScoreRecord(userClass, userNum, score, elapsedTime, date){
	this.userClass =userClass;
	this.userNum =userNum;	
	this.score= score;
	this.elapsedTime= elapsedTime;
	this.date=date;
}


ScoreRecord.prototype.toString=function (){
	var elapsed = this.elapsedTime/1000;	//挑戰完成時花了幾秒
	//var d= new Date(scoreRecord.date);
	//var d= scoreRecord.date;

	//調整成指定的欄位長度
	var fixUserClass= fillSpaceAt( this.userClass, 4, "left");
	var fixUserNum= fillSpaceAt( this.userNum, 8, "left");	
	var fixScore= fillSpaceAt( this.score, 6, "right");
	var fixTime = fillSpaceAt( elapsed.toFixed(2), 10, "right");
	
	return  fixUserClass
			+  fixUserNum
			+  fixScore 
			+  fixTime + "秒完成"
			
			//+ " " +d
			//+ "<br />";
			+ "\n";
};


/*********************************************************************************
scoreSheet 是一個由 ScoreRecord 所構成的陣列，內含每次 Final Test 的成績
//scoreSheet 存入每次 Final Test 的成績
*********************************************************************************/


function ScoreSheet(){
	this.dataArray=null;	//由 ScoreRecord 所構成的陣列，內含每次 Final Test 的成績
}


ScoreSheet.prototype.load=function(){
	this.dataArray=loadStorage("scoreSheet");
	if( ! this.dataArray )	//尚無資料
		this.dataArray=new Array();

};

ScoreSheet.prototype.save=function(){
	saveStorage( "scoreSheet", this.dataArray );	
};


ScoreSheet.prototype.append=function(scoreRecord){
	//var scoreRecord=new ScoreRecord(userName, score, elapsedTime, date);
	this.dataArray.push( scoreRecord );
};


//以 gameOverTime 為 keyWord ，找出在 ScoreSheet 的哪一筆紀錄裡
// gameOverTime 為 Date 型態
ScoreSheet.prototype.findGameKeyIndex=function( gameOverTime ){
	var index=-1;
	var keyValue= (+gameOverTime); //將日期型態轉為數字
	for(var i=0, len=this.dataArray.length; i<len; i++){
		var itemData= +new Date( this.dataArray[i].date );
		if(  itemData == keyValue){
			index=i;
			break;
		}
	}
	
	return index;
};


//按照分數排序
ScoreSheet.prototype.sortRecords=function(){

	this.dataArray.sort( function(a,b){ 
			var v=b.score-a.score;
			if( v==0){	//若分數相同
				//再以最近的日期為優先
				var a2 = Date.parse( a.date );	
				var b2 = Date.parse( b.date );	
				return( b2-a2 );
			}
			else
				return v;
		});
	
};


ScoreSheet.prototype.dump=function(){
	//alert("dumpScoreSheet");
	var str="";
	this.sortRecords();	//先按照分數排序
	
	for(var i=0, len=this.dataArray.length; i<len; ++i){
		var scoreRecord= this.dataArray[i];
		str += "第" + fillSpaceAt( i+1, 2, "right" )  
			+ "名  " + scoreRecord.toString();
	}
	return str;
};

