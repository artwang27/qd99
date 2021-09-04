/**
 * ...
 * @author ...Arthur Wang
 */

 //alert("jStorage");

const gameName="QD9x9.";


  
  

function saveStorage(key, obj){
	var fullKey=gameName+key;
	localStorage[fullKey]= JSON.stringify( obj );
}


//若是讀取失敗，將會傳回 undefine
function loadStorage(key){
	//alert("loadStorage");
	var fullKey=gameName+key;
	var str=localStorage[fullKey];
	var obj;
	
	if( str ){
		//alert("has data");
		obj= JSON.parse( str );
	}
	return obj;
}


function clearStorage(){
	localStorage.clear();
}
