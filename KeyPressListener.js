/*
CLASS: KEY-PRESS-LISTENER
    Description:
        The KeyPressListener class takes a keyCode, and a function, callFunction, as arguments of the constructor.
        This binds the function such that when the specifed key is pressed, the provided function is called once,
        and can't be called again until the key is lifted

        -- prevents rapid fire of a function to be called such that multiple events are not called instantanously
*/

export default class KeyPressListener {
    constructor(keyCode, callFunction) {
        this.bound = false;
        let keyEnabled = true;

        this.keyDownFunction = function(event) {
            /*
            keyDownFunction executes the callFunction if key pressed is enabled
            */
            if (event.code === keyCode) {
                if (keyEnabled){
                    keyEnabled = false;
                    callFunction();
                }
            }
        };

        this.keyUpFunction = function(event) {
            /*
            keyUpFunction resets the key to be pressable
            */
            if (event.code === keyCode) {
                keyEnabled = true;

                }
        };

      

        
    }



    bind() {
        /*
        bind() adds the event such that when the key is pressed, the function associated is executed
        */
        document.addEventListener("keydown", this.keyDownFunction);
        document.addEventListener("keyup", this.keyUpFunction);
        this.bound = true;
    }


    unbind(){
        /*
        unbind() removes the event from being listened for
        */
        document.removeEventListener("keydown", this.keyDownFunction);
        document.removeEventListener("keyup", this.keyUpFunction);
        this.bound = false;
        
        
    }



    isbound() {
        /*
        returns true if the keyPressListener is currntly bound - the key is set to call a function if pressed
        */
        return this.bound;
    }








}
