function Piece(scene, player, x, y) {
    this.player = player;
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.primitive = new MyPiece(scene);
    this.highlighted = false;
    this.animation;
}

Piece.prototype.constructor = Piece;

Piece.prototype.display = function() {
    this.scene.pushMatrix();
    if(this.player==1){
        this.scene.white.apply();
    }else if(this.player==0){
        this.scene.black.apply();
    }
    if(this.animation){
        var matrix=this.animation.getMatrix();
        this.scene.multMatrix(matrix);
    }

    if(this.highlighted){
    this.scene.translate(this.x, 1, this.y);
    }else{
    this.scene.translate(this.x, 0.7, this.y);
    }
    this.primitive.display();

    this.scene.popMatrix();
}

Piece.prototype.setHighlighted = function() {
    this.highlighted = !this.highlighted;
}
