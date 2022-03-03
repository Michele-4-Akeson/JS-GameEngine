import ChildObject from "./ChildObject.js"
import Animation from "../../Components/Animation.js";

export default class Icon extends ChildObject {
    constructor(parent, spritesheet, size, x, y) {
        super(parent, true, true, x, y, size, "icon");
        
        this.animation = new Animation(spritesheet, 0, 12, 6, false);
        this.boxCollider = null;

        // ICON Should self center based on parent
        
    }


    update(){

        if (this.parent.boxCollider.collisionData.collisionTag == "player"){
            this.activate();
            this.animation.active = true;
            
            
            
        } else{
            this.visibility(false);
            this.animation.active = false;
            this.animation.x = 0;
        }
    }



}