/**
 * ...
 * @author ...Arthur Wang
 */

/*
將所有的圖檔一起載入，並知會載入完畢
fileNames：檔名陣列
images： 載入完成後，將 Image 放入 images 陣列
onComplete：全部圖檔載入之後，將會觸發的回呼函式，請自行定義
*/
function LoadImagesManager(fileNames, images, onComplete){
	var toLoadCount= fileNames.length;
	var loadedCount=0;
	
	for(var i=0; i< toLoadCount; ++i){
		images[i]=new Image();
		images[i].src=fileNames[i];
		images[i].onload= onloadedOneFile;
	}

	function onloadedOneFile(e){
		//alert("ok");

		if( ++loadedCount== toLoadCount ){
			//alert("all done");
			onComplete();
		}
	}
	
}


//呼叫範例
/*
function loadImages(){
	var imagesSrc=[
		"image/titleText1.png",
		"image/titleText2.png",
		"image/titleText3.png",
		"image/titleText4.png",
		"image/titleText5.png",
	];

	titleTextImages=[];	//存放 快打九乘九的 image	

	var t=new LoadImagesManager( imagesSrc, titleTextImages, onImagesLoad);
	
	
	function onImagesLoad(){
		alert("圖檔載入完畢");
		switchGameState( ST_TITLE );
		procTitle();
	}
}

*/

