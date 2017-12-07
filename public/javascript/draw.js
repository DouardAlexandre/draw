

$(window).ready(function() {


    //Canvas
    var canvas = document.getElementById('canvas'),
    context = canvas.getContext("2d");

    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw(); 
    }
    resizeCanvas();

    function draw() {
      //Mouse down event
      $('#canvas').mousedown(function(e){
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;

        paint = true;

        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
      });

      //Mouse move event
      $('#canvas').mousemove(function(e){
        if(paint){
          addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
          redraw();
        }
      });

      //Mouse leave event
      $('#canvas').mouseup(function(e){
        paint = false;
      });
      //Save click position 
      let clickX = new Array();
      let clickY = new Array();
      let clickDrag = new Array();
      let paint;

      function addClick(x, y, dragging){
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
      }
      function redraw(){
        // Clears the canvas x, y, width, height
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); 

        context.strokeStyle = "#df4b26";
        context.lineJoin = "round";
        context.lineWidth = 10;

        for(var i=0; i < clickX.length; i++) {        
          context.beginPath();
          if(clickDrag[i] && i){
            context.moveTo(clickX[i-1], clickY[i-1]);
          }else{
           context.moveTo(clickX[i]-1, clickY[i]);
         }
         context.lineTo(clickX[i], clickY[i]);
         context.closePath();
         context.stroke();
       }

        }//end redraw

 // $("#gomme").click(function() {
 //        canvas.drawColor(0, Mode.CLEAR);
 //    });

 
};//end function draw()

});//end win ready



