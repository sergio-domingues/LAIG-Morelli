function History() {
    this.boardHistory=[];
    
}

History.prototype.constructor = History;

History.prototype.push =function(board){
    if(board instanceof Array){
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

History.prototype.diff = function(tabNew) {
    var tabOld=this.top();
    var size = tabNew.length;
    var newPos = [];
    var oldPos = [];
    var capture = [];
    
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            
            if (tabOld[i][j] != tabNew[i][j] && !(i==Math.floor(size/2) && j==Math.floor(size/2))) {
                if (tabOld[i][j] == -1 && tabNew[i][j] != -1) {
                    piece = tabNew[i][j];
                    newPos[0] = j;
                    newPos[1] = i;
                } else if (tabOld[i][j] != -1 && tabNew[i][j] == -1) {
                    piece = tabNew[i][j];
                    oldPos[0] = j;
                    oldPos[1] = i;
                } else if (tabOld[i][j] == (1 - tabNew[i][j])) {
                    capture.push(j, i);
                }
            }
        }
    }
    
    return {
        "move": {
            "new": newPos,
            "old": oldPos
        },
        "capture": capture,
        "throne": tabNew[Math.floor(size / 2)][Math.floor(size / 2)]%10
    
    }

}

History.prototype.undo = function() {
    var diff=this.diff(this.boardHistory[this.boardHistory.length-2]);
    this.pop();
    return diff;
}