import BoxCollider from "./BoxCollider.js";

/*

ZONE-COLLIDER CLASS:
      Decription: The ZoneCollider component has the same functionality as the BoxCollider, however, it will not cause 
                  a gameObject that collides with it to stop moving - it will be used to update the functionality of a gameObejct 
                  based on the data of the ZoneCollider      

*/


export default class ZoneCollider extends BoxCollider{
    constructor(boxSize, size, dynmaic){
        super(size, dynmaic);
        this.centerX = boxSize / 2;
        this.centerY = boxSize / 2;

    }

    

    update(x, y){
        /*
        update() updates the position of the zoneCollider such that it's gameObject is centered
        at centrerX and centerY
        */
        
            this.x = x - this.centerX;
            this.y = y - this.centerY;
            this.sides.top = this.y;
            this.sides.bottom = this.y + this.size;
            this.sides.left = this.x;
            this.sides.right = this.x + this.size;
    
    
        
    }
    

}