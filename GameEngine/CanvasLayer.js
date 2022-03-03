

/*

CANVASLAYER CLASS:
     Decription: the canvasLayer class stores the refernece to the html canvas element. This class
                 functions to display gameObjects on the canvas at their relatvie position in the 
                 canvas, as determined by where they are the view of the camera
*/

export default class CanvasLayer{
    constructor(layer){
      // Canvas Element
      const canvasElements = document.querySelectorAll("canvas");
      this.canvas = canvasElements[layer];

      // Canvas Context: Handles rendering of sprites
      // ImageSmootingEnabled = False -> handles pixalation better 
      this.drawer = this.canvas.getContext("2d");
      this.drawer.imageSmoothingEnabled = false;
 

      // Canvas Attributes
      this.canvas.width = window.innerWidth - 25;
      this.canvas.height = window.innerHeight - 25;

      // Objects to draw in layer
      this.layerObjects = [];


  }


  clear(){
    /*
    clear() resets the canvas such that no sprite is drawn. This method is used 
    to help continuously redraw every frame
      
    */
    
      this.drawer.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }


  addObject(object) {
      /*
      addObject() adds a GameObject to the array of objects to be drawn in this
      layer, layerObjects
      */
      this.layerObjects.push(object);
  }




  draw(object){
      /*
      draw() draws a gameObject, object, to the canvas, 
      
      ctx.drawImage(image, src_x, src_y, crop_Width, crop_Height, dx, dy, dWidth, dHeight); \\
      This method draws an image to the canvas of size dwidth x dheight, however, the image is cropped
      prior to being drawn, where cropping beings at src_x and src_y, and only crop_wdith and crop_height
      are kept -- how we achieve animation feature
      */

     //console.log(object)
     
      this.drawer.drawImage(object.animation.sprite, object.animation.getFrameX(), object.animation.getFrameY(), object.animation.frameSizeX, 
                            object.animation.frameSizeY, object.x + object.xref, object.y + object.yref, object.size, object.size);
     

       
      
  }



  drawChild(object) {
    /*
    drawChild() draws a child gameObject, object, using the position, and size of the child's parent to assit in determining where
    the child will be drawn 
    */

    if (object.bound){
      this.drawer.drawImage(object.animation.sprite, object.animation.getFrameX(), object.animation.getFrameY(), object.animation.frameSizeX, 
                          object.animation.frameSizeY, object.parent.x + object.parent.xref + object.x, object.parent.y + object.parent.yref + object.y, object.size, object.size);

    } else {
      this.drawer.drawImage(object.animation.sprite, object.animation.getFrameX(), object.animation.getFrameY(), object.animation.frameSizeX, 
      object.animation.frameSizeY, object.xref + object.x, object.yref + object.y, object.size, object.size);
    }

    

  }


  resize(){
    /*
    resize() is called when the window changes the size - this method rezies the canvas object to be equal to the new window size, minus 50 pixels
    */
    this.canvas.width = window.innerWidth - 50;;
    this.canvas.height = window.innerHeight - 50;;
  }


  reset(){
    /*
    reset() empties all currently observed gameObjects in layerObjects
    */
    this.layerObjects = [];
  }




  




}