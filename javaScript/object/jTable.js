/**
 * ...
 * @author ...Arthur Wang
 */

 /*
 將要出現的考題呈現在螢幕中間，稱作 Table
 Table 是由 Cell 所構成的陣列，
 Cell 內含 Crad，透過 Card 顯示題目
 Cell 亦包含：這題是否已經答對，花了幾秒才答對，及已經挑戰幾次...等訊息
 
 	Cell.passValue：記錄是否答對，在繪製 table 時會參考到，決定每一個 cell 的顏色 
		passValue=0 代表尚未決定，可能還沒考，或是還有一次機會
		passValue=1 答對了
		passValue=2 兩次都答錯，沒機會了
 */

 
/*********************************************************************/
/*                          table                                    */
/*********************************************************************/

 
 //Table 是由 Cell 所構成的陣列
function Cell(aCard,x,y){
	this.card=aCard;
	this.x=x;
	this.y=y;
	this.elapsedTime=maxElapsedTime;	//先設定成最大耗時
	this.tryCount=0;	//這張卡已經挑戰了幾次
	this.passValue=0;	//是否答對， v=0 代表尚未決定，
	
}

/*********************************************************************/
/*                          QTable                                   */
/*********************************************************************/

//QuestionTable
function QTable(){
	this.cells=null;  //由 Cell 所構成的陣列
	this.totalQuestions=0;	//共幾題
}

QTable.prototype.reset= function(cardStartId, totalQuestions){
	var count; 	//共幾題	
	var x,y; 	//題目出現在螢幕的位置 
	
	this.cells=[];	//刪除舊的元素	
	this.totalQuestions= totalQuestions;
	
	y= (totalQuestions==9) ? 200 : 60;	//以題數多寡，決定 y 座標起始位置
	
	var k=cardStartId;
	var col, space=Math.round(750/11);
	
	for(var i=0; i<totalQuestions; i++, k++){
		col= i % 9;
		x= (col+1) * space;
		if( col== 0) y+=30;				
		
		var aCard= cards[k];
		var cell=new Cell( aCard ,x, y);
		this.cells.push( cell );
	}

};


//取出完成 table 的總時間，
//總時間是以累積每題的時間而來的，並且不包含動畫過場時間
//它 並非 只是單純的記下起始和終結時間，所以可以安心使用
QTable.prototype.getFinishTime=function (){
	var t=0;
	for(var i=0, len=this.totalQuestions; i<len; ++i)
		t += this.cells[i].elapsedTime;

	return t;
};


//查看總共錯了幾題
QTable.prototype.getWrongAnswerCount=function(){
	var c=0;
	for(var i=0, len=this.totalQuestions; i<len; ++i)
		if( this.cells[i].passValue==2 ) 	//有錯誤
			c++;

	return c;
};


/*以 Cell.passValue 決定要畫 普通的， 亮一點的， 或暗沉的顏色
	分別代表     尚未確定(還有機會)， 已答對  ， 兩次都答錯了
顏色存放在  passColors[3][3];  
	索引1 是色系(順序為紅綠藍)，
	索引2 是 passValue 所記錄的明暗程度
*/

QTable.prototype.draw=function(){
	//alert("drawTable");
	//以 cell.passValue 決定要畫 亮一點的，普通的或暗沉的顏色
	const passColors=[
		[ "rgb(157,29,0)", 		"rgb(255,50,20)",	"rgb(123,29,1)" ],	//R
		[ "rgb(67,129,22)", 	"rgb(8,239,65)",	"rgb(21,91,19)" ],	//G
		[ "rgb(42,115,134)",	"rgb(66,198,225)",	"rgb(12,28,105)" ]	//B	
	];
	
	ctx.save();
	ctx.textAlign="left";
	ctx.font="20px Arial";	
	ctx.lineWidth=2;
	ctx.strokeStyle="rgb(15,15,15)";	//外框


	var id= this.cells[0].card.id;	
	for(var i=0,len=this.totalQuestions; i< len; ++i){
		var cell=this.cells[i];		
		var row=  Math.floor(id++ /9 ) ;	//決定顏色循環，RGB 的索引值
		
		//drawCell
		ctx.fillStyle= passColors[row % 3][ cell.passValue ];
		ctx.fillRect(cell.x, cell.y, 60,25);
		ctx.strokeRect(cell.x, cell.y, 60,25);
		
		ctx.fillStyle="rgb(64,64,64)";	//灰色
		ctx.fillText(cell.card.text, cell.x+10, cell.y+20);	
	}
	ctx.restore();

	
};

/*********************************************************************/
/*********************************************************************/

 