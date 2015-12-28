function CrownAnimation(scene, pos) {
    Animation.call(this, scene, "crown", "crown", 1);
    this.x = pos[0];
    this.y = pos[1];

}

CrownAnimation.prototype.constructor = CrownAnimation;
CrownAnimation.prototype = Object.create(Animation.prototype);

/**
 * Updates animation and returns the animation's actual matrix
 */
CrownAnimation.prototype.getMatrix = function() {
    var ang = 4 * Math.PI * (this.frameTime / (this.span * 1000));
    var y = 0.8 * this.frameTime / (this.span * 1000);
    x = this.x;
    z = this.y;
    if (this.frameTime >= this.span * 1000) {
        this.done = true;
    }
    
    
    var matrix = mat4.create();
    mat4.identity(matrix);
    mat4.translate(matrix, matrix, vec3.fromValues(x, y, z));
    mat4.rotateY(matrix, matrix, ang)
    return matrix;
}
