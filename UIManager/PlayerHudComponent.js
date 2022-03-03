export default class PlayerHudComponent{
    constructor(UIContoller){
        this.active = false;
        this.element;
        this.directionalPad;
        this.rupeeDisplay;
        this.pauseButton;
        this.UIContoller = UIContoller;
    }



    createElement(){
         /*
        createElement() creates the HTML element along with the desired css style classes, which will be used to repersent 
        our StartMenu - we will fill the DialogText child element with <spans> which store the text spoken by characters
        */
        this.element = document.createElement("div");
        this.element.classList.add("PlayerHud");
        this.element.classList.add("TextStyle");
        this.element.classList.add("UI")
        this.active = true;
    


        this.directionalPad = document.createElement("div");
        this.directionalPad.classList.add("Keys");
        this.directionalPad.classList.add("UI");
       

        this.directionalPad.innerHTML = (`
            <div id="upArrow" class="TextStyle up arr">W</div>
            <br />
            <div id="leftArrow" class="TextStyle left arr">A</div>  
            <div id="downArrow" class="TextStyle down arr">S</div>
            <div id="rightArrow" class="TextStyle right arr">D</div>
            </div>
        `)

    }


    initialize(){
            this.createElement();
            window.document.querySelector("body").append(this.directionalPad);
        
    }

    
}