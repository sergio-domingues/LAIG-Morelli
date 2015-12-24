function Morreli(scene, size, gamemode) {
    this.player = 0;
    this.scene = scene;
    this.stateTimeMax = 0;
    this.stateTime = 0;
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
    this.init();
    this.history = new History();
    this.anim;

}

Morreli.prototype.init = function() {
    var self = this;
    this.connection.initTabuleiro(this.size, function(board) {
        self.history.push(board);
        self.board.initTab(board);
    });
}

Morreli.prototype.display = function() {
    this.board.display();
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
    this.stateTime += currTime - this.lastLastTick;
    
    
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
        }
    }
    if (this.currentState == "ANIM") {
        if (this.stateTimeMax > 0) {
            this.stateTimeMax -= (currTime - this.lastLastTick) / 1000;
        } else 
        if (this.mode[this.player] == "bot1" || this.mode[this.player] == "bot2") {
            this.currentState = "BOT";
        } else if(this.mode[0] != "human" && this.mode[1]!="human"){
            this.currentState = "CHANGEPLAYER";
            this.anim = new CameraAnimation(this.scene);
        }else{
            this.currentState="INIT";
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
