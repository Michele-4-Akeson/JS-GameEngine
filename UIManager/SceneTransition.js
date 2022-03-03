export default class SceneTransition{
    constructor(UIController){
        this.element;
        this.active = false;
        this.UIController = UIController;


    }


    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("SceneTransition");
    }



    initialize(callFunction){
        /*
        initilize() creates the html element which is used to create the fade effect between transitions from one area to another.
        This functions addeds this element to the document:
             - The element will fade in from zero opacity to full opacity
             - The function, callFunction will be called once the sceneTransition element is at full opacity
             - Once the callFunction is complete, the SceneTransition will fade out and then be removed
        */

        if (!this.active){
            this.createElement();
            window.document.querySelector("body").appendChild(this.element);
            this.active = true;
            
    
    
            this.element.addEventListener("animationend", () => {
                callFunction();
                //console.log("animation fade in done");
                this.fadeOut();
                
            }, {once : true});

        }
       

        

        
    }


    fadeOut(){
        this.element.classList.add("FadeOut"); 
        this.element.addEventListener("animationend", () =>{
            //console.log("animation fade out done");
            this.active = false;
            this.UIController.active = false;
            this.element.remove();
        }, {once : true});
    }
}