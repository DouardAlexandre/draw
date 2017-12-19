'use strict';

(function() {
  //connection entre serveur et client
  var socket = io.connect();

  function init() {
   const buttons = document.querySelectorAll('button[data-mode]');
   for(const button of buttons) {
      //console.log(button);
      button.addEventListener('click', handleRoomClick); 
    }

  }
  

  

  document.addEventListener("DOMContentLoaded", init);
  var canvas = document.getElementById('canvas');
  var colors = document.getElementsByClassName('color');
  var context = canvas.getContext('2d');

  var current = {
    color: 'black'
  };
  var drawing = false;

  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mouseout', onMouseUp, false);
  canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

  for (var i = 0; i < colors.length; i++){
    colors[i].addEventListener('click', onColorUpdate, false);
  }

  socket.on('drawing', onDrawingEvent);

  window.addEventListener('resize', onResize, false);
  onResize();
  




  function handleRoomClick() {


    const start = this.getAttribute('data-mode');

    socket.emit('start', start);
    
    
    // deal with interface below...
    const buttons = document.querySelectorAll('button[data-mode]');
    for(const button of buttons) {
      button.classList.add('hidden');
    }

    //chez 2 dessiner show devinez:------
    socket.on('guess', (guess) => {

      console.log(guess);
      //$("#canvas").css('display' , 'none');
      var newGuess  = document.createElement('h2');
      newGuess.className = 'guess'; 
      document.body.appendChild(
        newGuess).textContent = guess;
    });

    //chez 1
    socket.on('wait', (wait) => {
      //wait player
      var waitOtherPlayer = document.createElement('h2');
      waitOtherPlayer.className = 'wait'; 
      document.body.appendChild(waitOtherPlayer).textContent = wait;
      //input guess
      var input = document.createElement('input');
      input.type = "text";
      input.id = "input";
      $(".content").append(input);
      //button guess
      var devinez = document.createElement('button');
      devinez.id = "devinez";
      devinez.innerHTML = "OK";
      $(".content").append(devinez);
    });
   //chez 1 devinez enleve wait && show input button
   socket.on('noWait', (randWord) => {

    $(".wait" ).remove();
    $("#input").css("display", "block");
    $("#input").show().focus();
    $("#devinez").show();

    $("#devinez").click(function(){
      var textInput = $("input").val();
      socket.emit('textInput', textInput, randWord);

    });





  });

   socket.on('wrong', (randWrong) => {
    $(".wrong").remove();
    var wrongWord = document.createElement('h2');
    wrongWord.className = 'wrong';
    wrongWord.innerHTML = randWrong;
    $(".content").append(wrongWord);


  });


   socket.on('end', (end) => {

     $(".wrong").remove();
     $("#input").remove();
     $("#devinez").remove();
     $(".guess").remove();
     $(".wait" ).remove();
     $(".victoire" ).show();
     
     
   });

 };

 function drawLine(x0, y0, x1, y1, color, emit){
  context.beginPath();
  console.log('current : ', current.color[0]);
  console.log('color : ', color);

  if(color[0] === "transparent" ) {

   context.globalCompositeOperation= "destination-out";
   context.strokeStyle = "rgba(0,0,0,1)";
   context.lineWidth = 25;
   context.moveTo(x0, y0);
   context.lineTo(x1, y1);
   //context.strokeStyle = color;
 }else{
  context.globalCompositeOperation="source-over";
  context.moveTo(x0, y0);
  context.lineTo(x1, y1);
  context.strokeStyle = color;
  context.lineWidth = 3;
}

context.stroke();
context.closePath();

if (!emit) { return; }
var w = canvas.width;
var h = canvas.height;

socket.emit('drawing', {
  x0: x0 / w,
  y0: y0 / h,
  x1: x1 / w,
  y1: y1 / h,
  color: color
});
}

function onMouseDown(e){

  drawing = true;
  current.x = e.clientX;
  current.y = e.clientY;
}

function onMouseUp(e){
  if (!drawing) { return; }
  drawing = false;
  drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
}

function onMouseMove(e){
  if (!drawing) { return; }
  drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
  current.x = e.clientX;
  current.y = e.clientY;
}

function onColorUpdate(e){

  current.color = e.target.className.split(' ');
  console.log(current.color);
  if(current.color[0] === "transparent" ) {
   $('html').css('cursor','url(../img/eraser.png), wait');
 }else{
  //$('html').css('cursor','default');
  $('html').css('cursor','url(../img/crayon.png), wait');
}

}

  // limit the number of events per second
  function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  function onDrawingEvent(data){
    var w = canvas.width;
    var h = canvas.height;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
  }

  // make the canvas fill its parent
  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

})();