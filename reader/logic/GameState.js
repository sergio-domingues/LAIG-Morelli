function Morreli(scene, size, gamemode) {
    this.player = 0;
    this.stateTime=0;
    this.size = size;
    this.board = new Board(scene,size);
    this.mode = gamemode;
    if(this.mode[0]!="human"){
        this.currentState="BOT"
    }else{
        this.currentState="INIT"
    }
    this.connection = new Connection();
    this.lastLastTick=Date.now();
    this.init();

}

Morreli.prototype.init = function() {
    var self = this;
    this.connection.initTabuleiro(this.size, function(board) {
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
    if(this.currentState == "BOT"){
        if(this.mode[this.player]=="bot1"){
            this.botRandom();
        }

        if(this.mode[this.player]=="bot2"){
                this.botSmart();
        }
    
    }
    if (this.currentState == "GAMEOVER") {
        console.log("Winner => Player ", this.player);
    }
}


Morreli.prototype.updateTime = function(currTime) {
    this.stateTime+=currTime-this.lastLastTick;
    for(var i=0;i<this.board.animations.length;i++){
        this.board.animations[i].addTime(currTime);
    }
}

Morreli.prototype.undo = function() {
    if(this.currentState=="INIT"){
        this.board.undo();
    }
}

Morreli.prototype.getValidMoves = function(selected) {
    var self = this;
    var pos = this.getCoords(selected - 201);
    this.connection.validMoves(this.board.history.top(), this.size, this.player, pos.x + 1, pos.y + 1, function(positions) {
        self.board.highlightPath(positions);
    });
}

Morreli.prototype.movePiece = function(xf, yf) {
    var self = this;
    
    this.connection.movePiece(this.board.history.top(), this.size, this.player, this.board.pieceSelected[0] + 1, this.board.pieceSelected[1] + 1, xf + 1, yf + 1, function(board) {
        self.board.movePiece(board);
        self.checkEndGame();
    });

}

Morreli.prototype.checkEndGame = function() {
    var self = this;
    
    this.connection.checkGameOver(this.board.history.top(), this.size, 1-this.player, function(data) {
        console.log(data);
        if (data) {
            self.currentState = "GAMEOVER";
        }
        else{
            self.player = (1 - self.player);
            if(self.mode[self.player]=="bot1" ||self.mode[self.player]=="bot2"){
                self.currentState="BOT";
            }else
                self.currentState="INIT";
        }
        
    });
}

Morreli.prototype.botRandom =function(){
    var self = this;
    
    this.connection.randomMove(this.board.logicBoardInitial, this.size,this.player, function(board) {
        self.board.movePiece(board);
        self.checkEndGame();
    });
}

Morreli.prototype.botSmart =function(){
    var self = this;
    
    this.connection.smartMove(this.board.logicBoardInitial, this.size,this.player, function(board) {
        self.board.movePiece(board);
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

//@deprecated
Morreli.prototype.getMode = function(gamemode) {
    var player1 = gamemode[0];
    var player2 = gamemode[1]+gamemode[2];
    var mode = {};
    
    switch (player1) {
    case "H":
        mode[0] = "human";
        break;
    
    case "B1":
        mode[0] = "bot1";
        break;
    case "B2":
        mode[0] = "bot2";
        break;
    }
    
    switch (player2) {
    case "H":
        mode[1] = "human";
        break;
    
    case "B1":
        mode[1] = "bot1";
        break;
    case "B2":
        mode[1] = "bot2";
        break;
    }

    return mode;

}
