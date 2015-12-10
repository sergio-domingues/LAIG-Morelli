function Board(scene, size) {
    this.size = size;
    this.scene = scene;
    this.board = [];
    this.logicBoard = [];
    this.logicBoardInitial=[];
    this.init();
}

Board.prototype.constructor = Board;

/** Initialize buffers (indexs/vertexs/normals/texture coords) */
Board.prototype.display = function() {
    
    for (var i = 0; i < this.size * this.size; i++) {
        this.scene.registerForPick(i + 1, this.board[i]);
        
        this.board[i].display();
    
    }
    
    for (var i = 0; i < this.size * this.size; i++) {
        this.scene.registerForPick(201 + i, this.logicBoard[i]);
        
        if (this.logicBoard[i] !== undefined)
            this.logicBoard[i].display();
    
    }


}
;

Board.prototype.init = function() {
    
    for (var i = 0; i < this.size * this.size; i++) {
        var pos = this.getCoords(i);
        var colorIndexY = pos["y"]
          
        , colorIndexX = pos["x"];
        
        if (pos["x"] > this.size / 2) {
            colorIndexX = this.size - pos["x"] - 1;
        }
        
        if (pos["y"] > this.size / 2) {
            colorIndexY = this.size - pos["y"] - 1;
        }
        
        
        var colorIndex = Math.min(colorIndexX, colorIndexY);
        
        this.board[i] = new Cell(this.scene,colorIndex,pos["x"],pos["y"]);
    
    }

}

Board.prototype.initTab = function(data) {
    this.logicBoardInitial=data;
    for (var y = 0; y < data.length; y++) {
        for (x = 0; x < data.length; x++) {
            if (data[y][x] == 0 || data[y][x] == 1) {
                this.logicBoard[y * data.length + x] = new Piece(this.scene,data[y][x],x,y);
            }
        }
    }
}

Board.prototype.highlightPath=function(array){
    for(var i=0;i<array.length;i++){
        this.board[(array[i][1]-1)*this.size+(array[i][0]-1)].setHighlighted();
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