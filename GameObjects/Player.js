
import Animation from "../Components/Animation.js";
import GameObject from "./GameObject.js";

//////////////////////////////////////////////////////////////////
//
// PLAYER CLASS:
//      Decription: This class repersents the player character. This class will contain all player data
//                  and will update based on user input, such as movement (with arrow keys), state, 
//                  
//                  
//                
//
///////////////////////////////////////////////////////////////////



export default class Player extends GameObject {
    constructor(spritesheet, size, gameManager) {
        super(size, true, true, "player");
        this.gameManager = gameManager;
        this.animation = new Animation(spritesheet, 0, 9, 5, true); 
        this.health = 100;
        this.rupees = 0;
        this.speed = 0.10;
        this.forcedAnimation = false;
        this.direction = "down";
        this.damageable = true;

        this.leftYFrame;
        this.rightYFrame;
        this.upYframe;
        this.downYFrame;

    
        

        this.held_keys = [];
        this.keys = { 37: "left", 38: "up", 39: "right", 40: "down" };
        

      
      

    }

    setDirectionalFrames(leftY, rightY, upY, downY){
        this.leftYFrame = leftY
        this.rightYFrame = rightY
        this.upYframe = upY;
        this.downYFrame = downY;

    }


    setDirection(direction){
        if (direction != null) {
            this.direction = direction;
        }
        
    }

    addRupee(value){
        this.rupees += value;
        this.gameManager.updateRupees(this.rupees);

    }






    



    /////////////////////////////////////////
    //
    // MOVEMENT
    //
    /////////////////////////////////////////

    movementInput(type, key) {
        /*
         * MovementInput() manages keyboard inputs through the use of 
         * the global variable, held_keys, whereby, either a keydown or
         * keyup event, e, is accepted as input of type, type
         *
         * if a keydown event occurs, if any keys are already down, the input is
         * added as the first element in the held_keys array, and unshifts other elements.
         * when keyup event occurs, the key direction is removed from held_keys
         */
       
        let direction = this.keys[key]; // returns the value of the key:value pair which matches the keycode
        switch (type) {
            case "keydown":
                if (direction && this.held_keys.indexOf(direction) === -1) {
                    // stores the key being pressed as the first element in the held_keys array
                    this.held_keys.unshift(direction);
                }

                break;

            case "keyup":
                let index = this.held_keys.indexOf(direction);
                if (index > -1) {
                    this.held_keys.splice(index, 1);
                }

                break;
        }
    }







    update(){
        this.setDirection(this.held_keys[0]);
        if (this.canMove(this.held_keys[0])) {
            //console.log(this.boxCollider);
            switch (this.held_keys[0]) {
                case 'right':
                    this.x += this.speed;
                    //console.log("Move Right");
                    break;
                case 'left':
                    this.x -= this.speed;
                    //console.log("Move Left");
                    break;
                case 'up':
                    this.y -= this.speed;
                    //console.log("Move Up");
                    break;
    
                case 'down':
                    this.y += this.speed;
                    //console.log("Move Down");
                    break;
    
                default:
                  
                    
            }
        
        

           
    
            

        }

        //console.log(this.boxCollider.collisions)
        this.movementAnimation(this.held_keys[0]);
        //this.updateCollider();




        for (let child of this.children){
            child.update();
        }

    }


    action(){

        switch(this.boxCollider.collisionData.collisionTag){
            case "npc":
                //action here
                console.log("action function");
            
            default:
                


        }
        
        
        

    }





   





    ///////////////////////////////////////////////
    //
    // ANIMATION
    //
    //////////////////////////////////////////////

    movementAnimation(direction) {
        /* PlayerAnimation() is a specalized fucntion used for character animations
         * which allows for change in animation based on game logic -- currently changes based on
         * player input
         * 
         */

        if (!this.animation.triggeredAnimation){
            switch (direction) {
                case "right":
                    this.animation.currentFrameY = this.rightYFrame;
                    
                    break;
    
                case "left":
                    this.animation.currentFrameY = this.leftYFrame;
                    
                    break;
    
                case "up":
                    this.animation.currentFrameY = this.upYframe;
                   
                    break;
    
                case "down":
                    this.animation.currentFrameY = this.downYFrame;
                
                    break;
    
                default:
                    this.animation.currentFrameX = 0;
                    break;
    
                
                    
                    
            }
    
            this.animation.loopAnimation();
    
    
           

        }

        
       
    }


    death(){
        this.animation.startTriggeredAnimation(8);
    }


    slice(){
        //console.log(this.direction);
            
        switch(this.direction){
            case 'right':
                this.animation.startTriggeredAnimation(5);
                break;
            case 'left':
                this.animation.startTriggeredAnimation(4);
                break;
            case 'up':
                this.animation.startTriggeredAnimation(6);
                break;
            case 'down':
                console.log("down slice")
                this.animation.startTriggeredAnimation(7);
                break;

            default:
        }
                
    }


    canMove(direction){
        switch (direction){
            case 'right':
                if (this.boxCollider.collisionData.right) {
                    return false;
                }
                break;
               
            case 'left':
                if (this.boxCollider.collisionData.left) {
                    return false;
                }
                break;
                
            case 'up':
                if (this.boxCollider.collisionData.top) {
                    return false;
                }
                break;
               

            case 'down':
                if (this.boxCollider.collisionData.bottom) {
                    return false;
                }
                break;
                
        }

        return true

        
    }


    updateCollider(){
        this.boxCollider.update(this.xref + this.x, this.yref + this.y); // GameObject should have this method defined without passing varaibles
    }

    






}