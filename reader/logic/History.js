function History(scene) {
    this.boardHistory=[];
    
}

History.prototype.constructor = CapturePieceAnimation;

History.prototype.push =function(board){
    if(board typeof Array){
        this.boardHistory.push(board);
        return true;
    }else{
        return false;
    }
}

History.prototype.pop =function(){
   return this.boardHistory.pop();
}

History.prototype.length = function(){
    return this.boardHistory.length;
}

History.prototype.top = function(){
    return this.boardHistory[this.boardHistory.length-1];
}


