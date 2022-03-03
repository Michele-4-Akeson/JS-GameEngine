import Words from "./Words.js";

export default class DialogNode {
    constructor(){
        this.text = []; // Words[] // should be ccalled WordsArray -- whole class should be reworked/streamlined
        this.next;
        this.yes;
        this.no;
        this.yesText;
        this.noText;

        this.name;

    }




    setName(name){
        this.name = name;
    }

    getType(){
        /*
        getType() returns true if the dialogNode has a yes or no response dialogNode
        */
        if (this.yes != null || this.no != null) {
            return true;
        } 

        return false;
    }


    getNextNode(response) {
        /*
        getNextNode() returns the dialogNode associated with the provided response, response
        */
        switch(response){
            case "Next":
                return this.next;
            case "Yes":
                return this.yes;
            case "No": 
                return this.no;

            default:
                return this.next;

        }

    }



    //////////////////////////////////////////////////////
    //
    // WORD ADD METHODS
    //
    ///////////////////////////////////////////////////////

    addPause(){
        this.text.push(new Words(" ", 1000, null))

    }

    addVerySlowWords(text, styles){
        /*
        addNormalWords adds words to the dialogNode with a speed equal to this.normal, with styling
        - if no styles is provided, the value is defualted to null
        */

       
        if (styles != null){
            this.makeStyledWords(text, 450, styles);
        } else {
            this.text.push(new Words(text, 450, styles))

        }
    }
    


    
    addSlowWords(text, styles){
        /*
        addNormalWords adds words to the dialogNode with a speed equal to this.normal, with styling
        - if no styles is provided, the value is defualted to null
        */

        if (styles != null){
            this.makeStyledWords(text, 200, styles);
        } else {
            this.text.push(new Words(text, 200, styles))

        }
    }
    

    addNormalWords(text, styles){
        /*
        addNormalWords adds words to the dialogNode with a speed equal to this.normal, with styling
        - if no styles is provided, the value is defualted to null
        */

        if (styles != null){
            this.makeStyledWords(text, 60, styles);
        } else {
            this.text.push(new Words(text, 60, styles))

        }
    }



    addFastWords(text, styles){
        /*
        addNormalWords adds words to the dialogNode with a speed equal to this.normal, with styling
        - if no styles is provided, the value is defualted to null
        */
        if (styles != null){
            this.makeStyledWords(text, 10, styles);
        } else {
            this.text.push(new Words(text, 10, styles))

        }
    }


    addVeryFastWords(text, styles){
        /*
        addNormalWords adds words to the dialogNode with a speed equal to this.normal, with styling
        - if no styles is provided, the value is defualted to null
        */

        if (styles != null){
            this.makeStyledWords(text, 3, styles);
        } else {
            this.text.push(new Words(text, 3, styles))

        }
        
    }



    makeStyledWords(text, speed, styles){
        /*
        makeStyledWords() will parse a sentence with styles applied to have spacing between words rather than
        needing to do it manually
        */
       const splitWordsArray = text.split(" ");
        
       
       for (let word of splitWordsArray){
            if (word !== null && word != ""){
                this.text.push(new Words(word, speed, styles))

            }
            
        }

     
    }










    //////////////////////////////////////////////////////////////////////////////
    //
    // DialogTree Methods
    //
    //////////////////////////////////////////////////////////////////////////////



    addNextNode(node){
        this.next = node;
    }


    addResponseNodes(yesResponse, noResponse, yesNode, noNode){
        this.yesText = yesResponse;
        this.noText = noResponse;

        this.yes = yesNode;
        this.no = noNode;

    }



}