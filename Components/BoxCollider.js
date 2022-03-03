/*

BOXCOLLIDER CLASS:
    Decription: The BoxCollider class stores the BoxCollider data of a given an object. This refers to the x, y position of
                that object, as well as its size. This Object also stores the current state of it's gameObject's collisions:
                    - What object(s) its currently colliding with
                    - What sides are colliding with another object 
    
    


    Fields: 
        x(float): the x position of the gameObject's boxCollider relative to its load position
        y(float): the y position of the gameObject's boxCollider relative to its load position
        size(float): the side length of every side of the boxCollider -- the boxCollider takes up an area of size^2
        dynamic(bool): dynamic indicates if the gameObject the boxCollider is applied to moves 
            - this is used to optimize the performance of the Collision System as redundant checks will be eliminated
              by not checking if static objects are colliding with other unmoveable objects
        active(bool): used to indicate to the Collision System if the BoxCollider should be considered/checked for collisions with other objects
            - improves performance of Collision System by avoiding checks with gameObjects which are not visible onScreen
        sides(HashMap): Stores the position of each vertex of the boxCollider, allowing for position of sides to be recorded
        collisionData(HashMap): Note - Should be changed to collisionState: records the current collisions that are being applied to the boxCollider, and by what gameObject
      

*/



export default class BoxCollider{
    constructor(size, dynmaic) {
        // defines the coordinates of an objects boxcollider
        // note: should test if this.x is a constant value, or a reference to a value that changes - thus updates on it's own?? -- does not appear to be the case

        // BoxCollider checks are likely to most performance costly aspect of the game loop's animation frame
        // Idea: create a GameObject that acts just as a long (horizonatl or vertical) boxCollider (width x n / height x n)
        // which would limit the total number of BoxColliders required -- limits reduntdant checks for perimeter block: Boundry class - which would be overlayed in the mainground or foreground
        this.x = 0;
        this.y = 0;
        this.size = size;
        this.dynmaic = dynmaic;
        this.onScreen = false;
        this.active = true;
        this.sides = { top: this.y, bottom: this.y + size, left: this.x, right: this.x + size}
        this.collisionData = { gameObject: null, collisionTag: "none", left: false, right: false, top: false, bottom: false };
        


    }

    update(x, y) {
        /*
        update(x, y) updates the position of the BoxCollider, including its vertex/side positions
        */
        this.x = x;
        this.y = y;
        this.sides.top = y;
        this.sides.bottom = y + this.size;
        this.sides.left = x;
        this.sides.right = x + this.size;

    }



    setSize(size) {
        /*
        setSize(size) sets the size of the BoxCollider, being a square with side length, size
        */
        this.size = size;
        this.sides = { top: this.y, bottom: this.y + size, left: this.x, right: this.x + size}
    }


    setNoCollision(){
        /*
        setNoCollision() resets the BoxCollider collisionData field to have no applied collisions
        */
        this.collisionData.gameObject = null;
        this.collisionData.collisionTag = "none";
        this.collisionData.left = false;
        this.collisionData.right = false;
        this.collisionData.top = false;
        this.collisionData.bottom = false;
        

    }



    addCollision(object){
        /*
        addCollision(object) updates the BoxCollider with the object that a collisioin is occuring with,
        and the tag assoicated  
        */


        this.collisionData.gameObject = object;
        this.collisionData.collisionTag = object.tag;
        //console.log(object.tag)
    }



    checkCollisions(collisionsList){
        /*
        checkCollision() updates the sides in which the BoxCollider has a collision - it 
        allows for more than one side of collision detection, and update if a collision on a
        side is no longer taking place
        */
        if (!collisionsList.right) {
            this.collisionData.right = false;
        }
        
        if (!collisionsList.left){
           this.collisionData.left = false;
        }
        
        if (!collisionsList.top){
           this.collisionData.top = false;
        } 
        
        if (!collisionsList.bottom){
           this.collisionData.bottom = false;
        }

        let count = 0;
        for (let s in collisionsList){
            if (collisionsList[s]) {
                count+=1;
            }
        }

        if (count == 0){
            this.setNoCollision();

        }
    }

    
    

   
    







    


}