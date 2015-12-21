/**
 * Represents a circulas animation
 * @constructor 
 * @param {object} scene
 * @param {string} id - linear animation's id
 * @param {string} type - animation's type
 * @param {int} span - animation's duration 
 * @param {string} center - animation's center
 * @param {float} radius - linear animation's id
 * @param {int} startAng - animation's initial angle 
 * @param {int} rotAng - rotation angle to be applied
 */
function MovePieceAnimation(scene,posInitial,posFinal) {
    Animation.call(this, scene, "movePiece", "movePiece", 4);
    this.xf=posFinal[0];
    this.yf=posFinal[1];
    this.xi=posInitial[0];
    this.yi=posInitial[1];
    this.state="UP";
    this.timeUpDown=this.span/4
    
    
    this.lastMatrix;
}

MovePieceAnimation.prototype.constructor = MovePieceAnimation;
MovePieceAnimation.prototype = Object.create(Animation.prototype);

/**
 * Initializes the linear animation
 */
MovePieceAnimation.prototype.init = function() {
    this.velocityUpDown=this.calcVelocity();
}


/**
 * Updates animation and returns the animation's actual matrix
 */
MovePieceAnimation.prototype.getMatrix = function() {

    var x=0,y=0,z=0;

    if(this.state=="UP"){
        var timeToState=(this.span/4)*1000;        
        x=this.xi;
        z=this.yi;
        y=1*(this.frameTime/timeToState);

        if(this.frameTime>timeToState){
            this.state="MOVE";
            console.log(this.frameTime)
            this.frameTime-=timeToState;
        }
    }else if(this.state=="DOWN"){
        x=this.xf;
        z=this.yf;
        var timeToState=(this.span/4)*1000;
        y=1-(1*(this.frameTime/timeToState));

        if(this.frameTime>timeToState){
            this.state="DONE";
            
            this.frameTime-=timeToState;
            this.done=true;
        }
    }
    else if(this.state=="MOVE"){
         var timeToState=(this.span/2)*1000;
        x=(this.xf-this.xi)*(this.frameTime/timeToState);
        y=1;
        z=(this.yf-this.yi)*(this.frameTime/timeToState);

        if(this.frameTime>timeToState){
            this.state="DOWN";
            this.frameTime-=timeToState;
           
        }
    }
                 
    var matrix = mat4.create();
    mat4.identity(matrix);
    
    mat4.translate(matrix, matrix, vec3.fromValues(x,y,z));
    

    return matrix;
}


/**
 * Calculation of the animation's velocity (ms)
 */
LinearAnimation.prototype.calcVelocity = function(distance,time) {
    this.velocity = distance / (time * 1000);
}
