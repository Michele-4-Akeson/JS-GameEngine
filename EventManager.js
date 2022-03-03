import KeyPressListener from "./KeyPressListener.js";


/*

EVENTMANAGER CLASS:
     Decription: the EventManager class functions to manage/assign actions to both player inputs, 
     the UI and window events, such as reszies
*/

export default class EventManager{
    constructor(gameManager){
        this.gameManager = gameManager;
        this.keyPressListener;
        

    }


    ////////////////////////////////////////////////////
    //
    // INITILIZE
    //
    ////////////////////////////////////////////////////

    initialize(){
        this.resizeEvent();
        this.actionEvent();
        this.movementEvent();
    }

    


    ////////////////////////////////////////////////////
    //
    // RESIZE EVENT
    //
    ////////////////////////////////////////////////////

    resizeEvent(){
        /*
        resizeEvent() adds an eventListener to the window which response when the window is resize. When the 
        window is resized, the graphicsSystem and camaera of the gameManager is called to adjust their size
        */
        window.addEventListener('resize', (e) => {
  
            this.gameManager.graphicsSystem.adjustCanvas();
            this.gameManager.camera.adjustCamera();
          
           
        });
        
    }


    //////////////////////////////////////////////////////
    //
    // INTERACTION EVENT
    //
    //////////////////////////////////////////////////////

    actionEvent(){
        this.keyPressListener = new KeyPressListener("Space", () => {
            //logic required to control when inputs are passed to player based on gameManager state
            
            this.playerAction();
        });
        
        this.keyPressListener.bind();
        
        //pointerdown and pointerup events
        window.document.getElementById("canvasI").addEventListener("pointerup", () => {this.playerAction()});
       

    }




    playerAction(){
        this.gameManager.player.action();


    }



    /////////////////////////////////////////////////////
    //
    // MOVEMENT EVENT
    //
    /////////////////////////////////////////////////////

    movementEvent(){
        /*
        movementEvent() adds an eventListener to the window which listens for keydown and keyup events
        and passess these events to the player object if the gameManager is in a state that allows the 
        player object to move
        */

        window.document.addEventListener('keydown', (e) => {
            //logic required to control when inputs are passed to player based on gameManager state
            this.playerMovement('keydown', e.which);
            
        
        });


        window.addEventListener('keyup', (e) => {
            //logic required to control when inputs are passed to player based on gameManager state
            this.playerMovement('keyup', e.which);
            
        });




        window.document.getElementById("upArrow").addEventListener("pointerdown", () => {this.playerMovement("keydown", 38)});
        window.document.getElementById("upArrow").addEventListener("pointerup", () => {this.playerMovement("keyup", 38)});

        window.document.getElementById("leftArrow").addEventListener("pointerdown", () => {this.playerMovement("keydown", 37)});
        window.document.getElementById("leftArrow").addEventListener("pointerup", () => {this.playerMovement("keyup", 37)});

        window.document.getElementById("rightArrow").addEventListener("pointerdown", () => {this.playerMovement("keydown", 39)});
        window.document.getElementById("rightArrow").addEventListener("pointerup", () => {this.playerMovement("keyup", 39)});
        
        window.document.getElementById("downArrow").addEventListener("pointerdown", () => {this.playerMovement("keydown", 40)});
        window.document.getElementById("downArrow").addEventListener("pointerup", () => {this.playerMovement("keyup", 40)});
        
    }



    playerMovement(type, directionKey){
        this.gameManager.player.movementInput(type, directionKey);
    }


    
}