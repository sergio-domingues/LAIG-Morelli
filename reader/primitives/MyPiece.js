function MyPiece(scene) {
    CGFobject.call(this, scene);
    this.scene = scene;
    
    this.cilindro;
    this.tampo;

    this.init();
}

MyPiece.prototype = Object.create(CGFobject.prototype);
MyPiece.prototype.constructor = MyPiece;


MyPiece.prototype.init = function() {

    this.cilindro = new MyCylinderSurface(this.scene, 1, 0.5, 0.5, 5, 20);
    this.tampo = new MyCylinderSurface(this.scene, 0, 0.5, 0, 5, 20);
}

MyPiece.prototype.display = function() {

   this.cilindro.display();
   
   this.scene.pushMatrix();  
        this.scene.translate(0,0,1);  
        this.tampo.display();
   this.scene.popMatrix();     

   this.scene.pushMatrix();       
        this.scene.rotate(Math.PI,1,0,0);
        this.tampo.display();
    this.scene.popMatrix();
}