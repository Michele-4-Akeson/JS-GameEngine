/*

COLLISION-SYSTEM CLASS:
    Decription: The CollisionSystem class functions to check collisionData between
                different BoxCollider component for all currently active GameObjects

                The collisionDataystem will determine the side in which collision occured 
                between two object, and update the BoxColiider of both objects (which is used
                to control game logic and events such as object movement, and in-game events)

                Optimizations:
                    The performance of the collision system is improved by using the following:
                    - the systrem only iterates through gameObjects which are dynamic (a.k.a they can move
                      positions reltaive to their load position) and checks if they've collided with any other gameObject
                    - only boxColiiders which are currently active are checked
    Fields:
        dynamicGameObjects(BoxCollider[]): the arry of all dynamic/moving GameObjects
        staticGameObjects(BoxCollider[]): the arry of all static/stationary GameObjects

        
        
      

*/


export default class CollisionSystem {
    constructor(){
        this.playerCollider;
        this.dynamicGameObjects = [];
        this.staticGameObjects = [];
      
        this.distanceRight;
        this.distanceLeft;
        this.distanceTop;
        this.distanceBottom;
        this.collisionList = {right: false, left: false, top: false, bottom: false};
        
        this.performanceCheck = false;
        this.checkCount = 0;
        
    }


    addGameObjects(objects){
        /*
        addGameObjects() adds all GameObjects with BoxColliders to either dynamicGameObjects (if 
        gameObject moves) and staticGameObjects (if gameObject does not move)
        */
        for (let object of objects){
            if (object != null && object.boxCollider != null) {
                if (object.boxCollider.dynmaic) {
                    this.dynamicGameObjects.push(object);
                } else {
                    this.staticGameObjects.push(object);
                }
            }

        }

    }




    update(){
        /*
        update() iterates through all GameObjects in dynamicGameObjects and determines if a collision occurs between
        two or more objects. If a collision occurs, the BoxCollider component of each object is updated

        Note: dynamicGameObjects are compared with all other GameObjects, however, staticGameObjects are not compared
              as only dynamicGameObjects will ever change the BoxCollider data of objects
        */

        this.checkCount = 0;

        for (let dynamicA of this.dynamicGameObjects){
            this.collisionList.right = false;
            this.collisionList.left = false;
            this.collisionList.top = false;
            this.collisionList.bottom = false;

            if (dynamicA.onScreen && dynamicA.boxCollider.active){
                
                // checking collisions with all other dynmaic(moving) gameObjects
                for (let dynamicB of this.dynamicGameObjects){ 
                    if (dynamicB.onScreen && dynamicB.boxCollider.active){
                        this.checkCount += 1;
                        if (dynamicA != dynamicB && this.collision(dynamicA.boxCollider, dynamicB.boxCollider)){
                            this.setCollision(dynamicA, dynamicB);
                        }
                   
                    }

                      // checking collisions with all children of dynmaic gameObjects
                      for (let child of dynamicB.children){
                        this.checkCount += 1
                        if (child.boxCollider != null && child.boxCollider.active && this.collision(dynamicA.boxCollider, child.boxCollider)){
                            this.setCollision(dynamicA, child);
                        }
            
                    }
                }
    

                // checking collisions with all static(non-moving) gameObjects
                // Note: the data of a Static Object's BoxCollider remains constant; if the player touches a pot, that pot will continually have "player" as the collisionTag
                // as staticObjects don't update their boxColliders
                for (let staticObject of this.staticGameObjects){
                    if (staticObject.onScreen && staticObject.boxCollider.active){
                        this.checkCount += 1
                        if (this.collision(dynamicA.boxCollider, staticObject.boxCollider)){
                            this.setCollision(dynamicA, staticObject);
                        }

                    }

                    // checking collisions with all children of dynmaic gameObjects
                    for (let child of staticObject.children){
                        this.checkCount += 1
                        if (child.boxCollider != null && child.boxCollider.active && this.collision(dynamicA.boxCollider, child.boxCollider)){
                            this.setCollision(dynamicA, child);
                        }
                
                    }
                   
                }

                dynamicA.boxCollider.checkCollisions(this.collisionList);


            }

            

            // checking for collisions for all childObjects
            for (let child of dynamicA.children){
                if (child.boxCollider != null){
                    this.childBoxColliders(child, dynamicA);

                }
               
                
            }

            this.checkPerformance();
            
           
           
        }
    }


    setCollision(object1, object2){
        /*
        setCollision() updates the collision data of each GameObjects' BoxCollider, with fields
        such as the tag of the object which it collided with, the object itself, and the side that 
        collision occured
        */

        //console.log(object2);
        object1.boxCollider.addCollision(object2);
        object2.boxCollider.addCollision(object1);
        this.applyCollision(object1.boxCollider, object2.boxCollider);
    }


    


    applyCollision(collider1, collider2){
        /*
        applyCollision() updates the collision data of each BoxCollider, collider1, and collider2, with fields
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
                collider2.collisionData.left = true;
                this.collisionList.right = true;
                break;
            case "left":
                collider1.collisionData.left = true;
                collider2.collisionData.right = true;
                this.collisionList.left = true;
                break;
            case "top":
                collider1.collisionData.top = true;
                collider2.collisionData.bottom = true;
                this.collisionList.top = true;
                break;
            case "bottom":
                collider1.collisionData.bottom = true;
                collider2.collisionData.top = true;
                this.collisionList.bottom = true;
                break;
        } 
    }


    childBoxColliders(child, parent) {
        /*
        update() iterates through all GameObjects in dynamicGameObjects and determines if a collision occurs between
        two or more objects. If a collision occurs, the BoxCollider component of each object is updated

        Note: dynamicGameObjects are compared with all other GameObjects, however, staticGameObjects are not compared
              as only dynamicGameObjects will ever change the BoxCollider data of objects
        */

        
        this.collisionList.right = false;
        this.collisionList.left = false;
        this.collisionList.top = false;
        this.collisionList.bottom = false;
        
        if (child.active){
           
                for (let dynamicB of this.dynamicGameObjects){
                    if (dynamicB.onScreen && dynamicB.boxCollider.active){
                        this.checkCount += 1;
                        if (dynamicB != parent && this.collision(child.boxCollider, dynamicB.boxCollider)){
                            this.setCollision(child, dynamicB);
                            //console.log(child)
                            //console.log(dynamicB);
                        
                        }

                    }
                   
                }
    
    
                for (let staticObject of this.staticGameObjects){
                    if (staticObject.onScreen && staticObject.boxCollider.active){
                        this.checkCount += 1;
                        if (this.collision(child.boxCollider, staticObject.boxCollider)){
                            this.setCollision(child, staticObject);
                        }
                    }
                }
                  

                child.boxCollider.checkCollisions(this.collisionList);


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

        return false;
        
      



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
        reset() empties the boxColliders currently observed by the collisionDataystem
        */
       this.dynamicGameObjects = [];
       this.staticGameObjects = [];
       
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