

import Spritesheet from "../Components/Spritesheet.js";

/*

ASSETMANAGER CLASS:
    Decription: The AssetManager class functions to reference all image assets to be used in the game,
    and creates the Spritesheet objects of those images.

    The AssetManager creates a single instance of the image to be used by all gameObjects that require it,
    reducing the number of created assets signficantly

        => This class formats the Spritesheet()
           object to be used by the animation class 


*/


export default class AssetManager{
    constructor() {
        ////////////////////////
        // ASSETS
        ///////////////////////
        
        this.character3Asset = document.getElementById("character3");
        this.tilesetAsset = document.getElementById("tileset");
     

        


        //////////////////////////
        // SPRITESHEETS
        //////////////////////////
    
        this.character3Spritesheet = new Spritesheet(this.character3Asset, 4, 15);
        this.tilesetSpriteSheet = new Spritesheet(this.tilesetAsset, 5, 5);
  
        
    }



  


    


}