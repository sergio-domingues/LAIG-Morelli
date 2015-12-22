/**
 * MyCylinder
 * @constructor
 * @param scene - the scene
 * @param height - the height of the cylinder
 * @param bottom_radius - the radius of the base on the bottom
 * @param top_radius - the radius of the base on the top
 * @param stacks - the number of stacks
 * @param slices - the number of slices
 */
 function MyCylinder(scene,height, bottom_radius, top_radius, stacks, slices) {
  CGFobject.call(this,scene); 
  console.log("My Cylinder parametros: " + height + " " + bottom_radius + " " + top_radius + " " + stacks+ " "+ slices);
  this.slices=slices;
  this.stacks=stacks;
  this.height = height;
  this.bottom_radius = bottom_radius;
  this.top_radius = top_radius;
  
  this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

/**
* Draw the cylinder
* @constructor
*/
MyCylinder.prototype.initBuffers = function() {
 
  this.vertices = [];
  this.indices = [];
  this.normals = [];
  this.texCoords = [];
  
  var ang = 360 / this.slices;
  var agrad = (ang*Math.PI)/180;
  var indice = 0;
  var variacao = (this.top_radius - this.bottom_radius)/(this.stacks);
  var deltah = this.height / this.stacks;
  for(var k = 0; k <= this.slices; ++k){
    for(var i =0 ; i <= this.stacks ; ++i){
        
      this.vertices.push((variacao*i + this.bottom_radius)*Math.cos(agrad*k), (variacao*i + this.bottom_radius)*Math.sin(agrad*k), i*deltah);
      this.vertices.push((variacao*i + this.bottom_radius)*Math.cos(agrad*(k+1)), (variacao*i + this.bottom_radius)*Math.sin(agrad*(k+1)), i*deltah);

      var max = this.height/(this.bottom_radius - this.top_radius);
      var maxheight;
      if(this.bottom_radius > this.top_radius)
       maxheight = this.top_radius*max+this.height;
     else maxheight = this.bottom_radius*max+this.height;
     
     if(k != 0){
       this.indices.push(0+(indice*2), 1+(indice*2), 2+(indice*2));
       this.indices.push(1+(indice*2), 3+(indice*2), 2+(indice*2));
       indice++;
     }
 
              if(Math.abs(this.bottom_radius - this.top_radius) < 0.0001){
                this.normals.push(Math.cos(k*agrad), Math.sin(k*agrad), 0);
                this.normals.push(Math.cos((k+1)*agrad), Math.sin((k+1)*agrad), 0);
              }
              else if(this.bottom_radius > this.top_radius){
                this.normals.push(
                  maxheight * Math.cos(k*agrad)/Math.sqrt(Math.pow(this.bottom_radius, 2) + Math.pow(maxheight, 2)),
                  maxheight * Math.sin(k*agrad)/Math.sqrt(Math.pow(this.bottom_radius, 2) + Math.pow(maxheight, 2)), 
                  this.bottom_radius/Math.sqrt(Math.pow(this.bottom_radius, 2) + Math.pow(maxheight, 2))
                  );
                   this.normals.push(
                  maxheight * Math.cos((k+1)*agrad)/Math.sqrt(Math.pow(this.bottom_radius, 2) + Math.pow(maxheight, 2)),
                  maxheight * Math.sin((k+1)*agrad)/Math.sqrt(Math.pow(this.bottom_radius, 2) + Math.pow(maxheight, 2)), 
                  this.bottom_radius/Math.sqrt(Math.pow(this.bottom_radius, 2) + Math.pow(maxheight, 2))
                  );
              }
              else{
                this.normals.push(
                  maxheight * Math.cos(k*agrad)/Math.sqrt(Math.pow(this.top_radius, 2) + Math.pow(maxheight, 2)),
                  maxheight * Math.sin(k*agrad)/Math.sqrt(Math.pow(this.top_radius, 2) + Math.pow(maxheight, 2)), 
                  this.top_radius/Math.sqrt(Math.pow(this.top_radius, 2) + Math.pow(maxheight, 2))
                  );
                  this.normals.push(
                  maxheight * Math.cos((k+1)*agrad)/Math.sqrt(Math.pow(this.top_radius, 2) + Math.pow(maxheight, 2)),
                  maxheight * Math.sin((k+1)*agrad)/Math.sqrt(Math.pow(this.top_radius, 2) + Math.pow(maxheight, 2)), 
                  this.top_radius/Math.sqrt(Math.pow(this.top_radius, 2) + Math.pow(maxheight, 2))
                  );
              }
              
              this.texCoords.push(k/this.slices, (this.stacks-i)/this.stacks);              
              this.texCoords.push((k+1)/this.slices, (this.stacks-i)/this.stacks);
              
            }
          }
          
          this.primitiveType = this.scene.gl.TRIANGLES;
          this.initGLBuffers();
        };


  /**
 * To update the texture coordinates
 * @constructor
 */
 MyCylinder.prototype.updateTextCoords = function(s,t){};