/**
 * ...
 * @author ...https://github.com/corehtml5canvas/code/tree/master/ch02/example-2.20
 */



function roundedRect(cornerX, cornerY, width, height, cornerRadius) {
   if (width > 0) ctx.moveTo(cornerX + cornerRadius, cornerY);
   else           ctx.moveTo(cornerX - cornerRadius, cornerY);

   ctx.arcTo(cornerX + width, cornerY,
                 cornerX + width, cornerY + height,
                 cornerRadius);

   ctx.arcTo(cornerX + width, cornerY + height,
                 cornerX, cornerY + height,
                 cornerRadius);

   ctx.arcTo(cornerX, cornerY + height,
                 cornerX, cornerY,
                 cornerRadius);

   if (width > 0) {
      ctx.arcTo(cornerX, cornerY,
                    cornerX + cornerRadius, cornerY,
                    cornerRadius);
   }
   else {
      ctx.arcTo(cornerX, cornerY,
                    cornerX - cornerRadius, cornerY,
                    cornerRadius);
   }
}

function drawRoundedRect(strokeStyle, fillStyle, cornerX, cornerY, width, height, cornerRadius) {
   ctx.beginPath();

   roundedRect(cornerX, cornerY, width, height, cornerRadius);
   
   ctx.strokeStyle = strokeStyle;
   ctx.fillStyle = fillStyle;

   ctx.stroke();
   ctx.fill();
}

//呼叫範例
/*
drawRoundedRect('blue',   'yellow',  50,  40,  100,  100, 10);
drawRoundedRect('purple', 'green',  275,  40, -100,  100, 20);
drawRoundedRect('red',    'white',  300, 140,  100, -100, 30);
drawRoundedRect('white',  'blue',   525, 140, -100, -100, 40);		
*/


