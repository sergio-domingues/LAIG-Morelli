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
    Animation.call(this, scene, "movePiece", "movePiece", 1);
    this.xf=posFinal[0];
    this.yf=posFinal[1];
    this.xi=posInitial[0];
    this.yi=posInitial[0];
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
 * Adds controlpoint to animation's controlpoint array
 * @param {float} x 
 * @param {float} y 
 * @param {float} z 
 */

/**
 * Updates animation and returns the animation's actual matrix
 */
MovePieceAnimation.prototype.getMatrix = function() {

    var x,y,z;

    if(this.state=="UP"){
        x=this.xi;
        z=this.yi;
        y=1*(this.frameTime/(this.span/4));

        if(this.frameTime>this.span/4){
            this.state=="MOVE";
            this.frameTime-=this.span/4;
        }
    }else if(this.state=="DOWN"){
        x=this.xf;
        z=this.yf;
        y=1-(1*(this.frameTime/(this.span/4)));

        if(this.frameTime>this.span/4){
            this.state=="DONE";
            this.frameTime-=this.span/4;
            this.done=true;
        }
    }
    else if(this.state=="MOVE"){
        x=(xf-xi)*(this.frameTime/(this.span/2));
        z=(yf-yi)*(this.frameTime/(this.span/2));

        if(this.frameTime>this.span/2){
            this.state=="DOWN";
            this.frameTime-=this.span/2;
            this.done=true;
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
