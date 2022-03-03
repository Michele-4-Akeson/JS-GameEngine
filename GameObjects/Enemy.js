import NPC from "./NPC.js";
import ZoneCollider from "../Components/ZoneCollider.js";

export default class Enemy extends NPC {
    constructor(spritesheet, size, xframe, yframe){
        super(spritesheet, size, xframe, yframe);
        this.zoneCollider = new ZoneCollider(size, size * 4, true);

    }


    
    update(){
        this.updateChildren();

        if (this.boxCollider.collisionData.collisionTag == "player"){
            this.animateCollision();
            
        } else {
            this.movementController.move();
            this.animateDirection();

        }


        
        if (this.zoneCollider.collisionData.collisionTag == "player"){
            this.movementController.setMovementControlFunction("tracking", this.zoneCollider.collisionData.gameObject);
        }
       

    
    }

}