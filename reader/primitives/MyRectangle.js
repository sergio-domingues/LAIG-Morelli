/**
 * Represents a rectangle primitive.
 * @constructor
 * @param {object} scene - 
 * @param {float} x1 - top left corner x
 * @param {float} y1 - top left corner y
 * @param {float} x2 - bottom right corner x
 * @param {float} y2 - bottom right corner y
 */
function MyRectangle(scene, x1,y1,x2,y2){
    CGFobject.call(this,scene);

    this.x1 = x1;
    this.y1 = y1;
    
    this.x2 = x2;
    this.y2 = y2;

    this.width = this.x2-this.x1;
	this.height = this.y1 -this.y2;

    this.initBuffers();
}

MyRectangle.prototype = Object.create(CGFobject.prototype);
MyRectangle.prototype.constructor = MyRectangle;

/** Initialize buffers (indexs/vertexs/normals/texture coords) */
MyRectangle.prototype.initBuffers = function() {

    this.vertices = [
        this.x1,this.y2,0,
        this.x2,this.y2,0,
        this.x1,this.y1,0,
        this.x2,this.y1,0
    ];

    this.indices = [
        0,1,2,
        2,1,3
    ];


	this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1
    ];

   this.texCoords = [
		0.0, this.height,
	 	this.width,this.height,
      	0.0, 0.0,
      	this.width, 0.0
     ];



    this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
/** Updates texture coordinates 
* @param {float} s - amplifying factor s
* @param {float} t - amplifying factor t
*/
MyRectangle.prototype.updateTexCoords=function(s, t){
	
    this.texCoords= [
    	0.0,this.height /t,
	 	this.width /s,this.height /t,
      	0.0, 0.0,
      	this.width /s, 0.0 ];

 
    this.updateTexCoordsGLBuffers();
};