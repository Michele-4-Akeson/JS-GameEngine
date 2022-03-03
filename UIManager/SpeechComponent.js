import KeyPressListener from "../KeyPressListener.js"

//////////////////////////////////
//
// SPEECH-COMPONENT CLASS:
//      Decription: The SpeechComponent class allows for creation of an html element which
//                  which displays the dialog of an NPC to the player
//
//                  element(html element): stores all html child elements
//                  textElement(html element): stores text/dialog of the speechComponent
//                  ...
//                  
//                    - This class could probably be streamlined at some point
//
/////////////////////////////////


export default class SpeechComponent{
    constructor(UIController){
        this.element;
        this.textElement;
        this.containerElement;
        this.spanList;
        this.dialogTree;
        this.dialogCount = 0;
        this.timeout = null;
        this.hasButtons = false;
        this.active = false;
        this.isDone = false;
        this.actionListener = new KeyPressListener("Space", () => {this.finishText("Next")});
        this.UIController = UIController;
        
    }



    ////////////////////////////////////////////////////////////////////
    //
    // INILIZATION
    //
    ////////////////////////////////////////////////////////////////////


    
    createElement(dialogNode){
        /*
        createElement() creates the HTML element along with the desired css style classes, which will be used to repersent 
        our SpeechComponent - we will fill the DialogText child element with <spans> which store the text spoken by characters
        
        Note: img will need to take a string equal to the location and name of the asset to apply as the "thumbnail"
        */
        this.element = document.createElement("div");
        this.element.classList.add("Container");
        this.element.classList.add("UI");
        this.element.classList.add("TextStyle");
        this.hasButtons = false;
       
        this.element.innerHTML = (`
            <div class="Item1">
                ${dialogNode.name}:
            </div >

            <div class="Item2">
                
            </div>

            <button class="NextButton Blink">●</button>
            
      
     

        



    `);

    
    this.containerElement = this.element.querySelector(".Item2");

    this.addButtons(dialogNode);
    this.writeText(dialogNode.text);


    //ADDS BUTTONS IF RESPONSE IS NEEDED:
   
    // BUTTON FUNCTIONALITY
    
    // We can add event listeners to elements of the speechComponent
    this.element.querySelector(".NextButton").addEventListener("click", () => {
        this.finishText("Next");
    });

    

    }
    


    initialize(text) {
        /*
        initialize() adds the formed html element to the website, and prompts dialog to be displayed, and controller by the user
        */
        if (!this.active){
            this.dialogTree = text;
            this.UIController.active = true;
            this.active = true;
            this.isDone = false;
            this.createElement(this.dialogTree);
            window.document.querySelector("body").appendChild(this.element);
            this.startWriting();
        
            if (!this.actionListener.isbound()) {
            this.actionListener.bind();
            }

        }
    }



    addButtons(dialogNode) {
        /*
        addButton() handles the logic of adding or removing the yes/no buttons from a speech bubble, which allows the player
        to select a choice of dialog and get a response based on their choice
        */

    if (dialogNode.getType()) {
        this.hasButtons = true;
        this.containerElement.innerHTML = (`
                <div class="Text">
                <!-- Text Entered Here-->
                </div>

                <div class="ButtonGroup Invisible">
                    <button class="ButtonA DialogButton Slide TextStyle">>${dialogNode.yesText}</button>
                    <button class="ButtonB DialogButton Slide TextStyle">> ${dialogNode.noText}</button>
                </div>

        `);

        this.element.querySelector(".ButtonA").addEventListener("click", () => {
            this.finishText("Yes");

        });

        this.element.querySelector(".ButtonB").addEventListener("click", () => {
            this.finishText("No");

        });

    } else {
        this.hasButtons = false;
        this.containerElement.innerHTML = (`
        <div class="Text">
        <!-- Text Entered Here-->
        </div>
       
        `);
    }
    this.textElement = this.element.querySelector(".Text");

    }





    /////////////////////////////////////////////////////////////////
    //
    // ADDING/WRITTING TEXT
    //
    /////////////////////////////////////////////////////////////////
    
    
    writeText(dialog){
        /*
        writeText() takes in an html element, element, and a Words[] array, dialog, and appends multiple
        <span> elements which each contains a the text, and style of a Words object

        */
        this.spanList = [];
        let span;
        //console.log(dialog)
        for (let words of dialog) {
            // for every group of words with a specific style/speed
           // console.log(words);
            //console.log(words.text)
            words.text.split("").forEach(character => {
                // for every letter in our group of words, we will create a span element which will allow us to create writting effect
                // note: for certain effects to work, the span element was have display:inline-block ** spans with inline-block don't show space unless 2 letters on either side
                
                span = document.createElement("span"); 
                this.addStyles(span, words.styles)
                span.textContent = character;
                this.textElement.appendChild(span);

                this.spanList.push({span:span, speed: words.speed}); //words.speed is undefined here due to being in arrow function
                
            }); 


            this.addSpace(this.textElement);
        }
        
        
    }



    addSpace(element){
        /*
        addSpace() adds a <span>[space]</span> element to the end of a group of words to assist
        with formatting styled spans within the speechComponent
        */

        let span = document.createElement("span"); 
        span.textContent = " ";
        element.appendChild(span);
    }


    

    addStyles(element, styles) {
        /*
        addStyles() first makes the span invisible to the user to provide the "typeWriteer Effect", and
        then adds all css style classes specified in styles[] to the <span> element
        */
       element.classList.add("Invisible")
        if (styles != null) {
            element.classList.add("StyleSpan");
           for (let style of styles){
               if (style != null) {
                   element.classList.add(style);
              }
          }
        }
    
    
    }


    
    startWriting(){
        /*
        startWriting() adds the css reveal class to all spans in the html speechComponent
        by recursively calling itself with a delay -- giving the type writting effect
        */
        let spanItem = this.spanList.splice(0, 1)[0];

        
        spanItem.span.classList.add("reveal");
        
        
        if (this.spanList.length > 0){
            this.timeout = setTimeout(() => {
                this.startWriting();
            }, spanItem.speed);

        } else {
            this.isDone = true;
            this.showButtons();

            
        
        }
    
    }




    finishText(response){
        /*
        finishText() handles the logic of what is displayed next in the SpeechComponet, or if the 
        speechComponent is removed all togeteher
        */
        let nextNode = this.dialogTree.getNextNode(response);
        if (this.isDone) {
            if (nextNode != null){
                this.dialogTree = nextNode;
                this.removeChildren()
                this.addButtons(nextNode);
                this.writeText(this.dialogTree.text);
                this.startWriting();
                this.isDone = false;
            } else {
                this.close();
            }
            
        } else {
            clearTimeout(this.timeout);
            this.spanList.forEach(spanItem => {
                spanItem.span.classList.add("reveal");
              
            
            });
            this.showButtons();
            this.spanList = [];
            this.isDone = true;
        }
    }



    showButtons(){
        /*
        showButtons() reveals buttons in the speechComponent if buttons/responses are required for the provided
        dialog
        */
        if(this.hasButtons){
            this.element.querySelector(".ButtonGroup").classList.add("reveal")


        }

    }


    ////////////////////////////////////////
    //
    // ELEMENT FUNCTIONALITY 
    //
    ////////////////////////////////////////

    close(){
        /*
        close() remove the speechComponent element from the DOM and sets the field of the speech component to match is active state
        */
        this.actionListener.unbind();
        this.element.remove();
        this.isDone = true;
        this.dialogCount = 0;
        this.UIController.active = false;

        setTimeout(() => {
            this.active = false;
        }, 440)
        
        
       
    }


    ////////////////////////////////////////////
    //
    // ADDITIONAL FUNCTIONALITY 
    //
    ////////////////////////////////////////////

    removeChildren(){
        while (this.textElement.hasChildNodes()) {
            this.textElement.removeChild(this.textElement.lastChild);
        }
    }




    






}
