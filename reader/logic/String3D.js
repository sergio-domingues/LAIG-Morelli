function String3D(scene, string) {
    this.scene = scene;
    this.string = string;
    
    this.letter3D;
    this.appearance;
    this.fontTexture;
    this.textShader;
    
    this.init();
}

String3D.prototype.constructor = String3D;

String3D.prototype.init = function() {
    
    this.appearance = new CGFappearance(this.scene);
    this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
    this.appearance.setShininess(120);
    
    // font texture: 16 x 16 characters
    // http://jens.ayton.se/oolite/files/font-tests/rgba/oolite-font.png
    this.fontTexture = new CGFtexture(this.scene,"resources/oolite-font.png");
    this.appearance.setTexture(this.fontTexture);
    
    // plane where texture character will be rendered
    this.letter3D = new MyRectangle(this.scene,0,1,1,0);
    
    // instatiate text shader
    this.textShader = new CGFshader(this.scene.gl,"shaders/font.vert","shaders/font.frag");
    
    // set number of rows and columns in font texture
    this.textShader.setUniformsValues({
        'dims': [16, 16]
    });
    
}
;


String3D.prototype.getLetterCoos = function(letter) {
    var coo;
    
    switch (letter) {
    case 'A':
        return coo = [1, 4];
        break;
    case 'B':
        return coo = [2, 4];
        break;
    case 'C':
        return coo = [3, 4];
        break;
    case 'D':
        return coo = [4, 4];
        break;
    case 'E':
        return coo = [5, 4];
        break;
    case 'F':
        return coo = [6, 4];
        break;
    case 'G':
        return coo = [7, 4];
        break;
    case 'H':
        return coo = [8, 4];
        break;
    case 'I':
        return coo = [9, 4];
        break;
    case 'J':
        return coo = [10, 4];
        break;
    case 'K':
        return coo = [11, 4];
        break;
    case 'L':
        return coo = [12, 4];
        break;
    case 'M':
        return coo = [13, 4];
        break;
    case 'N':
        return coo = [14, 4];
        break;
    case 'O':
        return coo = [15, 4];
        break;
    case 'P':
        return coo = [0, 5];
        break;
    case 'K':
        return coo = [1, 5];
        break;
    case 'R':
        return coo = [2, 5];
        break;
    case 'S':
        return coo = [3, 5];
        break;
    case 'T':
        return coo = [4, 5];
        break;
    case 'U':
        return coo = [5, 5];
        break;
    case 'V':
        return coo = [6, 5];
        break;
    case 'W':
        return coo = [7, 5];
        break;
    case 'X':
        return coo = [8, 5];
        break;
    case 'Y':
        return coo = [9, 5];
        break;
    case 'Z':
        return coo = [10, 5];
        break;
    case '0':
        return coo = [0, 3];
        break;
    case '1':
        return coo = [1, 3];
        break;
    case '2':
        return coo = [2, 3];
        break;
    case '3':
        return coo = [3, 3];
        break;
    case '4':
        return coo = [4, 3];
        break;
    case '5':
        return coo = [5, 3];
        break;
    case '6':
        return coo = [6, 3];
        break;
    case '7':
        return coo = [7, 3];
        break;
    case '8':
        return coo = [8, 3];
        break;
    case '9':
        return coo = [9, 3];
        break;
    case ' ':
        return coo = [0, 2];
        break;
    default:
        return coo = [0, 2];
        break;
    }
}

String3D.prototype.display = function() {

    this.scene.setActiveShaderSimple(this.textShader);

    this.appearance.apply();
    this.scene.pushMatrix();

    for (var i = 0; i < this.string.length; i++) {

        var letter = this.string.charAt(i);
        var coord = this.getLetterCoos(letter);
        
        this.scene.activeShader.setUniformsValues({
            'charCoords': coord
        });
        this.scene.pushMatrix();
        //this.scene.rotate(Math.PI/2,1,1,1);
        this.letter3D.display();
        this.scene.popMatrix();
        this.scene.translate(1, 0, 0);
    }
    this.scene.popMatrix();

	this.scene.setActiveShaderSimple(this.scene.defaultShader);
}
