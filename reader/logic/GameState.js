function Morreli(scene, size, gamemode) {
    this.currentState = "INIT";
    this.player = 0;
    this.size = size;
    this.board = new Board(scene,size);
    this.mode = this.getMode(gamemode);
    this.connection = new Connection();
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

Morreli.prototype.update = function(id, piece) {
    
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
            this.player = (1 - this.player);
            this.currentState = "INIT";
            //TODO Checkgame está mal...cena de async=======>>>> cancro
            this.checkEndGame();
        }
    }
    
    if (this.currentState == "GAMEOVER") {
        console.log("Winner => Player ", this.player);
    }
}

Morreli.prototype.getValidMoves = function(selected) {
    var self = this;
    var pos = this.getCoords(selected - 201);
    this.connection.validMoves(this.board.logicBoardInitial, this.size, this.player, pos.x + 1, pos.y + 1, function(positions) {
        self.board.highlightPath(positions);
    });
}

Morreli.prototype.movePiece = function(xf, yf) {
    var self = this;
    
    this.connection.movePiece(this.board.logicBoardInitial, this.size, this.player, this.board.pieceSelected[0] + 1, this.board.pieceSelected[1] + 1, xf + 1, yf + 1, function(board) {
        self.board.movePiece(board);
    });

}

Morreli.prototype.checkEndGame = function() {
    var self = this;
    
    this.connection.checkGameOver(this.board.logicBoardInitial, this.size, this.player, function(data) {
        console.log(data);
        if (data) {
            this.currentState = "GAMEOVER";
        }
    });
    {
    
    }
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

Morreli.prototype.getMode = function(gamemode) {
    var player1 = gamemode[0];
    var player2 = gamemode[1];
    var mode = {};
    
    switch (player1) {
    case "H":
        mode.player1 = "human";
        break;
    
    case "B1":
        mode.player1 = "bot1";
        break;
    case "B2":
        mode.player1 = "bot2";
        break;
    }
    
    switch (player2) {
    case "H":
        mode.player2 = "human";
        break;
    
    case "B1":
        mode.player2 = "bot1";
        break;
    case "B2":
        mode.player2 = "bot2";
        break;
    }

    return mode;

}
