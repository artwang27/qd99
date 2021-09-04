/**
 * ...
 * @author ...Arthur Wang
 */

function procPlayerDie(){
	//alert("procPlayerDie");
	//gameOver();			
	
	//clearInterval(gameLoop);
	
	score=Math.round(score);	
	gameFinishTime=table.getFinishTime();
	saveDatasForAdmin();

	initGameOver(); 
	switchGameState( ST_GAME_OVER );	
	//procGameOver();
	
}

//提供管理者了解學生狀況：  寫入
//1.所有的錯誤題目
//2.排行榜	
//不包含個人的 gamSheet
function saveDatasForAdmin(){
	wrongSheet.save();	//將所有的錯誤題目寫入
	
	//更新 QD9x9.allUsers 資料
	var allUsers=new UserSheets();
	allUsers.load();
	allUsers.update( userClass, userNum, gameOverTime );
	
	
	//只有挑戰 finialTest 才會增加分數紀錄
	if(	testType == finalTest ){
		gameOverTime=new Date;
		scoreSheet.append( new ScoreRecord(userClass, userNum, score, gameFinishTime, gameOverTime)  );
		scoreSheet.save();
	}
}


