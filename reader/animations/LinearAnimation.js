/**
 * Represents a linear animation
 * @constructor 
 * @param {object} scene
 * @param {string} id - linear animation's id
 * @param {string} type - animation's type
 * @param {int} span - animation's duration 
 */
function LinearAnimation(scene, id, type, span) {
    Animation.call(this,scene, id, type, span);
    //super
    this.controlPoint = [];
    this.currentControlPoint = 1;
    this.velocity;
    this.totalDistance = 0;
    this.deslocationVector;
}

LinearAnimation.prototype.constructor = LinearAnimation;
LinearAnimation.prototype = Object.create(Animation.prototype);

/**
 * Initializes the linear animation
 */
LinearAnimation.prototype.init = function() {
    this.calcDistance();
    this.calcVelocity();
    this.deslocationVector = this.getDeslocationVector();
}

/**
 * Adds controlpoint to animation's controlpoint array
 * @param {float} x 
 * @param {float} y 
 * @param {float} z 
 */
LinearAnimation.prototype.addControlPoint = function(x, y, z) {
    this.controlPoint.push(vec3.fromValues(x, y, z));
    //cria vector com os 3 argumentos
}

/**
 * Obtains the deslocation vector
 */
LinearAnimation.prototype.getDeslocationVector = function() {
    var vector = vec3.create();
    return vec3.subtract(vector, this.controlPoint[this.currentControlPoint], this.controlPoint[this.currentControlPoint - 1]);
}

/**
 * Updates animation and returns the animation's actual matrix
 */
LinearAnimation.prototype.getMatrix = function() {
    var timeControlPoint = vec3.length(this.deslocationVector) / this.velocity;
                 
    if (this.frameTime > timeControlPoint && this.currentControlPoint <= (this.controlPoint.length) && !this.done) {
        
        this.currentControlPoint++;
        this.frameTime -= timeControlPoint;
        
        if (this.currentControlPoint == this.controlPoint.length) {
            this.deslocationVector = vec3.fromValues(0, 0, 0);
        } else {
            this.deslocationVector = this.getDeslocationVector();
        }
    }
    
    if (this.currentControlPoint == this.controlPoint.length) {
        this.done = true;
        timeControlPoint = 1; 
    }
    
    var matrix = mat4.create();
    mat4.identity(matrix);
    
    mat4.translate(matrix, matrix, vec3.fromValues(
    this.deslocationVector[0] * this.frameTime / timeControlPoint + this.controlPoint[this.currentControlPoint -1][0], 
    this.deslocationVector[1] * this.frameTime / timeControlPoint + this.controlPoint[this.currentControlPoint -1][1], 
    this.deslocationVector[2] * this.frameTime / timeControlPoint + this.controlPoint[this.currentControlPoint -1][2]));
      
    if (this.done == true) {  //mantem posicao final        
        var vector = vec3.create();
        vec3.subtract(vector, this.controlPoint[this.currentControlPoint - 1], this.controlPoint[this.currentControlPoint - 2]);
        mat4.rotateY(matrix, matrix, this.calcRotation(vector));
              
        if(this.active){
            this.scene.updateCurrAnim();
            this.setInactive();
            //this.init();
            //this.currentControlPoint = 1;
        }

    } 
    else {
        mat4.rotateY(matrix, matrix, this.calcRotation(this.deslocationVector));
    }

    return matrix;
}
/**
 * Calculation of the full length of the linear animation
 */
LinearAnimation.prototype.calcDistance = function() {
    for (var i = 0; i < this.controlPoint.length; i++) {
        if (i == 0) {
            this.totalDistance += vec3.distance(vec3.fromValues(0, 0, 0), this.controlPoint[i]);
        } else {
            this.totalDistance += vec3.distance(this.controlPoint[i - 1], this.controlPoint[i]);
        }
    }
}

/**
 * Calculation of the animation's velocity (ms)
 */
LinearAnimation.prototype.calcVelocity = function() {
    this.velocity = this.totalDistance / (this.span * 1000);
}

/**
 * Returns the angle of vector
 * @param {object} deslocationVector 
 */
LinearAnimation.prototype.calcRotation = function(deslocationVector) {
    return Math.atan2(deslocationVector[0], deslocationVector[2]);
}

