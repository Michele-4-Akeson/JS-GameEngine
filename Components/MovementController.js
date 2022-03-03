
/*

MOVEMENTCONTROLLER CLASS:
    Decription: The MovementController class follows the stratagy design patter. Stores specific algorithms that perform
                specific movements (i.e moving in a square, moving in a straight line vertically, or horizontally, moving 
                towards a specified target, etc..). This class is provded to all gameObjects that move, and through the use 
                of the stratgy pattern, allows for swapping of movement patterns based on the state of the gameObject
    
    
    Fields: 
        gameObject(GameObject): refernece to the gameObject that the movementController is an field of
        range(float): the absolute distance the gameObject can move relative to its load position
        right/left/up/dow(bool): indicates which direction the gameObject is currently travelling
        targetGameObject(GameObejct): used when we want a this gameObeject to travel towards a target, the targetGameObject
        movementControlFunction(function): the current movement algorithm/stratgy being used to control how the given referneced gameObejct is moveing
        previousMovementControlFunction(function): the previous movement algorithm/stratgy 
        
*/


export default class MovementController{
    constructor(gameObject, range){
        this.gameObject = gameObject;
        this.range = range;
        this.right = false;
        this.left = false;
        this.up = false;
        this.down = false;
        this.active = true;
        this.targetGameObject;
        this.changingDirection = false;
        this.movementControlFunction = function() {this.stop()}
        this.previousMovementControlFunction = function() {this.stop()};
    }

    

    setDirection(direction){
        /*
        setDirection() sets the current direction the referenced gameObject is traveling to direction
        */
        switch(direction){
            case "right":
                this.right = true;
                this.left = false;
                this.up = false;
                this.down = false;
                break;
            case "left":
                this.right = false;
                this.left = true;
                this.up = false;
                this.down = false;
                break;
            case "up":
                this.right = false;
                this.left = false;
                this.up = true;
                this.down = false;
                break;  
            case "down":
                this.down = true;
                this.right = false;
                this.left = false;
                this.up = false;
                break;
            default:
                this.down = false;
                this.right = false;
                this.left = false;
                this.up = false;

                  
        }
    }




    getDirection(){
        /*
        returns the direction a gameObject is currently travelling based on the movementController
        */
        if (this.right){
            return "right";
        } 
        
        if (this.left){
            return "left";
        } 

        if (this.down){
            return "down";
        } 

        if (this.up){
            return "up";
        } 
        
        
    }


    move(){
        /*
        move() calls the movementFunction selected to operate on the gameObject by applying the movementControlFunction
        to change its x and y positon
        */
        this.movementControlFunction();
        if (this.right){
            this.gameObject.x  += this.gameObject.speed;   
        } 
        
        if (this.left) {
            this.gameObject.x  -= this.gameObject.speed;
        }

        if (this.down) {
            this.gameObject.y  += this.gameObject.speed;
        } 
        
        if (this.up) {
            this.gameObject.y  -= this.gameObject.speed;
        }

        this.handleCollision();

        
     
    }



    stop(){
        /*
        stop() is the default method of the MovementController, and doesn't change to position of the gameObject
        */
    }


    squareCheck(){
        /*
        sqaureCheck() sets the direction the gameObject should travel based on if it exceeds the boundries provided
        to it. If it exceeds a certain boundry, it is directed to travel in a differnt direction, setting a square 
        path
        */

        if (this.gameObject.x < -this.range) {
            this.left = false;
            this.down = true;

        }

        if (this.gameObject.x > this.range) {
            this.right = false;
            this.up = true;
            
        } 
        
        
        if (this.gameObject.y > this.range){
            this.down = false;
            this.right = true;
        } 
        
        if (this.gameObject.y < -this.range){
            this.up = false;
            this.left = true;
        }


    }



    handleCollision(){
        /*
        handleCollision() is used by the movementController to attempt to resolve unexpected collisions with the 
        referneced gameObject - if a collision occurs, the path the gameObject will travel is changed to try and 
        avoid another collision with other objects (with exception to the player)
        */
        if (this.gameObject.boxCollider.collisionData.collisionTag != "none"){
            if (this.gameObject.boxCollider.collisionData.left || this.gameObject.boxCollider.collisionData.right){
                this.range = Math.abs(this.gameObject.x) - 20;
        

            } else if (this.gameObject.boxCollider.collisionData.up || this.gameObject.boxCollider.collisionData.down){
                this.range = Math.abs(this.gameObject.y) - 20;
            }
    
        }
    

    }



    horizontalCheck(){
        /*
        horizontalCheck() sets the direction the gameObject should travel based on if it exceeds the boundries provided
        to it. If it exceeds a certain boundry, it is directed to travel in a differnt direction, setting a horizontal 
        path
        */
        if (this.gameObject.x < -this.range){
            this.setDirection("right");
        }
        
        if (this.gameObject.x > this.range){
            this.setDirection("left");
        }

    }


    verticalCheck(){
        /*
        verticalCheck() sets the direction the gameObject should travel based on if it exceeds the boundries provided
        to it. If it exceeds a certain boundry, it is directed to travel in a differnt direction, setting a vertical
        path
        */
        if (this.gameObject.y < -this.range){
            this.setDirection("down");
        }
        
        if (this.gameObject.y > this.range){
            this.setDirection("up");
        }

    }



    tracking(){
        /*
        tracking() sets the direction the gameObject should travel based on the location of the targetGameObject
        */
        if (this.gameObject.x + this.gameObject.xref < this.targetGameObject.x + this.targetGameObject.xref){
            this.left = false;
            this.right = true;
        } else {
            this.left = true;
            this.right = false;

        }

        if (this.gameObject.y + this.gameObject.yref < this.targetGameObject.y + this.targetGameObject.yref) {
            this.down = true;
            this.up = false;
        } else  {
            this.down = false;
            this.up = true;

        }

    }





    setMovementControlFunction(type, target){
        switch(type){
            case "square":
                this.movementControlFunction = function() {this.squareCheck()};
                this.setDirection("right");
                break;
            case "horizontal":
                this.movementControlFunction = function() { this.horizontalCheck()};
                this.setDirection("right");
                break;
            case "vertical":
                this.movementControlFunction = function() { this.verticalCheck()}
                this.setDirection("up");
                break;
            
            case "tracking":
                this.targetGameObject = target;
                this.movementControlFunction = function() {this.tracking()}
                break;
            case "stop":
                this.setDirection(null);
                this.movementControlFunction = function() {this.stop()}
                break;


        }

    }


}