function PausePosition(){

}
PausePosition.prototype.draw =function(play){
    ctx.clearRect(0,0,play.width,play.height);
    ctx.font = "400px Comic Sans MS";
    ctx.fillStyle = '#ffffff';
    ctx.textAlign="center";
    ctx.fillText("Paused",play.width/2,play.height/2-40,500,50);
}
PausePosition.prototype.keyDown =function(play,keyboardCode){
    if(keyboardCode==80)
    {
        play.popPosition();
    }
    if(keyboardCode==27)
    {
        play.pushPosition(new OpeningPosition());
    }
}