import GameObject from "./GameObject.js";
import Animation from "../Components/Animation.js";

import MovementController from "../Components/MovementController.js";


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// NPC CLASS:
//      Decription: The NPC class will act as the parent
//                  
//                
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////








export default class NPC extends GameObject{
    constructor(spritesheet, size, xframe, yframe) {
        super(size, true, true, "npc");
        this.animation = new Animation(spritesheet, xframe, yframe, 7, true);
        this.leftYFrame;
        this.rightYFrame;
        this.upYframe;
        this.downYFrame;
        this.range = 100;
        this.speed = 1;
        this.dialog;
        this.movementController = new MovementController(this, this.range);
        

    }




    ////////////////////////////////////////////////////////////////////////////
    //
    // SETTER METHODS
    //
    ////////////////////////////////////////////////////////////////////////////

    setDialog(rootNode){
        this.dialog = rootNode;
    }

    setDirectionalFrames(leftY, rightY, upY, downY){
        this.leftYFrame = leftY
        this.rightYFrame = rightY
        this.upYframe = upY;
        this.downYFrame = downY;

    }

    setMovementController(movement, range, speed){
        this.movementController.setMovementControlFunction(movement, null);
        this.movementController.range = range;
        this.speed = speed;
    }


    getDialog(){
        return this.dialog;
    }



  
    update(){
        this.updateChildren();

        if (this.boxCollider.collisionData.collisionTag == "player"){
            this.animateCollision();
            
        } else {
            this.movementController.move();
            this.animateDirection();

        }
       

    
    }



    animateDirection(){
       switch(this.movementController.getDirection()){
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
       }

    }



    animateCollision(){
        if (this.boxCollider.collisionData.left) {
            this.animation.currentFrameY = this.leftYFrame;
            this.animation.currentFrameX = 0;

        }

        if (this.boxCollider.collisionData.right) {
            this.animation.currentFrameY = this.rightYFrame;
            this.animation.currentFrameX = 0;

        }

        if (this.boxCollider.collisionData.top) {
            this.animation.currentFrameY = this.upYframe;
            this.animation.currentFrameX = 0;

        }

        if (this.boxCollider.collisionData.bottom) {
            this.movementController.down = false;
            this.animation.currentFrameY = this.downYFrame;
            this.animation.currentFrameX = 0;

        }
    }

}