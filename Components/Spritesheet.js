


/*

 SPRITESHEET CLASS:
    Decription: the Spritesheet class stores data of a spritesheet image
                such as the number of columns and row of the spritesheet
                (which are used to determine the frame size)

    Fields: 
        sprite(image): the image resource
        columns(int): the number of columns in a spritesheet
        rows(int) the number of rows in a spritesheet
        frmaeSizeX(float): the number of pixels horizontally within a single animation frame 
        frameSizeY(float): the number of pixels vertically within a single animation frame 

*/




export default class Spritesheet{
    constructor(image, columns, rows) {
        this.sprite = image;
        this.imageWidth = image.width;
        this.imageHeight = image.height;
        this.columns = columns;
        this.rows = rows;
        
    }
}