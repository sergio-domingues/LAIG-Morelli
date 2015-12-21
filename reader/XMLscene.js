/**
 * Represents a XML Scene
 * @constructor
 */
function XMLscene() {
    CGFscene.call(this);
    
    //cria arvore (grafo) que aramazena nodes/leafs
    this.graph_tree = new GraphTree();
    
    this.currentAnimation = 0;
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;


XMLscene.prototype.updateCurrAnim = function() {
    this.currentAnimation++;
}


/**
 * Initializes lights, camera, axis and other scene's properties
 * @param {object} application 
 */
XMLscene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);
    
    this.lightsOn = [];
    this.animations = [];
    
    this.initCameras();
    
    
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    
    //Transparencia nas texturas
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_DST_ALPHA);
    
    this.enableTextures(true);
    
    this.materialDefault = new CGFappearance(this);
    
    this.axis = new CGFaxis(this);
    
    this.interface = {};


    this.borda=new CGFtexture(this,"resources/borda.png");

    this.amarelo=new CGFappearance(this);
    this.amarelo.setAmbient(1,1,0,1);
    this.amarelo.setDiffuse(1,1,0,1); 
    this.amarelo.setSpecular(1,1,0,1); 
    this.amarelo.setShininess(100); 

    this.bordaBlue = new CGFtexture(this,"resources/bordaSelected.png");
    
    this.morreli = new Morreli(this,9,["bot2","bot1"]);
    
    this.yellow = new CGFappearance(this);
    this.yellow.setAmbient(1, 1, 0, 1);
    this.yellow.setDiffuse(1, 1, 0, 1);
    this.yellow.setSpecular(1, 1, 0, 1);
    this.yellow.setShininess(100);
    
    this.red = new CGFappearance(this);
    this.red.setAmbient(1, 0, 0, 0.1);
    this.red.setDiffuse(1, 0, 0, 0.1);
    this.red.setSpecular(1, 0, 0, 0.1);
    this.red.setShininess(100);
    
    this.green = new CGFappearance(this);
    this.green.setAmbient(0, 1, 0, 1);
    this.green.setDiffuse(0, 1, 0, 1);
    this.green.setSpecular(0, 1, 0, 1);
    this.green.setShininess(100);
    
    this.blue = new CGFappearance(this);
    this.blue.setAmbient(0, 0, 1, 1);
    this.blue.setDiffuse(0, 0, 1, 1);
    this.blue.setSpecular(0, 0, 1, 1);
    this.blue.setShininess(100);
    
    this.orange = new CGFappearance(this);
    this.orange.setAmbient(1, 0.5, 0, 1);
    this.orange.setDiffuse(1, 0.5, 0, 1);
    this.orange.setSpecular(1, 0.5, 0, 1);
    this.orange.setShininess(100);
    
    this.purple = new CGFappearance(this);
    this.purple.setAmbient(0.5, 0, 0.5, 1);
    this.purple.setDiffuse(0.5, 0, 0.5, 1);
    this.purple.setSpecular(0.5, 0, 0.5, 1);
    this.purple.setShininess(100);
    
    this.purplefagg = new CGFappearance(this);
    this.purplefagg.setAmbient(0.4, 0, 0.8, 1);
    this.purplefagg.setDiffuse(0.4, 0, 0.8, 1);
    this.purplefagg.setSpecular(0.4, 0, 0.8, 1);
    this.purplefagg.setShininess(100);

    this.white = new CGFappearance(this);
    this.white.setAmbient(1, 1, 1, 1);
    this.white.setDiffuse(1, 1, 1, 1);
    this.white.setSpecular(1, 1, 1, 1);
    this.white.setShininess(100);

    this.black = new CGFappearance(this);
    this.black.setAmbient(0, 0, 0, 1);
    this.black.setDiffuse(0, 0, 0, 1);
    this.black.setSpecular(0, 0, 0, 1);
    this.black.setShininess(100);
    
    this.colors = [this.red, this.orange, this.yellow, this.green, this.blue, this.purplefagg, this.purple];
    
    this.setUpdatePeriod(100);
    
    this.setPickEnabled(true);
   
    
}
;

/** Initializes cameras */
XMLscene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(15, 15, 15),vec3.fromValues(0, 0, 0));
}
;

/** Set's the default appearance to be apllied on the scene's objects (if no other texture is apllied) */
XMLscene.prototype.setDefaultAppearance = function() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
}
;

/** Handler called when the graph is finally loaded.
* Set scene's properties with the values parsed from the XML 
* As loading is asynchronous, this may be called already after the application has started the run loop
*/
XMLscene.prototype.onGraphLoaded = function() 
{
    this.setGlobalAmbientLight(this.ambient.r, this.ambient.g, this.ambient.b, this.ambient.a);
    this.camera.near = this.frustum.near;
    this.camera.far = this.frustum.far;
    this.axis = new CGFaxis(this,this.axis_length);
    this.gl.clearColor(this.background.r, this.background.g, this.background.b, this.background.a);
    
    for (var i = 0; i < this.lights_map.length; i++) {
        this.lightsOn[this.lights_map.get(i)] = this.lights[i].enabled;
    }
    
    for (var i = 0; i < this.animations.length; i++) {
        this.animations[i].init();
    }
    
    this.interface.updateInterface();
}
;

/** Update scene's lights */
XMLscene.prototype.updateLights = function() {
    
    for (var j = 0; j < this.lights.length; j++) {
        this.lights[j].update();
    }
}
;

XMLscene.prototype.logPicking = function() 
{
    if (this.pickMode == false) {
        if (this.pickResults != null  && this.pickResults.length > 0) {
            for (var i = 0; i < this.pickResults.length; i++) {
                var obj = this.pickResults[i][0];
                if (obj) 
                {
                    var customId = this.pickResults[i][1];
                    this.morreli.updateClick(customId,this.pickResults[i][0]);
                    console.log("Picked object: " + obj + ", with pick id " + customId);
                }
            }
            this.pickResults.splice(0, this.pickResults.length);
        }
    }
}

/** Set's scene's interface (MyInterface) */
XMLscene.prototype.setInterface = function(interface) {
    this.interface = interface;
}

/** Displays the scene */
XMLscene.prototype.display = function() {
    // ---- BEGIN Background, camera and axis setup
    //this.setActiveShader();
    
    this.logPicking();
    this.clearPickRegistration();
    
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();
    
    this.setDefaultAppearance();
    
    this.axis.display();
    
    // ---- END Background, camera and axis setup
    
    // it is important that things depending on the proper loading of the graph
    // only get executed after the graph has loaded correctly.
    // This is one possible way to do it
    
    if (this.graph.loadedOk === true) 
    {
        this.multMatrix(this.initialTransformation);
        
        
        this.updateLights();
        this.morreli.display();
        //this.getObjects(this.graph_tree.root_id);
    }

}
;

/**
 * Core recursive function responsible to interpret the graphtree elements as well as apllying the correct textures/materials and transformations
 * @param {integer} currNodeId - id of the current node  
 * @param {integer} textId - texture's id
 * @param {integer} materialId - material's id
 */
XMLscene.prototype.getObjects = function(currNodeId, textId, materialId) {
    
    var currNode = this.graph_tree.graphElements.get(currNodeId);
    var nextTextId, nextMaterialId;
    var matrixAnim = mat4.create();
    
    if (currNode instanceof GraphTree_node) {
        
        if (currNode.texture_id == "null") {
            nextTextId = textId;
        } else if (currNode.texture_id == "clear") {
            nextTextId = undefined;
        } else {
            nextTextId = currNode.texture_id;
        }
        
        if (currNode.material_id == "null") {
            nextMaterialId = materialId;
        } else {
            nextMaterialId = currNode.material_id;
        }
        
        
        if (currNode.cmpAnims.animationsIDs.length != 0) {
            
            //index outside bounds
            if (this.currentAnimation >= currNode.cmpAnims.animationsIDs.length) {
                //last index
                this.currentAnimation = currNode.cmpAnims.animationsIDs.length - 1;
            }
            
            for (var i = 0; i < this.animations.length; i++) {
                if (currNode.getCurrAnim(this.currentAnimation) == this.animations[i].id) {
                    this.animations[i].setActive();
                    matrixAnim = this.animations[i].getMatrix();
                    break;
                }
            }
        }
        
        for (var i = 0; i < currNode.descendants.length; i++) {
            this.pushMatrix();
            
            this.multMatrix(matrixAnim);
            this.multMatrix(currNode.getMatrix());
            this.getObjects(currNode.descendants[i], nextTextId, nextMaterialId);
            this.popMatrix();
        }
    
    } else if (currNode instanceof GraphTree_leaf) {
        var material = this.materials.get(materialId);
        var text = this.textures.get(textId);
        
        if (material !== undefined) {
            material.apply();
        }
        
        if (text !== undefined) {
            currNode.object.updateTexCoords(text.amplif_s, text.amplif_t);
            text.bind();
        }
        
        currNode.object.display();
        
        if (text !== undefined) {
            text.unbind();
        }
        
        if (material !== undefined) {
            this.materialDefault.apply();
        }
    }
}



/**
 * Updates the scene lights.
 * @param {integer} lightId - scene's light's id
 * @param {boolean} enabled - true if the light is enabled, false otherwise
 */
XMLscene.prototype.updateGuiLights = function(lightId, enabled) {
    for (var i = 0; i < this.lights_map.length; i++) {
        if (this.lights_map.get(i) == lightId) {
            if (this.lights[i].enabled) {
                this.lights[i].disable();
            } else
                this.lights[i].enable();
        }
    }
    return;
}


XMLscene.prototype.update = function(currTime) {
    
    //problema: da update mesmo que animacao nao esteja activa
    //edited provavelmente ja nao da update
    
    for (var i = 0; i < this.animations.length; i++) {
        //enquanto animacao nao terminar
        if (!this.animations[i].done && this.animations[i].active) {
            this.animations[i].addTime(currTime);
        }
    }

    this.morreli.updateTime(currTime);
}
