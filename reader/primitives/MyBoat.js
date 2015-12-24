function MyBoat(scene){
    CGFobject.call(this,scene);

    this.base1=new MyTriangle(scene,-2,1,0,-1,0,0,0,0.8,0.3);
    this.base1back=new MyTriangle(scene,-1,0,0,-2,1,0,0,0.8,0.3);
    this.base21=new MyTriangle(scene,-1,0,0,0,0,0.2,0,0.8,0.3);
    this.base22=new MyTriangle(scene,0,0,0.2,1,0,0,0,0.8,0.3);
    this.base21back=new MyTriangle(scene,0,0,0.2,-1,0,0,0,0.8,0.3);
    this.base22back=new MyTriangle(scene,1,0,0,0,0,0.2,0,0.8,0.3);
    this.base3=new MyTriangle(scene,2,1,0,0,0.8,0.3,1,0,0);
    this.base3back=new MyTriangle(scene,0,0.8,0.3,2,1,0,1,0,0);;

    this.sail1=new MyTriangle(scene,0,1.5,0,-0.5,0,0,0,0,0.2)
    this.sail2=new MyTriangle(scene,0,1.5,0,0,0,0.2,0.5,0,0)
    
}

MyBoat.prototype = Object.create(CGFobject.prototype);
MyBoat.prototype.constructor = MyBoat;

MyBoat.prototype.display = function (){
    this.base1.display();
    this.base1back.display();
    this.base21.display();
    this.base22.display();
    this.base21back.display();
    this.base22back.display();
    this.base3.display();
    this.base3back.display();
    this.sail1.display();
    this.sail2.display();
    
    this.scene.pushMatrix()
    this.scene.rotate(Math.PI,0,1,0);
    
        this.base1.display();
    this.base1back.display();
    this.base21.display();
    this.base22.display();
    this.base21back.display();
    this.base22back.display();
    this.base3.display();
    this.base3back.display();
    this.sail1.display();
    this.sail2.display();
    this.scene.popMatrix();

}

MyBoat.prototype.updateTexCoords = function(s, t){	
};