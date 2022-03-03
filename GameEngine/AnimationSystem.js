/*


ANIMATIONSYSTEM CLASS:
    Decription: The AnimationSystem class functions to control and run the animations of gameObjects,
                taking into account speed, active state, and tag of object.

    Fields: 
        animations(animation[]): an array of all animation objects to be animated
        systemSpeed(int): an integer that allows for control of animation speed by comparing with the speed of the animation and the modular produced
        active(bool): state of animation system: when true, animationsystem runs animations, when false, animation system does nothing
        
      

*/


export default class AnimationSystem {
    constructor() {
        this.objects = [];
        this.animations = [];
        this.systemSpeed = 1;
        this.active = true;
    }


    addAnimations(gameobjects) {
        /* 
        addAnimations() appends all gameobjects in gameObjects[] to animations[] 
         */
        for (let object of gameobjects) {
            if (object != null) {
                this.objects.push(object);
            }
        }
    }

    update() {
        /*
         animate() iterates through every Animation object in animations[] and calls 
         the associated animation function which increments to the next horizontal frame 
         in the animation

         - It also iterates through all children gameObjects of an object and animates those
          
         Note: methods that are constantly called by "requestAnimationFrame()" should NOT:
                   => create new varaibles (i.e let x = 5) as it is extremely costly
         */
        
       

        for (let object of this.objects) {
            this.animate(object.animation);

            for (let child of object.children){
                this.animateChildren(child);
            }
                
        }

        this.systemSpeed += 1;

        if (this.systemSpeed > 10) {
            this.systemSpeed = 1;
        }
        

    }


    animateChildren(object){
        /*
        animateChild() animates a childObject, object, and recursivly animates all children of that
        object and its children
        */
            this.animate(object.animation);

            for (let child of object.children){
                this.animateChildren(child);
            }
                
    }



    animate(animation){
        /*
        animate() handles the logic for when/how to step through a GameObjects animation
        */
        if (animation.active && this.systemSpeed % animation.speed == 0) {

            if (animation.triggeredEndAnimation){
                animation.runEndingAnimation();
            } else if (animation.pairedEndingAnimation) {
                animation.runPairedEndingAnimation();
                
            } else if (animation.triggeredAnimation){
                animation.runTriggeredAnimation();
            } else if (animation.pairedAnimation){
                animation.runPairedAnimation();
            } else {
                animation.stepAnimation(); 

            }
           
        }

    }

    


    reset(){
        this.objects = [];
    }


    



}