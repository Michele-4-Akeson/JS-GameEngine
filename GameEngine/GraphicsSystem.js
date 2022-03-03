
import CanvasLayer from "./CanvasLayer.js";
import AssetManager from "./AssetManager.js";


/*

GRAPHICS-SYSTEM CLASS:
    Decription: The GraphicsSystem class functions to draw/render images on the HTML canvas element.
                This class controls where images are rendered on these elements, as well as what canvas
                layer the element is rendered on.

    Fields: 
        background/mainground/foreground(CanvasLayer): the CanvasLayer Objects that refernece the html canvas element and are used to control where gameObjects are drawn

        Note => performance is improved by having multiple canvas elements. This allows for reduced number of redraws in total
                            - only canvas which NEED to be redraw on every frame are; the background is only redraw if the player moves such that it requires 
                              the background to be redrawn * due to other optimzations, this may not even be required -> we could redraw all on every frame


*/



export default class GraphicsSystem {
    constructor() {
        
        // Canvas Layers
        this.background = new CanvasLayer(0);
        this.mainground = new CanvasLayer(1);
        this.foreground = new CanvasLayer(2);

        this.performanceCheck = false;
        this.drawCount = 0;
    }


    update() {
        /*
         * update() is called on every frame and updates the the gameview based 
         * on the provided position of objects and their states, allowing for animation 
         * to take place. update only updates layer_one and above to be more performant
         * 
         * => Likely need to add in functionality to check if object is active to determine if it should be drawn
         * => This method will only update mainground and foreground as those are constanly changing
         * => background will have a unique update method that is call when the camera changes position -- maybe we can just clear and update the object list based on what's on screen
         */

        

        this.drawCount = 0;
        this.clearAll();


        // renders all gameObjects in background layer which are onScreen and visible
        for (let object of this.background.layerObjects){
            if (object.onScreen && object.visible) {
                this.draw("background", object);
            }
        }

           // renders all gameObjects in mainground layer which are onScreen and visible
           // renders all childObjects of the gameObject
        for (let object of this.mainground.layerObjects) {
            if (object.onScreen && object.visible) { 
                this.draw("mainground", object);

                for (let child of object.children){
                    this.drawChildren(child);
                }
            }
                
    
          
          
        }

        /*

        for (let object of this.foreground.layerObjects) {
            if (object.parent.active == true) {
                this.draw("foreground", object);
            }
          
        }
        */

        this.checkPerformance();




    }



    ///////////////////////////////////////////////////////
    //
    // GAME-OBJECT ADDERS
    //
    ///////////////////////////////////////////////////////



    add(layer, object) {
        /*
         * add() appends a gameobject, object, to a layer list based on the string,
         * layer, which is either "background", "mainground", "foreground"  
         * 
         */

        
        switch (layer) {
            case "background":
                this.background.addObject(object);
                
                break;
            case "mainground":
                this.mainground.addObject(object);
                
                break;
            case "foreground":
                this.foreground.addObject(object);
                break;

        }

    }
    

    addAll(layer, objects){
        /*
         addAll() stores objects in a layer list based on the string, layer 
         which is either "background", "mainground", "foreground"  
          
         addAll: str obj[] => void
         */
        switch (layer) {
            case "background":
                for (let object of objects){
                    if (object != null) {
                        this.background.addObject(object);
                    }
                }
                
                //this.draw(layer, object);
                break;
            case "mainground":
                for (let object of objects){
                    if (object != null) {
                        this.mainground.addObject(object);
                        
                    }
                }
                break;
            /*
            case "foreground":
                for (let object of objects){
                    if (object != null) {
                        this.foreground.addObject(object);
                    }
                }
                break;
            */

            default:


        }

       

    }





    ///////////////////////////////////////////////////////
    //
    // DRAWING
    //
    ///////////////////////////////////////////////////////


    draw(layer, object) {
        /*
         * draw() calls the canvas drawer object to draw a given
         * object within the repective layer
         * 
         * draw: str obj => void
         */

        /*
         * ctx.drawImage(image, src_x, src_y, crop_Width, crop_Height, dx, dy, dWidth, dHeight); \\
         * This method draws an image to the canvas of size dwidth x dheight, however, the image is cropped
         *  prior to being drawn, where cropping beings at src_x and src_y, and only crop_wdith and crop_height
         *  are kept -- how we achieve animation
         *
         */

        this.drawCount += 1;

        switch (layer) {
            case "background":
                this.background.draw(object);
                break;
            case "mainground":
                this.mainground.draw(object);
                break;
            case "foreground":
                this.foreground.drawChild(object);
                break;
        }
    }


    drawChildren(object){
        /*
        drawChildren() draws a childObject, object, in the foreground layer, and recursively draws all children
        of the child object, and its children
        */
        this.drawCount += 1;
        
        if (object.visible){
            this.draw("foreground", object);

        }
        for (let child of object.children){
            this.drawChildren(child);
        }
    }





    ////////////////////////////////////////////////////////////////
    //
    // OTHER:
    //
    ////////////////////////////////////////////////////////////////


    adjustCanvas() {
        /*
        adjustCanvas() is called when the window is reized, and acts to resize the size of every canvas 
        to reamin consistent with the window size
        */
        this.background.resize();
        this.mainground.resize();
        this.foreground.resize();

        
    }



    clear(layer) {
        /*
        clear() clears a given canvas layer 
        */
        switch (layer) {
            case "background":
                this.background.clear()
                break;
            case "mainground":
                this.mainground.clear();
                break;
            case "foreground":
                this.foreground.clear();
                break;
        }
    }

    clearAll() {
        /*
        clearAll() clears all render images on every canvasLayer
        */
        this.background.clear();
        this.mainground.clear();
        this.foreground.clear();


    }


    reset(){
        /*
        reset() empties all currentlty observed gameObjects stored in the layerObjects[] of every CanvasLayer
        */
        this.background.reset();
        this.mainground.reset();
        this.foreground.reset();
    }



    /////////////////////////////////////////////////////////////
    //
    // ERROR/PERFORMANCE DETECTION
    // 
    /////////////////////////////////////////////////////////////




    checkPerformance(){
        if (this.performanceCheck){
            console.log("GRAPHICS-SYSTEM PERFORMANCE: ");
            console.log("->Number of Draws Per Frame: " + this.drawCount);

            this.performanceCheck = false;
            setTimeout(() => {
                this.performanceCheck = true;
            }, 5000);
        }
    }




    

    


}
