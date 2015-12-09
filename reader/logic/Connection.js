function Connection(size) {
    this.connected = false;
    this.init();

}

Connection.prototype.constructor = Connection;


Connection.prototype.init = function() {
    var self = this;
    this.getPrologRequest("handshake", function(data) {
        if (data.target.response == "handshake") {
            self.connected = true;
        } else {
            self.connected = false;
        }
        ;
    });
}

Connection.prototype.initTabuleiro = function(size, callback) {
    var self=this;
    this.getPrologRequest("iniciaTabuleiro(" + size + ")", function(data) {
        console.log(data.target.response);
        var tabuleiro=self.tabPrologToJavascript(data.target.response);
        if (typeof callback === "function") {
            callback(tabuleiro);
        }
    });
}

Connection.prototype.validMoves = function(board,size,player,x,y, callback) {
    this.getPrologRequest("validMoves(" + this.tabJavascriptToProlog(board) +","+size+","+player+","+x+","+y+")", function(data) {
        console.log(data.target.response);
        var validmoves = JSON.parse(data.target.response);
        if (typeof callback === "function") {
            callback(validmoves);
        }
    });
}

Connection.prototype.movePiece = function(board,size,player,x,y,xf,yf, callback) {
    var self=this;
    this.getPrologRequest("movePiece(" + this.tabJavascriptToProlog(board) +","+size+","+player+","+x+","+y+","+xf+","+yf+")", function(data) {
        console.log(data.target.response);
        var newTab = self.tabPrologToJavascript(data.target.response);
        if (typeof callback === "function") {
            callback(newTab);
        }
    });
}

Connection.prototype.tabPrologToJavascript=function(tab){
    var tabuleiroJSON =tab.replace(/b/g, -1);
    var tabuleiro = JSON.parse(tabuleiroJSON);
    return tabuleiro;
}

Connection.prototype.tabJavascriptToProlog=function(tab){
    var tabuleiro = JSON.stringify(tab);
    var tabuleiroString =tabuleiro.replace(/-1/g, "b");
    return tabuleiroString;
}

Connection.prototype.getPrologRequest = function(requestString, onSuccess, onError, port) {
    
    var requestPort = port || 8081
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);
    
    request.onload = onSuccess || function(data) {
        console.log("Request successful. Reply: " + data.target.response);
    }
    ;
    request.onerror = onError || function() {
        console.log("Error waiting for response");
    }
    ;
    
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
}
