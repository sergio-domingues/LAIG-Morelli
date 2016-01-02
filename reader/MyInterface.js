/**
 * MyInterface
 * @constructor
 */
function MyInterface() {
    //call CGFinterface constructor 
    CGFinterface.call(this);
}
;

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);
    
    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui
    
    this.gui = new dat.GUI();
    this.scene = application.scene;
    this.scenesNames = ["JAPANESE", "WINTER", "MOON"];
    this.gamemode = ["human", "bot1", "bot2"];
    this.selectedScene = "JAPANESE";
    this.whitePlayer = "human";
    this.blackPlayer = "human";
    this.lightsFolder = {};
    this.movieButton;
    this.size = 13;
    this.lights=[];
    var interface = this;
    
    //botao undo
    
    this.gameFolder = this.gui.addFolder('Game');
    this.gameFolder.open();
    
    this.gameFolder.add(this, "undo");
    
    var selectedScene = this.gameFolder.add(this, 'selectedScene', this.scenesNames);
    
    selectedScene.onChange(function(event) {
        var filename = "testScene.lsx";
        switch (event) {
        case "JAPANESE":
            filename = "testScene.lsx";
            break;
        case "WINTER":
            filename = "cenaAlternativa2.lsx"
            break;
        case "MOON":
            filename = "cenaAlternativa3.lsx";
            break;
        }

        new MySceneGraph(filename,interface.scene);
    });
    
    
    
    this.gameFolder.add(this, "whitePlayer", this.gamemode);
    this.gameFolder.add(this, "blackPlayer", this.gamemode);
    this.gameFolder.add(this, "size", 7, 13).step(1);
    
    this.gameFolder.add(this.scene, "start");
    
    return true;
}
;

/**
 * update
 */
MyInterface.prototype.updateInterface = function() {
    
    var interface = this;
    this.removeFolder("Luzes");
    this.lightsFolder=this.gui.addFolder('Luzes')
    
    //actualiza as luzes na interface
    for (onOff in this.scene.lightsOn) {
        this.lightsFolder.add(this.scene.lightsOn, onOff).onChange(function(enabled) {
            interface.scene.updateGuiLights(this.property, enabled);
        });
        
    }

}
;

//MyInterface.prototype.processMouse = function() {}

MyInterface.prototype.removeFolder = function(name) {
  var folder = this.gui.__folders[name];
  if (!folder) {
    return;
  }
  folder.close();
  this.gui.__ul.removeChild(folder.domElement.parentNode);
  delete this.gui.__folders[name];
  this.gui.onResize();
}

MyInterface.prototype.undo = function() {
    this.scene.morreli.undo();

}

MyInterface.prototype.movie = function() {
    this.scene.morreli.movie();

}