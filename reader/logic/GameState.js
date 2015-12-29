function Morreli(scene, size, gamemode) {
    this.player = 0;
    this.scene = scene;
    this.stateTimeMax = 0;
    this.stateTime = 15000;
    this.size = size;
    this.board = new Board(scene,size);
    this.mode = gamemode;
    if (this.mode[0] != "human") {
        this.currentState = "BOT"
    } else {
        this.currentState = "INIT"
    }
    this.connection = new Connection();
    this.lastLastTick = Date.now();
    
    this.history = new History();
    this.anim;
    
    this.whiteLabel = new String3D(this.scene,"WHITE");
    this.blackLabel = new String3D(this.scene,"BLACK");
    this.init();
    
    this.counter = {
        black: 0,
        white: 0
    }
    
    this.white = new String3D(this.scene,"WHITE     " + this.counter.white)
    this.black = new String3D(this.scene,"BLACK     " + this.counter.black)
    this.timeLeft = new String3D(this.scene,"TIME LEFT " + this.stateTime / 1000);



}

Morreli.prototype.init = function() {
    var self = this;
    this.connection.initTabuleiro(this.size, function(board) {
        self.history.push(board);
        self.board.initTab(board);
        self.countPieces(board);
    });
}

Morreli.prototype.display = function() {
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 2, 1, 0, 0)
    this.scene.rotate(Math.PI, 0, 0, 1)
    this.scene.translate(-8, -3, -0.2)
    this.whiteLabel.display();
    this.scene.popMatrix();
    
    this.board.display();
    
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 2, 1, 0, 0)
    this.scene.translate(3, -15, -0.2)
    this.blackLabel.display();
    this.scene.popMatrix();
}

Morreli.prototype.updateClick = function(id, piece) {
    //Selectionar peca no estdo inicial
    if (this.currentState == "INIT" && id > 200) {
        if (piece.player == this.player) {
            piece.setHighlighted();
            this.board.pieceSelected = [piece.x, piece.y];
            this.getValidMoves(id);
            this.currentState = "PIECESELECT";
        }
    }//Peca selecionada e carrega novamente numa peca
     
    
    
    
    
    else if (this.currentState == "PIECESELECT" && id > 200) {
        //volta a carregar na peca => volta para o estado inicial
        if (piece.player == this.player) {
            this.board.clearPath();
            if (piece.x == this.board.pieceSelected[0] && piece.y == this.board.pieceSelected[1]) {
                this.board.pieceSelected = [];
                piece.setHighlighted();
                this.currentState = "INIT";
            } else {
                //carrega noutra peca e mete highlighted
                this.board.logicBoard[this.board.pieceSelected[1] * this.size + this.board.pieceSelected[0]].setHighlighted();
                piece.setHighlighted();
                this.board.pieceSelected = [piece.x, piece.y];
                this.getValidMoves(id);
                this.currentState = "PIECESELECT";
            }
        
        }
    }
    //Peca selecionada e carrega numa posicao
    if (this.currentState == "PIECESELECT" && id < 200) {
        var coords = this.getCoords(id - 1);
        if (this.board.isPath(coords)) {
            this.movePiece(coords.x, coords.y);
        }
    }
    if (this.currentState == "BOT") {
        if (this.mode[this.player] == "bot1") {
            this.botRandom();
        }
        
        if (this.mode[this.player] == "bot2") {
            this.botSmart();
        }
    
    }
    if (this.currentState == "GAMEOVER") {
        console.log("Winner => Player ", this.player);
    }
}


Morreli.prototype.updateTime = function(currTime) {
    if (this.stateTime > 0) {
        //this.stateTime -= currTime - this.lastLastTick;
    } else {
        this.currentState = "GAMEOVER";
    }
    
    //this.timeLeft.string = (this.scene,
    //"TIME LEFT " + Math.floor(this.stateTime / 1000));
    
    
    
    for (var i = 0; i < this.board.animations.length; i++) {
        this.board.animations[i].addTime(currTime);
    }
    
    if (this.anim) {
        this.anim.addTime(currTime);
    }
    
    
    if (this.currentState == "CHANGEPLAYER") {
        if (this.anim && !this.anim.done) {
            this.anim.display();
        } else if (this.anim.done) {
            this.currentState = "INIT";
            this.stateTime = 25000;
        }
    }
    if (this.currentState == "ANIM") {
        if (this.stateTimeMax > 0) {
            this.stateTimeMax -= (currTime - this.lastLastTick) / 1000;
        } else 
        if (this.mode[this.player] == "bot1" || this.mode[this.player] == "bot2") {
            this.currentState = "BOT";
        } else if (this.mode[0] == "human" && this.mode[1] == "human") {
            this.currentState = "CHANGEPLAYER";
            this.anim = new CameraAnimation(this.scene);
        } else {
            this.currentState = "INIT";
            this.stateTime = 15000;
        }
    }
    this.lastLastTick = currTime;

}

Morreli.prototype.undo = function() {
    if (this.currentState == "INIT") {
        var changes = this.history.undo();
        if (changes)
            this.board.movePiece(changes)
    }
}

Morreli.prototype.getValidMoves = function(selected) {
    var self = this;
    var pos = this.getCoords(selected - 201);
    this.connection.validMoves(this.history.top(), this.size, this.player, pos.x + 1, pos.y + 1, function(positions) {
        self.board.highlightPath(positions);
    });
}

Morreli.prototype.movePiece = function(xf, yf) {
    var self = this;
    
    this.connection.movePiece(this.history.top(), this.size, this.player, this.board.pieceSelected[0] + 1, this.board.pieceSelected[1] + 1, xf + 1, yf + 1, function(board) {
        
        self.board.movePiece(self.history.diff(board));
        self.currentState = "ANIM";
        self.stateTimeMax = 2;
        self.history.push(board);
        self.countPieces(board);
        self.checkEndGame();
    });

}

Morreli.prototype.checkEndGame = function() {
    var self = this;
    
    this.connection.checkGameOver(this.history.top(), this.size, 1 - this.player, function(data) {
        console.log(data);
        if (data) {
            self.currentState = "GAMEOVER";
        } 
        else {
            self.player = (1 - self.player);
        }
    
    });
}

Morreli.prototype.botRandom = function() {
    var self = this;
    
    this.connection.randomMove(this.history.top(), this.size, this.player, function(board) {
        self.board.movePiece(self.history.diff(board));
        self.currentState = "ANIM";
        self.stateTimeMax = 2;
        self.history.push(board);
        self.countPieces(board);
        self.checkEndGame();
    });
}

Morreli.prototype.botSmart = function() {
    var self = this;
    
    this.connection.smartMove(this.history.top(), this.size, this.player, function(board) {
        self.movePiece(self.history.diff(board));
        self.currentState = "ANIM";
        self.stateTimeMax = 2;
        self.history.push(board);
        self.countPieces(board);
        self.checkEndGame();
    });
}

Morreli.prototype.getCoords = function(pos) {
    var size = this.size * this.size;
    var y = Math.trunc(pos / this.size);
    var x = pos % this.size;
    return {
        "x": x,
        "y": y
    
    }
}

Morreli.prototype.countPieces = function(board) {
    this.counter.white = 0;
    this.counter.black = 0;
    for (var y = 0; y < this.size; y++) {
        for (var x = 0; x < this.size; x++) {
            if (board[y][x] == 0) {
                this.counter.black++;
            } else if (board[y][x] == 1) {
                this.counter.white++;
            }
        }
    }
    this.white.string = ("WHITE     " + this.counter.white);
    this.black.string = (this.scene,
    "BLACK     " + this.counter.black)
}

Morreli.prototype.displayHUD = function() {
    
    this.scene.translate(2.3, 0.8, 0)
    this.scene.scale(0.2, 0.2, 0.2)
    
    this.white.display();
    this.scene.translate(0, -1, 0);
    this.black.display();
    this.scene.translate(0, -1, 0);
    this.timeLeft.display();
}
