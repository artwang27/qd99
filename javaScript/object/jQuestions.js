/**
 * ...
 * @author ...Arthur Wang
 */

// Questions
/*	questions 一開始與 table 相同，但等一下會洗牌
	questions 是一個陣列，每個元素都是 Cell
	questions 陣列，是集合將要考的題目，當答對或答錯時動態增減，
	與 table 不同， table 會固定在螢幕上，呈現該題答對或答錯的狀態
*/
//********************************************************


/*********************************************************************/
/*                       Questions                                   */
/*********************************************************************/


function Questions(){
	this.qArray=[]; //cells Array
	this.isOver=false;	//讓動畫畫面判斷是否還要顯示 血條，問題和輸入框
	this.autoQuestion=null; //自動出題的 setTimeout 定時器
}


//從哪一題開始考，共幾題
//questions 一開始與 table 相同，但等一下會洗牌
Questions.prototype.createAll= function(table){
	this.qArray.length=0;
	for(var i=0, len=table.totalQuestions; i<len; ++i){
		this.qArray.push( table.cells[i] );
	}
	
	this.shuffle(); //重新排列題目	
}

//洗牌，重新排列題目
Questions.prototype.shuffle=function(){
	var total= this.qArray.length;
	for(var i=0; i<total; ++i){
		var k=Math.floor( Math.random()* total );
		//swap i,k
		var temp= this.qArray[i];	
		this.qArray[i]=this.qArray[k];
		this.qArray[k]=temp;
	}
	
};





Questions.prototype.next=function(){
	//alert('nextQuestion');
	
	if( this.qArray.length==0 ){
		this.over();
		
	}else{
		var cell = this.qArray.pop();
		currentQuestion.setNew(cell);
	}
	
};


//把錯的題目再考一次
Questions.prototype.retakeQuestion= function ( question ){
	this.qArray.unshift( question.cell );	//加到陣列最前端
};






//停止出現問題，血條及 使用者輸入框
Questions.prototype.over=function(){
	this.isOver=true;
	userGuess.disabled = true;//禁止重複按下 Enter	
	setHtmlObjectVisible("userGuess", false );		
	
	var delayTime=3000; //三秒後切換畫面，此時動畫差不多秀完
	setTimeout( function(){	
		switchGameState( ST_PLAYER_DIE );			
		}
		, delayTime );	
	
};