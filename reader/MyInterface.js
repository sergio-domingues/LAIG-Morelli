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
    this.scenesNames = ["testScene.lsx", "triangulo.lsx"];
    this.gamemode = ["human", "bot1", "bot2"];
    this.selectedScene = 0;
    this.whitePlayer = "human";
    this.blackPlayer = "human";
    this.lightsFolder = this.gui.addFolder('Luzes');
    this.size = 11;
    var interface = this;
    
    //botao undo
    
    var gameFolder = this.gui.addFolder('Game');
    gameFolder.open();
    
    gameFolder.add(this.scene.morreli, "undo");
    gameFolder.add(this.scene.morreli, "movie");
    
    var selectedScene = gameFolder.add(this, 'selectedScene', this.scenesNames);
    
    selectedScene.onChange(function(event) {
        new MySceneGraph(event,interface.scene);
    });
    
    
    
    gameFolder.add(this, "whitePlayer", this.gamemode);
    gameFolder.add(this, "blackPlayer", this.gamemode);
    gameFolder.add(this, "size", 7, 13).step(1);
    
    gameFolder.add(this.scene, "start");
    
    return true;
}
;

/**
 * update
 */
MyInterface.prototype.updateInterface = function() {
    
    var interface = this;
    
    //actualiza as luzes na interface
    for (onOff in this.scene.lightsOn) {
        this.lightsFolder.add(this.scene.lightsOn, onOff).onChange(function(enabled) {
            interface.scene.updateGuiLights(this.property, enabled);
        });
    }
}
;

//MyInterface.prototype.processMouse = function() {}
