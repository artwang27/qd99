/**
 * ...
 * @author Arthur Wang...
 */

 
function Card(id){
	this.id=id; //也代表在 cards 陣列中的位置 
	this.num1= 2+ Math.floor(id/9);	//被乘數
	this.num2= 1+ Math.floor(id%9);	//乘數
	this.prod= this.num1* this.num2;	//積
	this.text= this.num1+ " x "  +this.num2 ;	//題目字串，例如： "9 x 8"
}


function createAllCrads(){
	const totalCards=9*8;	//卡片從 2*1 ~ 9*9, 共 72 張	
	cards=new Array(totalCards);			
	for(var i=0; i<totalCards; ++i)
		cards[i]=new Card(i);
	
}




