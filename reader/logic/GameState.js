function Morreli(scene,size,gamemode){
    this.currentState="INIT";
    this.player=0;
    this.size=size;
    this.board=new Board(scene,size);
    this.connection=new Connection();
    this.init();

}

Morreli.prototype.init=function(){
    var self=this;
   this.connection.initTabuleiro(this.size, function(board) {
       self.board.initTab(board);
    });
    //this.board.highlightPath([[2,2],[3,3],[4,4],[5,5],[6,6]]);
}

Morreli.prototype.display=function(){
    this.board.display();
}

Morreli.prototype.update=function(id,piece){
    if(this.currentState=="INIT" &&id>200){
        piece.setHighlighted();
        this.getValidMoves(id);
        this.currentState="PIECESELECT";
    }

    if(this.currentState=="PIECESELECT" && id<200){

    }
}

Morreli.prototype.getValidMoves=function(selected){
    var self=this;
    var pos= this.getCoords(selected-201);
    this.connection.validMoves(this.board.logicBoardInitial,this.size,this.player,pos.x+1,pos.y+1, function(positions) {
       self.board.highlightPath(positions);
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