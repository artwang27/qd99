/**
 * ...
 * @author ...Arthur Wang	
 */

 var pageColor; //only use in this file
 //alert("jColors");
 
 
 function setBackgroundColor(){
	//alert("setColors"); 
	pageColor = ctx.createLinearGradient(0,0,0, canvas.height);
	pageColor.addColorStop( 0, "rgb(16,16, 8);");		
	pageColor.addColorStop( 0.1, "rgb(60,50,40);");			
	pageColor.addColorStop( 0.5, "rgb(90,80,60);");	
	pageColor.addColorStop( 0.9, "rgb(60,50,40);");		
	pageColor.addColorStop( 1, "rgb(16,16, 8);");			
 }
 
 
 function drawPageColor(){
	ctx.save(); 
	ctx.fillStyle=pageColor;
	ctx.fillRect(0,0, canvas.width, canvas.height);
	ctx.restore();
	//alert("drawPageColor");	
 }
 
