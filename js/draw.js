

$(window).ready(function() {

    //Canvas
    context = document.getElementById('canvas').getContext("2d");

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
    // Clears the canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); 

    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 20;

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
}

});


