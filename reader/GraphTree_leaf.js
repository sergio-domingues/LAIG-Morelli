/**
 * Represents a graph tree leaf
 * @constructor
 * @param {integer} id - leaf's id
 * @param {string} type - leaf's type 
 * @param {array} args - arguments's array 
 */
function GraphTree_leaf(id,type) {

    this.id = id;
    this.type = type;
    this.object={};
}

GraphTree_leaf.prototype.constructor = GraphTree_leaf;


/**
 * Initializes the first 4 primitives corresponding to the leaf's type with the arguments (args)
 * @param {object} scene
 * @param {args} args of scene 
 */
GraphTree_leaf.prototype.createSimpleObjects = function(scene,args) {
    var array = [];

	//remove espaços entre argumentos com o uso de regex
    var str_splited = args.split(/\s+/g); //original: ["arg1 arg2 arg3 ..."] > split > { "arg1","arg2","arg3",...}
      
	//inicializa o this.object com primitiva correspondente
    switch(this.type){        
       
        case "triangle":                
            for(var i = 0; i < 9 ; i++){
                array.push( parseFloat( str_splited[i]) );
            }
            this.object=new MyTriangle(scene,array[0],array[1],array[2],array[3],array[4],array[5],array[6],array[7],array[8]);
            
            break;     
        
        case "rectangle":            
            for(var i = 0; i < 4 ; i++){
                array.push( parseFloat( str_splited[i]) ); 
            }
            this.object=new MyRectangle(scene,array[0],array[1],array[2],array[3]);
            break;             

        case "cylinder":                            
            var i;        
            for(i=0; i < 3 ; i++){
                array.push( parseFloat( str_splited[i]) ); 
            }

            for(; i < 5;i++){
                array.push( parseInt( str_splited[i],10) ); //parseInt("string",numeric_base) 
            }
            this.object=new MyCylinderSurface(scene,array[0],array[1],array[2],array[3],array[4]);
            break;              
       
        case "sphere":                                   
            for(var i=0; i < 3 ; i++){
               if(i === 0) 
                array.push( parseFloat( str_splited[i]) ); 
               else
                array.push( parseInt( str_splited[i],10) ); 
            }
            this.object=new MySphere(scene,array[0],array[1],array[2]);                        
            break;

        default: 
            return "parseArgs() -> no acceptable primitive type found ";
    }
};

/**
 * Creates a MyPLane Object with the given parameters
 * @param {object} scene
 * @param {int} parts 
 */
GraphTree_leaf.prototype.createPlaneObject = function(scene,parts){
    this.object=new MyPlane(scene,parts);               
}

/**
 * Creates a MyPLane Object with the given parameters
 * @param {object} scene
 * @param {int} order
 * @param {object} partsU
 * @param {int} partsV  
 * @param {array} controlPoints  
 */
GraphTree_leaf.prototype.createPatchObject = function(scene, order,partsU,partsV,controlPoints){
    this.object=new MyPatch(scene,order,order,partsU,partsV,controlPoints);  
}

/**
 * Creates a MyVehicle Object with the given parameters
 * @param {object} scene
 */
GraphTree_leaf.prototype.createVehicleObject = function(scene){
    this.object = new MyVehicle(scene);
}

/**
 * Creates a MyTerrain Object with the given parameters
 * @param {object} scene
 * @param {object} heightMap 
 * @param {object} colorMap 
 */
GraphTree_leaf.prototype.createTerrainObject = function(scene,heigthMap,colorMap){
    this.object = new MyTerrain(scene,heigthMap,colorMap);
}