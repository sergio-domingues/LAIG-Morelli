function Board(scene, size) {
    this.size = size;
    this.scene = scene;
    this.board = [];
    this.logicBoard = [];
    
    this.pieceSelected = [];
    this.pathHighlighted = [];
    this.animations = [];
    
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
    for (var y = 0; y < data.length; y++) {
        for (x = 0; x < data.length; x++) {
            if (data[y][x] == 0 || data[y][x] == 1) {
                this.logicBoard[y * data.length + x] = new Piece(this.scene,data[y][x],x,y);
            }
        }
    }
    //this.logicBoard[1].animation = new CrownAnimation(this.scene,[1, 0]);
    //this.animations.push(this.logicBoard[1].animation);
}

Board.prototype.highlightPath = function(array) {
    for (var i = 0; i < array.length; i++) {
        this.board[(array[i][1] - 1) * this.size + (array[i][0] - 1)].setHighlighted();
    }
    this.pathHighlighted = array;
}

Board.prototype.clearPath = function() {
    for (var i = 0; i < this.pathHighlighted.length; i++) {
        this.board[(this.pathHighlighted[i][1] - 1) * this.size + (this.pathHighlighted[i][0] - 1)].setHighlighted();
    }
    this.pathHighlighted = [];
}

Board.prototype.isPath = function(index) {
    for (var i = 0; i < this.pathHighlighted.length; i++) {
        if (this.pathHighlighted[i][0] == index.x + 1 && this.pathHighlighted[i][1] == index.y + 1) {
            return true;
        }
    }
    return false;
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

Board.prototype.movePiece = function(difference) {
    
    //console.log(difference);
    var anim = new ComplexAnimation();
    
    var piece = this.logicBoard[difference["move"]["old"][1] * this.size + difference["move"]["old"][0]];
    piece.x = difference["move"]["new"][0];
    piece.y = difference["move"]["new"][1];
    piece.highlighted = false;
    this.logicBoard[difference["move"]["old"][1] * this.size + difference["move"]["old"][0]] = undefined;
    this.logicBoard[difference["move"]["new"][1] * this.size + difference["move"]["new"][0]] = piece;
    
    var animMove = new MovePieceAnimation(this.scene,difference["move"]["old"],difference["move"]["new"]);
    piece.animation = animMove;
    anim.addAnimation(animMove);
    
    if (difference["capture"].length > 0) {
        var piece = this.logicBoard[difference["capture"][1] * this.size + difference["capture"][0]];
        var animCapture = new CapturePieceAnimation(this.scene,difference["capture"],piece);
        piece.animation = animCapture;
        anim.addAnimation(animCapture);
    }
    
    if (difference["throne"] != -1) {
        var middle = Math.floor(this.size / 2) * this.size + Math.floor(this.size / 2);
        
        if (this.logicBoard[middle] === undefined) {
            this.logicBoard[middle] = new Piece(this.scene,difference["throne"],Math.floor(this.size / 2),Math.floor(this.size / 2),"throne");
            var crownCapture = new CrownAnimation(this.scene,Math.floor(this.size / 2),Math.floor(this.size / 2));
            this.logicBoard[middle].animation = crownCapture;
            anim.addAnimation(crownCapture);
        } else {
            this.logicBoard[middle].player = difference["throne"];
            var animCapture = new CapturePieceAnimation(this.scene,Math.floor(this.size / 2),Math.floor(this.size / 2),this.logicBoard[middle]);
            this.logicBoard[middle].animation = animCapture;
            anim.addAnimation(animCapture);
        }
    }
    
    
    this.animations.push(anim);
    
    
    this.clearPath();
}


Board.prototype.isAnimDone = function() {
    var done = true;
    for (var i = 0; i < this.animations.length; i++) {
        if (!this.animations.done) {
            var done = false;
            return;
        }
    }
    return done;
}
