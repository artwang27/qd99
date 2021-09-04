/**
 * ...
 * @author ...Arthur Wang
 */

 /*
	記錄所有學生的錯誤訊息，將錯誤的題目記錄到 localStorage
	包含 學號userName，錯誤題目Card.id ，日期 Date
	
	wrongSheet 是集合 WrongRecord 的陣列
 */

 
/*********************************************************************/
/*                     WrongRecord                                   */
/*********************************************************************/
 
 
 
//包含 班級，座號，錯誤題目Card.id ，日期 Date 
function WrongRecord( userClass, userNum, cardId, date ){
	this.userClass= userClass;
	this.userNum= userNum;	
	this.cardId=cardId;
	this.date=date;
}

WrongRecord.prototype.toString=function(){
	var d= new Date(this.date);
	
	return  this.userClass + " "
			+  this.userNum + " "
			+  this.cardId +" "
			+  d.getFullYear() + "/"
			+  (d.getMonth()+1) + "/"
			+  d.getDate() 	
			+ "\n";

};


/*********************************************************************/
/*                     WrongSheet                                    */
/*********************************************************************/


function WrongSheet(){
	this.dataArray=null;	//存放 WrongRecord 的陣列
}


WrongSheet.prototype.load=function(){
	this.dataArray=loadStorage("wrongSheet");
	if( ! this.dataArray ) //尚無資料
		this.dataArray=new Array();
	
};


WrongSheet.prototype.save=function(){
	saveStorage( "wrongSheet", this.dataArray );	
};


//新增一筆學生犯錯的紀錄
WrongSheet.prototype.append=function( wrongRecord ){
	this.dataArray.push( wrongRecord );	
};

//only for debug
WrongSheet.prototype.dump=function(){
	var str="";
	
	for(var i=0,len=this.dataArray.length; i<len; ++i){
		//var wrongRecord= this.dataArray[i];
		var wrongRecord= new WrongRecord( 
				this.dataArray[i].userClass,
				this.dataArray[i].userNum,			
				this.dataArray[i].cardId,			
				this.dataArray[i].date
			);
	
		str += wrongRecord.toString();
	}
	
	//document.getElementById("debug").innerHTML= str;
	return str;
};


