function Cell(scene, colorIndex,x,y) {
    this.colorIndex = colorIndex;
    this.scene = scene;
    this.x = x;
    this.y=y;
    this.primitive=new MyTile(scene);
}

Cell.prototype.constructor = Cell;

Cell.prototype.display =function(){
    this.scene.pushMatrix()
    this.scene.translate(this.x,0,this.y);
    this.scene.colors[this.colorIndex].apply();
    this.scene.borda.bind();
    this.primitive.display();
    this.scene.popMatrix();

}


