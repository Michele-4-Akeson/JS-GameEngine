
import PlayerHudComponent from "./PlayerHudComponent.js";
import SceneTransition from "./SceneTransition.js";
import SpeechComponent from "./SpeechComponent.js";



export default class UIController {
    constructor(gameManager){
        this.active = false; // active when a UI component that (with exception to Hud) are active - gameManager does not update when UIComponent is active
        this.gameManager = gameManager;
        this.sceneTransition = new SceneTransition(this);
        this.speechComponent = new SpeechComponent(this);
        this.hud = new PlayerHudComponent(this);
    
    }


    initializeStartMenu(){
        this.active = true;
        this.startMenu.initialize();

    }


    transition(callFunction){
        /*
        transition() produces a SceneTransition, where the function, callFunction, occurs between fade in
        and fade out of the SceneTransitions opacity
        */
       this.sceneTransition.initialize(() => {
            callFunction()});
    }

    initializeHud(){
        this.hud.initialize();

    }






}