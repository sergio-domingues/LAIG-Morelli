
function MyCrown(scene){
    CGFobject.call(this,scene);

    this.ball = new MySphere(scene, 0.05, 10, 10);

    this.partin = new MyPatch(scene, 3,3, 20, 20, [
            [0, 0, 0, 1], 
            [0, 0.2, 0, 1],
            [0, 0.4, 0, 1],
            [0, 0.7, 0, 1],

            [0.25, 0, 0.1, 1], 
            [0.25, 0.2, 0.1, 1],
            [0.25, 0.4, 0.1, 1],
            [0.25, 0.2, 0.1, 1],

            [0.45, 0, 0.35, 1], 
            [0.45, 0.2, 0.35, 1],
            [0.45, 0.4, 0.35, 1],
            [0.45, 0.3, 0.35, 1],

            [0.5, 0, 0.5, 1], 
            [0.5, 0.2, 0.5, 1],
            [0.5, 0.4, 0.5, 1],
            [0.5, 0.7, 0.5, 1]]);

     this.partout = new MyPatch(scene, 3,3, 20, 20, [
            [0.5, 0, 0.5, 1], 
            [0.5, 0.2, 0.5, 1],
            [0.5, 0.4, 0.5, 1],
            [0.5, 0.7, 0.5, 1],

            [0.45, 0, 0.28, 1], 
            [0.45, 0.2, 0.28, 1],
            [0.45, 0.4, 0.28, 1],
            [0.45, 0.3, 0.28, 1],

            [0.25, 0, 0.075, 1], 
            [0.25, 0.2, 0.075, 1],
            [0.25, 0.4, 0.075, 1],
            [0.25, 0.2, 0.075, 1],

            [0, 0, 0, 1], 
            [0, 0.2, 0, 1],
            [0, 0.4, 0, 1],
            [0, 0.7, 0, 1]]);
}

MyCrown.prototype = Object.create(CGFobject.prototype);
MyCrown.prototype.constructor = MyCrown;


MyCrown.prototype.display =function(){


    this.scene.pushMatrix();
    this.scene.translate(0,0,-0.5);
    this.scene.scale(0.9,0.9,0.9);
 		
 		this.scene.pushMatrix(); 			
			this.partin.display();
			this.partout.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
 			this.scene.translate(0.5, 0, 0.5);
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
 			this.partin.display();
			this.partout.display();
		this.scene.popMatrix(); 
		this.scene.pushMatrix();
 			this.scene.translate(0, 0, 1);
			this.scene.rotate(-Math.PI, 0, 1, 0);
 			this.partin.display();
			this.partout.display();
		this.scene.popMatrix(); 
		this.scene.pushMatrix();
 			this.scene.translate(-0.5, 0, 0.5);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
 			this.partin.display();
			this.partout.display();
		this.scene.popMatrix(); 

		this.scene.pushMatrix();
 			this.scene.translate(0, 0.7, 0);
 			this.ball.display();
		this.scene.popMatrix(); 
		this.scene.pushMatrix();
 			this.scene.translate(-0.5, 0.7, 0.5);
 			this.ball.display();
		this.scene.popMatrix(); 
		this.scene.pushMatrix();
 			this.scene.translate(0.5, 0.7, 0.5);
 			this.ball.display();
		this.scene.popMatrix(); 
		this.scene.pushMatrix();
 			this.scene.translate(0, 0.7, 1);
 			this.ball.display();
		this.scene.popMatrix(); 
			
	this.scene.popMatrix();


}