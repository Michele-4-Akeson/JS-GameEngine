import BoxCollider from "../Components/BoxCollider.js";


/*


GAMEOBJECT CLASS:
    Decription: The GameObject class functions as the top level of inheritance for gameobjects
                which appear in game. This will store fields which all gameobjects posses, such 
                as position in game (x, y), sprite information(spritesheet, animation, etc..),
                whether the object is currently active in game, the size of the gameobject

    Fields: 
        x(int): an integer repersenting the pixel x coordinate of the object from it's xref position on the canvas -- allows for movement
        y(int): an integer repersenting the pixel y coordinate of the object from it's yref position on the canvas -- allows for movement
        xref(int): an integer repersenting the pixel x coordinate of the object on a canvas
        yref(int): an integer repersenting the pixel y coordinate of the object on a canvas
        width(int): The width of the gameObject in pixels
        height(int): The height of the gameObject in pixels
        onScreen(bool): indicates whether the gameObject is within View of the Screen based on the camera
        active(bool): state of the gameObject - when true, the object's functionality (update methods) will be called, otherwise, it will not
        visible(bool): state which indicates if a gameObject should be rendered to the screen or not

        Note: the BoxCollider, Animation, and other components have their own "active" field to indicate whether the component should
              be updated/used in the respective functionality  
        
      

*/



export default class GameObject{

    constructor(size, state, dynamic, tag){
        this.x = 0;
        this.y = 0;
        this.xref = 0;
        this.yref = 0;
        this.size = size;
        this.onScreen = true;
        this.active = state;
        this.visible = state;
        this.tag = tag;
        this.boxCollider = new BoxCollider(size, dynamic);
        this.children = [];

    }


   


   

    /////////////////////////////////////////////////
    //
    // UPDATE METHODS
    //
    /////////////////////////////////////////////////
    
    update(){
        return null;
    }




    updateTransform(xref, yref){
        /*
        updateTransform() updates the gameObject with its new xref and yref position based on where the camera has moved.
        This method updates the BoxCollider object with this new data such that the image, and boxCollider positions are 
        overlayed

        - All children of this object will be called to update their transform based on the new xref and yref
        */

        if (this.active) {
            for (let child of this.children){
                child.updateTransform(xref, yref);
            }
    
            this.xref = xref;
            this.yref = yref;
    
            this.updateBoxCollider();
            this.updateZoneCollider();
            
        }

     
      
    }


    updateBoxCollider(){
        /*
        updateBoxCollider() updates the position of the gameobject's BoxCollider(s) with the current xref, yref, and x and y positions 
        */
        if (this.boxCollider != null && this.boxCollider.active){
            this.boxCollider.update(this.x + this.xref, this.y + this.yref)
            //this.boxCollider.active = this.active;
        }

        



    }        


    updateZoneCollider(){
        if  (this.zoneCollider != null && this.zoneCollider.active){
            this.zoneCollider.update(this.x + this.xref, this.y + this.yref);
        }
    }


    updateChildren(){
        /*
        updateChildren() calls the update method for all active children objects
        */
        for (let child of this.children){
            if (child.active){
                child.update();
            }
            
        }
    }



    //////////////////////////////////////////
    //
    // OTHER
    //
    //////////////////////////////////////////

    visibility(state){
        /*
        visible() sets the gameObject's visibility to true
        */
        this.visible = state;
    }


    boxColliderState(state){
        /*
        boxColliderState() sets the active state of a boxCollider to bool, state, if it exsists
        */
        if (this.boxCollider != null){
            this.boxCollider.setNoCollision();
            this.boxCollider.active = state;

        }

    }


    zoneColliderState(state){
         /*
        boxColliderState() sets the active state of a boxCollider to bool, state, if it exsists
        */
        if (this.zoneCollider != null){
            this.zoneCollider.setNoCollision();
            this.zoneCollider.active = state;

        }

    }







    activate(){
        /*
        activate() sets all states of a GameObject to the true such that it rendered, animated, called to update, or considered 
        for collision when onScreen
        */
        this.active = true;
        this.visible = true;
        if (this.boxCollider != null){
            this.boxCollider.active = true;

        }
        
        if (this.zoneCollider != null) {
            this.zoneCollider.active = true;
        }

        
        
    }

    destroy(){
        /*
        destroy() sets all states of a GameObject to the false such that it isn't rendered, animated, called to update, or considered 
        for collision
        */
        this.active = false;
        this.visible = false;
        if (this.boxCollider != null){
            this.boxCollider.active = false;

        }

        if (this.zoneCollider != null) {
            this.zoneCollider.active = false;
        }
        
    }


    addChild(child){
        /*
        adds a childObejct to a gameObject
        */
       if (child != null){
        this.children.push(child);
       }
       
    }

    

    setSize(size){
        this.size = size;
        this.boxCollider.setSize(size);
    }
    


    

    
}