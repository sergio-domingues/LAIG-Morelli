/**
 * Represents a composed animation
 * @constructor
 */
function ComplexAnimation(){
    this.currentAnim=0;
    this.anim=[];
    this.done=false;
}

ComplexAnimation.prototype.constructor = ComplexAnimation;

/**
 * Stores an animation id
 * @param {string} id - animation id
 */
ComplexAnimation.prototype.addAnimation = function(anim){
    if(anim instanceof Animation)
        this.anim.push(anim);
}

ComplexAnimation.prototype.addTime=function(time){
    var anim=this.anim[this.currentAnim]
    if(!anim.done){
        anim.addTime(time);
    }else if(this.currentAnim+1==this.anim.length){
        this.done=true;
    }else{
        this.currentAnim++;
    }
}

/**
 * Returns an animation id
 * @param {int} indice - animations index 
 */
ComplexAnimation.prototype.getAnim = function(indice){
    return indice < this.animationsIDs.length ? this.animationsIDs[indice] : "Composed Animation: trying to access outside of array";
}


ComplexAnimation.prototype.getCurrentAnim = function(){
    return this.anim[this.currentAnim];
}

ComplexAnimation.prototype.isDone = function() {
    for(var i = 0 ; i < this.anim.length; i++){
        if(!this.anim[i].isDone())
            return false;
    }
    return true;
}

ComplexAnimation.prototype.isActive = function(){

    if(this.anim.length > 0){
        return this.anim[0].isActive();
    }else
        return false;
}

ComplexAnimation.prototype.setActive = function(){
    
     if(this.anim.length > 0){
        this.anim[0].setActive();
    }
}