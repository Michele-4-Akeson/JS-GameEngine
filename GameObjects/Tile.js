
import Animation from "../Components/Animation.js";
import GameObject from "./GameObject.js";

//////////////////////////////////
//
// TILE CLASS:
//      Decription: The Tile class repersents a basic tile in game. This class
//                  creates a Tile objects with a reference to a given spritesheet, spritesheet.
//                  The type is the name of the tile to select and add to the map:
//                  
//                  Example: new Tile(grassTilemap, 32, T1) -> will create a tile using the sprite located at (0, 0) (column, row) in the
//                           provided spritesheet
/////////////////////////////////




export default class Tile extends GameObject {
    constructor(spritesheet, size, type) {
        super(size, true, false, "tile: " + type);
        
       
        switch (type) {


            /////////////////////////////////////////////////////////////////
            //
            // TILES EXAMPLE
            //
            ////////////////////////////////////////////////////////////////

            // GRASS GROUND TILES
            case "T1":
                this.animation = new Animation(spritesheet, 0, 0, 1, false);
                this.boxCollider = null;
                break;
            case "T2":
                this.animation = new Animation(spritesheet, 1, 4, 1, false);
                this.boxCollider = null;
                break;
            case "T3":
                this.animation = new Animation(spritesheet, 2, 4, 1, false);
                this.boxCollider = null;
                break;
            case "T4":
                this.animation = new Animation(spritesheet, 4, 0, 1, false);
                this.boxCollider = null;
                break;
            case "T5":
                this.animation = new Animation(spritesheet, 3, 3, 1, false);
                this.boxCollider = null;
                break;
            
            // EMPTY TILE
            default:    
                this.animation = new Animation(spritesheet, 100, 100, 5, false);
                break;


        }

      

    }

   


    


}