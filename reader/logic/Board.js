function Board(scene, size) {
    this.size = size;
    this.scene = scene;
    this.board = [];
    this.logicBoard = [];
    this.init();
}

Board.prototype.constructor = Board;

/** Initialize buffers (indexs/vertexs/normals/texture coords) */
Board.prototype.display = function() {
    
    for (var i = 0; i < this.size * this.size; i++) {
        this.scene.registerForPick(i+1,this.board[i]);
        
        this.board[i].display();
    
    }


}
;

Board.prototype.init = function() {
    
    for (var i = 0; i < this.size * this.size; i++) {
        var pos = this.getCoords(i);
        var colorIndexY=pos["y"], colorIndexX=pos["x"];

        if (pos["x"] > this.size / 2) {
            colorIndexX = this.size - pos["x"]-1;
        }
        
        if (pos["y"] > this.size / 2) {
            colorIndexY = this.size - pos["y"]-1;
        }
        
        
        var colorIndex = Math.min(colorIndexX, colorIndexY);
        
        this.board[i] = new Cell(this.scene,colorIndex,pos["x"],pos["y"]);
        
    }
}

Board.prototype.getCoords = function(pos) {
    var size = this.size * this.size;
    var y = Math.trunc(pos / this.size);
    var x = pos % this.size;
    return {
        "x": x,
        "y": y
    
    }
}
