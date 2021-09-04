/**
 * ...
 * @author ...Arthur Wang
 */

 

//只有平日練習，才會出現動畫
//依照答對或答錯製作動畫效果
function makeCheckingAnswerAnimate(	isMatchAnswer, deltaScore ){
	if( isMatchAnswer ) {
		//將煙火射向 table 中，此問題的位置
		makeFirework( currentQuestion, deltaScore );
	}
	else{ //顯示正確解答
		setHintSprite();
	}

	//多久之後考下一題
	var delayTime=100;

	setTimeout( function(){	
				questions.next();
			}
		, delayTime );	
		
}

//設定答錯時，出現的提示
function setHintSprite(){
	var delayTime=500; //多久之後提示會消失
	
	hintSprite.visible=true;
	hintSprite.x=165;
	hintSprite.y=435;
	hintSprite.text=currentQuestion.text+" = "+ currentQuestion.cell.card.prod;
	
	setTimeout( function(){
			hintSprite.visible=false;
		}
		, delayTime );	
	
}


//製造煙效果
	//故意連結到爆炸要射向的 Cell,而非只是記錄 currentQuestion
	//因為在做爆炸動畫時，currentQuestion 已經指向下一題了
function makeFirework( currentQuestion, deltaScore ){
	var boomCell=currentQuestion.cell; 

	var newParticle=Fireworks.createParticle(
			// position 輸入答案的下方
				{ 	x: canvas.Width * 0.8,  y: canvas.height + 10},
			//target 指向 table 內，答對的那一題
				{	x: currentQuestion.cell.x+30,	y:currentQuestion.cell.y+12	},
			// velocity
				{	x: Math.random() * 3 - 1.5, y: 0 }
		);
			

	newParticle.onBoom = function(){
			//alert(boomCell.card.text);
			boomCell.passValue=1;//答對，通過
		};
			
	
}



