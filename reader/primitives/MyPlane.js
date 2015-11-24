/**
 * Represents a plane
 * @constructor
 * @param {object} scene 
 * @param {int} nrDivs 
 */
function MyPlane(scene, nrDivs) {
    CGFobject.call(this, scene);
    this.scene = scene;
    
    // nrDivs = 1 if not provided
    nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;
    

     var nurbsSurface = new CGFnurbsSurface(1,1,[0, 0, 1, 1],[0, 0, 1, 1],[[ [-0.5, 0.0, 0.5, 1],[-0.5, 0.0, -0.5, 1]], [[0.5, 0.0, 0.5, 1],[0.5, 0.0, -0.5, 1]]]);
   
     
    getSurfacePoint = function(u, v) {
        return nurbsSurface.getPoint(u, v);
    }
    ;
    
    this.obj = new CGFnurbsObject(this.scene,getSurfacePoint,nrDivs,nrDivs);
}
;

MyPlane.prototype = Object.create(CGFobject.prototype);
MyPlane.prototype.constructor = MyPlane;

/**
* MyPlane display method
*/
MyPlane.prototype.display = function() {
   
    this.obj.display();
}
;

MyPlane.prototype.updateTexCoords = function(s, t) {
}
;
