import GameObject from "../GameObject.js";

/*

CHILD-OBJECT CLASS:
      Decription: The ChildObject class allows for creation of GameObjects which are direct
                  children of other gameObjects. These objects store a reference to their 
                  parent object to allow for responsive functionality based on the state of the
                  parent.

                  Fields:
                  parent(GameObject) -> a reference to the parent gameObject which gameLogic and functionality can be developed
                  bound(Boolean) -> a boolean that indicates whether the childObject is bound to the parent -> determines if childObject follows its parent's position...
                  x(Float) -> the position of the childObject relative to its parent (if bound) or it's inilized position (if unbound)
                  y(Float) -> the position of the childObject relative to its parent (if bound) or it's inilized position (if unbound)

                  ...

                  A child object is considered dynamic

*/



export default class ChildObject extends GameObject{
    constructor(parent, state, bound, x, y, size, tag){
        super(size, state, true, tag);
        this.parent = parent;
        this.bound = bound;
        this.xref = parent.xref + parent.x;  // the position where the object was instantiated relative to the camera
        this.yref = parent.yref + parent.y;  // the position where the object was instaniated relative to the camera
        this.x = x;                          // the "offset/starting x position" of the child relative to its xref
        this.y = y;                          // the "offset/starting y position" of the child relative to its yref
       
      
       
    }

    update(){
        // empyt method to act as "interface required method for all GameObjects"
        
    }



    updateTransform(xrefParent, yrefParent){
        /*
        updateTransform() updates a childObjects xref and yref position based on the change of its parent's xref and yref
        position. The change to a childs xref and yref should be the same as the change made to its parent's xref and yref

        If the child is bound, it's xref, and yref and equal to it's parent's

        This method is called before the value of the parent's ref values are changed, thus, the parent.xref is the previous xref
        and the xrefParent parmeter is the newly update xref
        */

        

        if (this.bound){
            this.xref = xrefParent;
            this.yref = yrefParent;
        } else {
            this.xref += xrefParent - this.parent.xref;
            this.yref += yrefParent - this.parent.yref;  
        }

        this.updateBoxCollider();


    }


    updateBoxCollider(){
        /*
        updateBoxCollider() updates the position of the BoxCollider of a child object. 
        - If the child object is bound to the
          parent object, the position of the childObject is dependent on where the parent is on the map; its position is equal
          to the location of the the parent (parent.xref + parent.x) plus the position/offset of the child from that parent (x)
        
        - If the child object is unbound, the position of the child object is determined by its (xref, yref) which is where it
          was instaniated (which is relative to the camera position -- this must be computed in some way as the camera moves, otherwise
          the childObject will appear in a static location on the canvas) plus its x and y values which can change based on its functionality


        */
        if (this.boxCollider != null){
            if (this.bound) {
                this.boxCollider.update(this.x + this.parent.xref + this.parent.x, this.y + this.parent.yref + this.parent.y)
                this.boxCollider.active = this.active;
            } else {
                // computing the xref and yref - 
                this.boxCollider.update(this.xref + this.x, this.yref + this.y)
                this.boxCollider.active = this.active;
                
            }    

        }

        for (let child of this.children){
            child.updateBoxCollider();
        }
      
        
    }

}

