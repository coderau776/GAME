const canvas = document.getElementById('ufocan');
canvas.width = 900;
canvas.height = 750;
const ctx = canvas.getContext('2d');
function resize() {
    // Our canvas must cover full height of screen regardless of the resolution
    const height = window.innerHeight - 20;
  
    // So we need to calculate the proper scaled width that should work well with every resolution
    const ratio = canvas.width / canvas.height;
    const width = height * ratio;
  
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  }
  window.addEventListener('load', resize, false);

  function GameBasics(canvas) {

    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    
  
    // active playing field
    this.playBoundaries = {
      top: 150,
      bottom: 650,
      left: 100,
      right: 800
    };

    //initial values
    this.level=1;
    this.score=0;
    this.shields=2;

  
    // game settings
    this.setting = {
      //FPS: 60 frame per 1 second, this means 1 new frame in every 0,01666667 seconds  
      updateSeconds: (1/60), 
      spaceshipSpeed: 200,
      bulletSpeed: 300,
      bulletMaxFrequency:500,
      ufoLines:4,
      ufoColumns:8,
      ufoSpeed:35,
      ufoSinkingValue: 30,

      bombSpeed:75,
      bombFrequency:0.05,

      pointsPerUfo:25,
    };
  
    // we collect here the different positions, states of the game 
    this.positionContainer = [];
    this.pressedKeys={};
  }

  

  GameBasics.prototype.presentPosition = function () {
    return this.positionContainer.length > 0 ? this.positionContainer[this.positionContainer.length - 1] : null;
};

GameBasics.prototype.goToPosition = function (position) {
    // If we're already in a position clear the positionContainer.
    if (this.presentPosition()) {
      this.positionContainer.length = 0;
    }
    // If we finds an 'entry' in a given position, we call it. 
    if (position.entry) {
      position.entry(play);
    }
    // Setting the current game position in the positionContainer
    this.positionContainer.push(position);
  };

  GameBasics.prototype.pushPosition = function (position) {
    this.positionContainer.push(position);
  };
  
  // Pop the position from the positionContainer
  GameBasics.prototype.popPosition = function () {
    this.positionContainer.pop();
  };

  GameBasics.prototype.start = function () { 
    //Specify the interval in milliseconds 
    setInterval(function () { gameLoop(play); }, this.setting.updateSeconds * 1000); 
    this.goToPosition(new OpeningPosition());
  }

  GameBasics.prototype.keyDown= function(keyboardCode){
    this.pressedKeys[keyboardCode]=true;
    if(this.presentPosition() && this.presentPosition().keyDown)
    {
      this.presentPosition().keyDown(this,keyboardCode);
    }
};

GameBasics.prototype.keyUp=function(keyboardCode){
    delete this.pressedKeys[keyboardCode];
};

function gameLoop(play){
    let presentPosition= play.presentPosition();
    if(presentPosition){
        //update
        if(presentPosition.update)
        {
            presentPosition.update(play);
        }
        //draw
        if(presentPosition.draw)
        {
            presentPosition.draw(play);
        }
    }

}
window.addEventListener("keydown", function(e) {
    const keyboardCode=e.which || event.keyCode;
    if(keyboardCode==37 || keyboardCode==39 || keyboardCode==32)
    {
        e.preventDefault();
    }
    play.keyDown(keyboardCode);
});
window.addEventListener("keyup",function(e){
  const keyboardCode = e.which || event.keyCode;
  play.keyUp(keyboardCode);
});
const play = new GameBasics(canvas);
play.start();
