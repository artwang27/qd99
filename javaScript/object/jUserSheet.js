/**
 * ...
 * @author ...Arthur Wang
 */

//User 類別，提供給 Admin 追蹤使用者的進度，必須關連到 
//Admin 會查詢所有的使用者
//當玩家結束時，會將 User 寫入 QD9x9.allUsers
function User( userClass, userNum, gameOverTime){
	this.userClass=userClass;
	this.userNum=userNum;
	this.gameOverTime=gameOverTime;	
}


//由 userClass, userNum 組成 userName
function getUserName(userClass, userNum){
	return userClass+ "."+ userNum
}

/*********************************************************************/
/*                       userSheet                                   */
/*********************************************************************/

//將所有的使用者，存入 UserSheets
function UserSheets(){
	this.userArray=null; //內含 User 的 Array
}

UserSheets.prototype.load=function(){
	this.userArray= loadStorage("allUsers");
	if( !this.userArray ) //若尚未有任何使用者
		this.userArray=[];
};

UserSheets.prototype.save=function(){
	if( this.userArray )
		saveStorage("allUsers", this.userArray);
	else
		alert("Save allUsers Error");
};

//若找到符合的使用者名稱，傳回其在 userArray 的索引值
//若沒有找到，傳回 -1
UserSheets.prototype.find=function(userClass, userNum){
	var index=this.userArray.length;
	while( --index >=0 ){
		if( this.userArray[index].userClass == userClass && this.userArray[index].userNum== userNum ){
			return index;
			break;
		}
	}
	return index;
};


UserSheets.prototype.addUser=function(userClass, userNum, gameOverTime){
	var newUser= new User(userClass, userNum, gameOverTime);
	this.userArray.push(newUser);
};

//當遊戲結束時，自動存給 admin，並告知最後一次的遊戲時間
//若使用者還未存在，將自動新增使用者資料
UserSheets.prototype.update=function(userClass, userNum, gameOverTime){
	var index= this.find(userClass, userNum );
	if(index >=0 ){ //若已經有使用者資料，只需更新 gameOverTime 即可
		this.userArray[ index ].gameOverTime= gameOverTime;
	}
	else{ //新增，並排序
		this.addUser(userClass, userNum, gameOverTime);
		this.userArray.sort( sortBy_Class_Num );
	}
	this.save();
};



function sortBy_Class_Num(a,b){
				var t1=a.userClass-b.userClass;
				if( t1!=0 )
					return t1;
					
				return (a.userNum-b.userNum);
}