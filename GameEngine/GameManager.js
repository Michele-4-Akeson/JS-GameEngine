import AnimationSystem from "./AnimationSystem.js";
import Camera from "./Camera.js";
import CollisionSystem from "./CollisionSystem.js";
import GraphicsSystem from "./GraphicsSystem.js";
import ObjectManager from "./ObjectManager.js";
import UIController from "../UIManager/UIController.js";
import EventManager from "../EventManager.js";
import ZoneCollisionSystem from "./ZoneCollisionSystem.js";




/*

GAME-MANAGER CLASS:
      Decription: This class defines the GameManager of the GameEngine which is responsible for:
                  1. Determining which objects are active in-game based on logical aspects such as if they are visiable by the Camera Object. 
                  2. Calling the logic of every system (graphics, animation, collision) on every frame; allows objects to be drawn, animated, 
                     and receive collision data based on the current position and state of the gameObject
                  3. Calling the update method of every GameObject on every frame such that they can perform their functionality (if any)             

*/



export default class GameManager {
    constructor() {
        this.objectManager = new ObjectManager(this);
        this.eventManager = new EventManager(this);
        this.UIController = new UIController(this);
        this.graphicsSystem = new GraphicsSystem();
        this.animationSystem = new AnimationSystem();
        this.collisionSystem = new CollisionSystem();
        this.zoneCollisionSystem = new ZoneCollisionSystem();
        
        this.camera = new Camera(this.graphicsSystem.mainground.canvas.width, this.graphicsSystem.mainground.canvas.height);

         

        this.loadedMap;
        this.player;
        this.loadTarget;
        this.loadBuffer = 5;
        this.loadingArea = {x_min:0, x_max:0, y_min:0, y_max:0};



        this.errorCheck = true;

    }


    start(){
        /*
        start() initializes the objectManager to build all objectMaps for the game,
        and selects the starting map associated with the start screen of the game. It also
        uses the UIController to initialize the startMenue
        */
        this.objectManager.initialize();
        this.player = this.objectManager.player;
        this.loadTarget = this.objectManager.loadTarget;
        this.loadMap("startScreen");
        this.UIController.initializeHud();
        this.eventManager.initialize();
        
    }



    setLoadedMap(objectMap) {
        /*
        setLoadedMap(ObjectMap{}) sets the loadedMap field with the provided objectMap,
        and resets the size and position of the player

        Note: - When the player travels from one l map to another, the player's x and y position must be set
                to 0 such that they load in the correct position in the map
              - When a player returns to a map, their location should be previous position of the player
                when they left that map   
        */
        console.log(objectMap)
        this.loadedMap = objectMap;
        this.player.setSize(objectMap.scale);
        //console.log(this.player)
        
        
    }



    loadMap(map){
        this.selectMap(map)
        
    }


    selectMap(map){
        /*
        selectMap(String) updates the currenty loaded map in the game and updates all systems (graphics, animation, collision) to observe 
        the active objects of that map
        */
        switch(map){
            case "startScreen":
                this.setLoadedMap(this.objectManager.startMap);
                this.camera.setToFollow(this.loadedMap, this.player);
                this.errorDetection();
                break;
            case "level1":
                this.setLoadedMap(this.objectManager.startMap);
                this.camera.setToFollow(this.loadedMap, this.player);
                this.errorDetection();
                break;

            default:
                break;

        }

        this.updateSystems();
    }


    //////////////////////////////////////////////////////////////////////
    //
    // UPDATE METHODS
    //
    //////////////////////////////////////////////////////////////////////

    
    update(){
        /*
        update() is called on every frame, an is used to update every system of the 
        game as well as call object logic on every frame:
            graphicsSystem.update() redraws all GameObjects using updated position data of active objects in map
            animationSystem,animate() steps through all a frame of objects' animation
            collisionSystem().updateCollision() checks if a collision has occured between any objects in the game
        */

      
        this.updateLoadingArea();
        this.deactivate()
        this.activate();


        this.updateGameObjects();
        this.collisionSystem.update();
        this.zoneCollisionSystem.update();
        this.graphicsSystem.update();
        this.animationSystem.update();
        this.camera.follow();
    
     
    }


 

    updateGameObjects(){
        /*
        updateGameObjects() calls the update() method of every gameObject allowing
        for game-logic and events to occur
        */
        for (let object of this.loadedMap.mainground){
            if (object != null && object.active && object.onScreen) {
                object.update();
            }
            
        }
    }


    
    updateSystems(){
        /*
        updateSystems() resets the observed objects by every system (graphics, animation, and collision)
        and reloads observed objects with objects in currently loaded map
        */
        this.graphicsSystem.reset();
        this.animationSystem.reset();
        this.collisionSystem.reset();


        this.graphicsSystem.addAll("background", this.loadedMap.background);
        this.graphicsSystem.addAll("mainground", this.loadedMap.mainground);
        this.graphicsSystem.addAll("foreground", this.loadedMap.foreground);

        this.animationSystem.addAnimations(this.loadedMap.mainground);
        this.animationSystem.addAnimations(this.loadedMap.foreground);

        //this.collisionSystem.playerCollider = this.objectManager.player.boxCollider;
        this.collisionSystem.addGameObjects(this.loadedMap.background);
        this.collisionSystem.addGameObjects(this.loadedMap.mainground);

        this.zoneCollisionSystem.setPlayer(this.player);
        this.zoneCollisionSystem.addGameObjects(this.loadedMap.mainground);

    }







    //////////////////////////////////////////////////////////////////////
    //
    // LOADING-AREA & OBJECT ACTIVATION
    //
    //////////////////////////////////////////////////////////////////////


    activate(){
        /*
        activate() sets all GameObjects currently in the loadingArea (view of the camera) to active
        */
        this.activateMap(this.loadedMap.background);
        this.activateMap(this.loadedMap.mainground);
        this.activateMap(this.loadedMap.foreground)
    }




    activateMap(map){
        /*
        activateMap() sets all gameObjects which are currently "onScreen" to be onScreen and updates their positional data as needed
        -> If the gameObject is onScreen (visible by the camera), it will be stated as onScreen. 
        -> An object that is OnScreen is considered by the following systems:
                    GraphicsSystem:  A gameObject that is both onScreen and Visible will be rendered to the Screen
                    AnimationSystem: A gameObject that is both onScreen, and the animation component is active, will be stepped through its animation
                    CollisionSystem: A gameObject that is both onScreen, and the boxCollider component is active will be checked for collisions
                    GameManager: A gameObject that is both onScreen and active will be called to update 
        */
        let object;
        for (let x = this.loadingArea.x_min; x < this.loadingArea.x_max; x++) {
            for (let y = this.loadingArea.y_min; y < this.loadingArea.y_max; y++) {
                object = map[y * this.loadedMap.columns + x];// Object located at relative map location

                if (object != null) {
                    if (object != this.camera.target) {
                        object.onScreen = true;
                        object.updateTransform(Math.floor(x * this.loadedMap.scale - this.camera.view.left), Math.floor(y * this.loadedMap.scale - this.camera.view.top));
                    } else {
                        // Updates the target of the Camera
                        object.updateBoxCollider();
                    }
                    
                   
                }
            }
        }

    }


    deactivate(){
        /*
        deactivate() sets all GameObjects to inactive - used on every frame to update active vs inactive objects
        */
        this.deactivateMap(this.loadedMap.background);
        this.deactivateMap(this.loadedMap.mainground);
        this.deactivateMap(this.loadedMap.foreground);

    }

    deactivateMap(map) {
        /*
        deactivateMap() sets all objects to be not "onScreen"
        */
        for (let object of map) {
            if (object != null && object != this.camera.target && object.onScreen != false) {
                object.onScreen = false;
                
            }
        }

    }


    updateLoadingArea(){
        /*
        updateLoadingArea() uses the size of the camera to determine the area in which objects should be active or inactive: 
        objects with positions within the loadingArea (in view by the camera) should be set to active, while objects outside
        of this area should be set to inactive

        - loadBuffer is provided to load GameObjets which are slightly out of view of the camera
        */
        // Converts what the camera object is viewing into the scaled units of the objectMap
        // The area being viewed by the camera is considered the loadingArea where objects in this area are rendered
        this.loadingArea.x_min = Math.floor(this.camera.view.left / this.loadedMap.scale) - this.loadBuffer;
        this.loadingArea.y_min = Math.floor(this.camera.view.top / this.loadedMap.scale) - this.loadBuffer;
        this.loadingArea.x_max = Math.ceil(this.camera.view.right / this.loadedMap.scale) + this.loadBuffer; // addtional columns to draw
        this.loadingArea.y_max = Math.ceil(this.camera.view.bottom / this.loadedMap.scale) + this.loadBuffer; // addtional rows to draw
    
        //The minimum and maximum (x, y) position of the loading area can't go eyond the boundaries
        //of the map which set as the number of columns and rows in the objectMap. 
        if (this.loadingArea.x_min < 0) this.loadingArea.x_min = 0;
        if (this.loadingArea.y_min < 0) this.loadingArea.y_min = 0;
        if (this.loadingArea.x_max > this.loadedMap.columns) this.loadingArea.x_max = this.loadedMap.columns;
        if (this.loadingArea.y_max > this.loadedMap.rows) this.loadingArea.y_max = this.loadedMap.rows;

    }



    /*
    GRAPHICS-SYSTEM + ANIMATION-SYSTEM + COLLISION-SYSTEM
    */



    startDialog(root){
        if (root != null){
            this.UIController.initializeSpeechComponent(root);
        }
       
    }








    ////////////////////////////////////////////////////////
    //
    // UI-CONTROLLER COMMANDS
    //
    ////////////////////////////////////////////////////////

    updateHealth(value){
        this.UIController.updateHudHealth(value);
    }
    updateRupees(value){
        this.UIController.updateHudRupee(value);
    }













    /////////////////////////////////////////////////////////////
    //
    // ERROR DETECTION
    // 
    /////////////////////////////////////////////////////////////


    errorDetection(){
        if (this.errorCheck){

            // PLAYER:
            console.log("PLAYER: ");
            console.log(this.player);
            console.log("\n");


            // CAMERA:
            console.log("CAMERA: ");
            console.log(this.camera);
            console.log("\n");


            // COLLISION-SYSTEM:
            console.log("COLLISION-SYSTEM: ")
            console.log(this.collisionSystem)
            console.log("\n");


            // ZONE-COLLISION-SYSTEM:
            console.log("ZONE-COLLISION-SYSTEM: ")
            console.log(this.zoneCollisionSystem)
            console.log("\n");


            

            // GRAPHICS-SYSTEM:
            console.log("GRAPHICS-SYSTEM: ")
            console.log(this.graphicsSystem)
            console.log("\n");


            // ANIMATION-SYSTEM:
            console.log("ANIMATION-SYSTEM: ")
            console.log(this.animationSystem)
            console.log("\n");




             // UI-CONTROLLER:
             console.log("UI-CONTROLLER: ")
             console.log(this.UIController)
             console.log("\n");
            
        }
    }


    



}



    




















