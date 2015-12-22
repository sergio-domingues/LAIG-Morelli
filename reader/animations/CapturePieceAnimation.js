function CapturePieceAnimation(scene,pos,piece) {
    Animation.call(this, scene, "capturePiece", "capturePiece", 1.5);
    this.x=pos[0];
    this.y=pos[1];
    this.piece=piece;
    this.state="DOWN";
    
}

CapturePieceAnimation.prototype.constructor = CapturePieceAnimation;
CapturePieceAnimation.prototype = Object.create(Animation.prototype);

/**
 * Updates animation and returns the animation's actual matrix
 */
CapturePieceAnimation.prototype.getMatrix = function() {

    var x=0,y=0.7,z=0;
    
    if(this.state=="DOWN"){
        var timeToState=(this.span/2)*1000;        
        x=this.x;
        z=this.y;
        y-=0.3*(this.frameTime/timeToState);

        if(this.frameTime>timeToState){
            this.state="UP";
            this.frameTime-=timeToState;
            this.piece.player=(1-this.piece.player);
        }
    }else if(this.state=="UP"){
        x=this.x;
        z=this.y;
        var timeToState=(this.span/2)*1000;
        y+=0.5*(this.frameTime/timeToState)-0.4;

        if(this.frameTime>timeToState){
            this.state="DONE";
            this.frameTime-=timeToState;
            this.done=true;
        }
    }
                 
    var matrix = mat4.create();
    mat4.identity(matrix);
    mat4.translate(matrix, matrix, vec3.fromValues(x,y,z));

    return matrix;
}