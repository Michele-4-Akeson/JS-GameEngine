
import AssetManager from "./AssetManager.js"
import Player from "../GameObjects/Player.js";
import MapManager from "./MapManager.js";
import Tile from "../GameObjects/Tile.js";
import NPC from "../GameObjects/NPC.js";
import Enemy from "../GameObjects/Enemy.js"




/*
OBJECT-MANAGER CLASS:
    Decription: The ObjectManager class functions to intsantiate all gameObjects based on 
                the provided Map object (which is an integer array that indicates the initial 
                location and type of objects to be instantiated, as well as the size of those objects)

                => This class uses the Factory Design Pattern to manage how gameObjects are instaniated 
                   for the provided demo in the README Document 
*/

export default class ObjectManager {
    constructor(gameManager){
        this.assetManager = new AssetManager();
        this.mapManager = new MapManager();
       

        this.player = new Player(this.assetManager.character3Spritesheet, 0, gameManager);
        this.player.setDirectionalFrames(9, 8, 7, 10);

        this.startMap = {background:[], mainground: [], foreground:[], scale:0, columns:0, rows:0};
     


       
        

    }

    initialize(){
        this.mapManager.build();
        this.build(this.startMap, this.mapManager.map0);

    }



    build(objectMap, map){
        
        objectMap.columns = map.columns;
        objectMap.rows = map.rows;
        objectMap.scale = map.scale;
        let scale = map.scale;
        let object;

        //////////////////////////////////////
        //
        // Tilemap Creation in Background
        //
        //////////////////////////////////////
        
        for (let tileNumber of map.background){
            switch(tileNumber){
                case 0:
                    object = new Tile(this.assetManager.tilesetSpriteSheet, scale, "T1");
                    break;
                case 1:
                    object = new Tile(this.assetManager.tilesetSpriteSheet, scale, "T2");
                    break;
                case 2:
                    object = new Tile(this.assetManager.tilesetSpriteSheet, scale, "T3");
                    break;
                case 3:
                    object = new Tile(this.assetManager.tilesetSpriteSheet, scale, "T4");
                    break;
                case 4:
                    object = new Tile(this.assetManager.tilesetSpriteSheet, scale, "T5");
                    break;
                default:
                    object = null;

            }
            objectMap.background.push(object);
        }


        for (let objectNumber of map.mainground) {
            switch (objectNumber){
                case 1:
                    object = this.player;
                    break;
                case 2:
                    object = new NPC(this.assetManager.character3Spritesheet, scale, 0, 0);
                    object.setDirectionalFrames(2, 3, 1, 0);
                    object.setMovementController("square", scale * 4, 1);
                    break;
                case 3:
                    object = new NPC(this.assetManager.character3Spritesheet, scale, 0, 0);
                    object.setDirectionalFrames(2, 3, 1, 0);
                    object.setMovementController("vertical", scale * 4, 1);
                    break;
                case 4:
                    object = new Enemy(this.assetManager.character3Spritesheet, scale, 0, 11);
                    object.setDirectionalFrames(12, 12, 12, 12);
                    object.setMovementController("sqaure", 100, 1);
                    break;
                default:
                    object = null;
            }




            objectMap.mainground.push(object);
        }

    

        


        
    }






}