function Cell(scene, colorIndex, x, y) {
    this.colorIndex = colorIndex;
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.primitive = new MyTile(scene);
    this.highlighted = false;
}

Cell.prototype.constructor = Cell;

Cell.prototype.display = function() {
    this.scene.pushMatrix();
    this.scene.translate(this.x, 0, this.y);
    this.scene.colors[this.colorIndex].apply();
    if (this.highlighted) {
        this.scene.bordaBlue.bind();
        this.scene.translate(0, 0.5, 0);
    } else {
        this.scene.borda.bind();
    }
    this.primitive.display();
    this.scene.popMatrix();
}

Cell.prototype.setHighlighted = function() {
    this.highlighted = !this.highlighted;
}
