/*

COLLISION-SYSTEM CLASS:
    Decription: The CollisionSystem class functions to check collisionData between
                different zoneCollider component for all currently active GameObjects

                The collisionDataystem will determine the side in which collision occured 
                between two object, and update the BoxColiider of both objects (which is used
                to control game logic and events such as object movement, and in-game events)

                to be implemented->
                    - spatial partitioning

    Fields:
        2Dcolliders (zoneCollider[]): An array of gameObject zoneColliders  

        
        
      

*/


export default class ZoneCollisionSystem {
    constructor(){
        this.player;
        this.zoneColliderGameObjects = [];
     
      
        this.distanceRight;
        this.distanceLeft;
        this.distanceTop;
        this.distanceBottom;
        this.collisionList = {right: false, left: false, top: false, bottom: false};
        
        this.performanceCheck = true;
        this.checkCount = 0;
        
    }

    setPlayer(player){
        this.player = player;
    }


    addGameObjects(objects){
        /*
        addGameObjects() adds all GameObjects with zoneColliders
        */
        for (let object of objects){
        
            if (object != null && object.zoneCollider != null) {
                this.zoneColliderGameObjects.push(object);
            } 
            
        }

    }




    update(){
        /*
        update() iterates through all gameObjects with a zoneCollider and checks if they collide with the player boxCollider, as
        performance may suffer signficantly if we checked all boxColliders
        */

        this.checkCount = 0;

        for (let gameObject of this.zoneColliderGameObjects){
            this.collisionList.right = false;
            this.collisionList.left = false;
            this.collisionList.top = false;
            this.collisionList.bottom = false;

            // if the gameObject with the zoneCollider is onScreen and its zoneCollider is active, check if it collides wit the player boxCollider
            if (gameObject.onScreen && gameObject.zoneCollider.active){
                if (this.player != null & this.player.boxCollider.active){
                    if (this.collision(gameObject.zoneCollider, this.player.boxCollider)){
                        this.setZoneCollision(gameObject, this.player);

                    }

                }
      
                gameObject.zoneCollider.checkCollisions(this.collisionList);


            }

            

            // checking for ZoneCollisions for all childObjects
            for (let child of gameObject.children){
                this.childZoneColliders(child);

                }
               

           
            
           
           
        }
    }


    setZoneCollision(object1, player){
        /*
        setCollision() updates the collision data of each GameObjects' zoneCollider, with fields
        such as the tag of the object which it collided with, the object itself, and the side that 
        collision occured
        */

        //console.log(object2);
        object1.zoneCollider.addCollision(player);
        this.applyZoneCollision(object1.zoneCollider, player.boxCollider);
    }


    


    applyZoneCollision(collider1, collider2){
        /*
        applyCollision() updates the collision data of each zoneCollider, collider1, and collider2, with fields
        such as the tag of the object which it collided with, and the side that collision occured
        */
       
        // checks distance between the sides of each collider to see which side is colliding
        this.distanceRight = Math.abs(collider1.sides.right - collider2.sides.left);
        this.distanceLeft = Math.abs(collider1.sides.left - collider2.sides.right);
        this.distanceTop = Math.abs(collider1.sides.top - collider2.sides.bottom);
        this.distanceBottom = Math.abs(collider1.sides.bottom - collider2.sides.top);

        switch(this.sideOfCollision(this.distanceRight, this.distanceLeft, this.distanceTop, this.distanceBottom)){
            case "right":
                collider1.collisionData.right = true;
                this.collisionList.right = true;
                break;
            case "left":
                collider1.collisionData.left = true;
                this.collisionList.left = true;
                break;
            case "top":
                collider1.collisionData.top = true;
                this.collisionList.top = true;
                break;
            case "bottom":
                collider1.collisionData.bottom = true;
                this.collisionList.bottom = true;
                break;
        } 
    }


    childZoneColliders(child) {
        /*
        update() iterates through all GameObjects in dynamicGameObjects and determines if a collision occurs between
        two or more objects. If a collision occurs, the zoneCollider component of each object is updated

        Note: dynamicGameObjects are compared with all other GameObjects, however, staticGameObjects are not compared
              as only dynamicGameObjects will ever change the zoneCollider data of objects
        */

        
        this.collisionList.right = false;
        this.collisionList.left = false;
        this.collisionList.top = false;
        this.collisionList.bottom = false;
        
        if (child.active && child.zoneCollider != null && child.zoneCollider.active){
           if (this.player != null & this.player.boxCollider.active){
                    if (this.collision(child.zoneCollider, this.player.boxCollider)){
                        this.setZoneCollision(child, this.player);
    
                    }

                    child.zoneCollider.checkCollisions(this.collisionList);
                }
            }
            
            
        

        }
    




    



    
    collision(collider1, collider2) {
        /*
        collision() returns true if a collision has occured between collider1 and collider2
        */
       
        
        if (collider1.sides.left < collider2.sides.right && collider1.sides.right > collider2.sides.left && 
            collider1.sides.top < collider2.sides.bottom && collider1.sides.bottom > collider2.sides.top) {
                return true;
        }

        return false
        



    }


    sideOfCollision(right, left, top, bottom){
        /*
        sideOfCollision() returns the string, right, left, top, or bottom, that indicates the side of an object
        that has collided with another object
        */
        switch(Math.min(right, left, top, bottom)) {
            case right:
                return "right";
                
            case left:
                return "left";
                
            case top:
                return "top";
                
            case bottom:
                return "bottom";
                
        }
    }





    reset(){
        /*
        reset() empties the zoneColliders currently observed by the collisionDataystem
        */
       this.zoneColliderGameObjects = [];
       
    }






    /////////////////////////////////////////////////////////////
    //
    // ERROR/PERFORMANCE DETECTION
    // 
    /////////////////////////////////////////////////////////////


    
    checkPerformance(){
        if (this.performanceCheck){
            console.log("COLLISION-SYSTEM PERFORMANCE: ")
            console.log("->Number of Checks Per Frame: " + this.checkCount);

            this.performanceCheck = false;
            setTimeout(() => {
                this.performanceCheck = true;
            }, 5000);
        }
    }


}