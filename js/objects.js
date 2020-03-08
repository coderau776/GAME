function Objects(){
    
};

Objects.prototype.spaceship=function(x,y,img){
    this.x=x;
    this.y=y;
    this.height=28;
    this.width=34;
    this.img =img;
    this.img.src="images/ship.png";
    return this;
};

Objects.prototype.bullet = function(x,y){
    this.x=x;
    this.y=y;
    return this;
}

Objects.prototype.ufo = function(x,y,line,column,ufoimg){
    this.x=x;
    this.y=y;
    this.line=line;
    this.column=column;
    this.ufoimg=ufoimg;
    this.width=32;
    this.height=24;
    this.ufoimg.src="images/ufo.png";
    return this;

};

Objects.prototype.bomb = function(x,y){
    this.x=x;
    this.y=y;
    return this;
};