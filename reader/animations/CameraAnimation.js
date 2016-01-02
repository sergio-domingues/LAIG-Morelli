function CameraAnimation(scene,camera) {
    Animation.call(this, scene, "camera", "camera", 1);
    this.camera=scene.camera;
    this.currAng=0;

}

CameraAnimation.prototype.constructor = CameraAnimation;
CameraAnimation.prototype = Object.create(Animation.prototype);

/**
 * Updates animation and returns the animation's actual matrix
 */
CameraAnimation.prototype.display = function() {
  var angToRepresent=Math.PI*(this.frameTime/((this.span)*1000));
  if (angToRepresent>Math.PI){
      angToRepresent=Math.PI;
  }
  var ang=angToRepresent-this.currAng;
  this.currAng=angToRepresent;
  this.camera.orbit(CGFcameraAxisID.Y,ang);
  if(this.currAng>=Math.PI){
      this.done=true;
  }
}