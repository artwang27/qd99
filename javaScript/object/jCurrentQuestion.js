/**
 * ...
 * @author ...
 */
 
 function CurrentQuestion(){
	this.cell=null; 	//從 table 取出哪一個 cell
	this.startTime=0;	//每一題開始時間
	this.text="";		//題目字串，例如： "9 x 8"
	this.x=165;		//題目出現在螢幕的座標
	this.y=435;
 }

 
CurrentQuestion.prototype.setNew=function( cell ){
	//alert("setNewQuestion");	
	userGuess.disabled = false;//恢復輸入，剛剛可能被禁用	
	userGuess.value="";
	userGuess.focus();	//設定輸入框焦點，若要取消焦點，用 blur()		

	this.cell = cell;
	this.cell.tryCount++; //紀錄這題考過幾次
	this.text= this.cell.card.text; //只是為了方便讀取，不必透過那麼多物件屬性
	this.startTime = +new Date();

	//十秒後，自動檢查答案，並準備出下一題
	var delayTime = maxGuessTime;
	questions.autoQuestion =setTimeout( function(){	
				//注意：不是 this.checkAnswer(); 喔!
				//因為此時 this = window 
				currentQuestion.checkAnswer();
			}
		, delayTime );	
	
};



CurrentQuestion.prototype.isMatchAnswer=function (){
	return ( this.cell.card.prod == parseInt(userGuess.value) );
};


CurrentQuestion.prototype.checkAnswer=function (){
	clearTimeout( questions.autoQuestion); //取消自動出題器
	
	var now= +new Date;
	var elapsedTime= now - this.startTime;	
	var deltaScore=0;
	var isMatch= this.isMatchAnswer();
	
	if( isMatch ) 
		deltaScore= this.correct( elapsedTime );
	else	//猜錯了
		this.wrong(now);
	
	//製作動畫效果
	makeCheckingAnswerAnimate(	isMatch, deltaScore );
	userGuess.disabled = true;//禁止重複按下 Enter	
};




//第二次才猜中，時間是 10+elapsedTime;
//deltaScore 的範圍為 0~230 
CurrentQuestion.prototype.correct=function(elapsedTime){
	//alert("猜中了");
	//score , time 與猜的次數有關	
	//若第一次就猜中，不會被加秒
	//若第二次才猜中，會被多加 10 秒	
	var guessT = elapsedTime + (this.cell.tryCount-1)*maxGuessTime;
	var deltaScore= evaluateScore( guessT );  
	score += deltaScore;
	
	this.cell.elapsedTime = guessT; //範圍 0~20 秒
	//this.cell.passValue=1;//通過
	return deltaScore;
};


//第二次還沒猜中，時間是 maxElapsedTime
CurrentQuestion.prototype.wrong=function(now){
	//alert("猜錯了");	
	this.cell.elapsedTime=maxElapsedTime;	//以最差的成績填入
	wrongSheet.append( new WrongRecord(userClass, userNum, this.cell.card.id, now ) );
	
	//平日練習時，若是有錯，這題最後還要再重考一次
	if( this.cell.tryCount < maxQuestionTry  && testType==practiceTest ){
		this.cell.passValue=0;	//尚未決定對錯
		questions.retakeQuestion( this );	//這題要再重考一次		
	}
	else{	//finalTest 或者 已經錯太多次了！ 那就沒機會了
		this.cell.passValue=2;	//兩次都錯
	}
};





