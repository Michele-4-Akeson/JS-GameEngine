/*

ANIMATION CLASS:
    Decription: The animation class stores the animation data of an object. This refers to the number of animation frames
                a specific sprite object contains (based on its spritesheet), the size of those frames, the speed of animation
                as well as the current frame of animation an object has. The animation object can be set to active=true or 
                active=false to control whether the object should be animated through the frames of its spritesheet 

    Fields: 
        sprite(image): The image file which stores the the gameart to be drawn  
        frameSize(float): the size of every frame in the spritesheet
        xframe(int): the number of columns in a spritesheet
        yframe(int): the number of rows in a spritesheet
        currentFrameY(int): the current frame that will be animation in a row of the sprite spritesheeet
        currentFrameX(int): the current frame that will be animation in a column of the sprite spritesheet
        active(bool): whether animation is active for the object
        speed(int): stores a value of 1-10, where 1 is the fastest animation speed, and 10 is the slowest
        
      

*/





export default class Animation {
    constructor(spritesheet, startx, starty, speed, active) {
        this.sprite = spritesheet.sprite;
        this.frameSizeX = spritesheet.imageWidth / spritesheet.columns;
        this.frameSizeY = spritesheet.imageHeight / spritesheet.rows;
        this.xframes = spritesheet.columns;
        this.yframes = spritesheet.rows;
        this.currentFrameX = startx;
        this.currentFrameY = starty;
        this.active = active; // if an animation is not active (active = false), the animation will not play
        this.speed = speed;   

        this.callFunction;
        this.pairedAnimation = false;
        this.pairedEndingAnimation = false;

        this.triggeredAnimation = false;
        this.triggeredEndAnimation = false;
        this.previousFrameY = 0;
        this.previousActiveState = false;


    }




    /////////////////////////////////////////
    // GET METHODS
    /////////////////////////////////////////

    getFrameX() {
        /*
         * getFrameX() returns the x position at which the canvas drawer will
         * intiatate cropping to emulate frame animation of the provided frame
         * of the spritesheet
         */

        return (this.currentFrameX * this.frameSizeX);

    }

    getFrameY() {
        /*
        * getFrameY() returns the y position at which the canvas drawer will
        * intiatate cropping to emulate frame animation of the provide frame of 
        * the spritesheet
        */

        return (this.currentFrameY * this.frameSizeY);

    }



    /////////////////////////////////////////////
    // ANIMATION METHODS
    /////////////////////////////////////////////

    loopAnimation() {
        /*
         * loopframes() checks to see if the current frame of animation is 
         * greater than the last frame in a row, and if so, sets the current 
         * frame to 0 of that row (restarting the animation loop)
         * 
         */ 
        
        if (this.currentFrameX >= this.xframes) {
            this.currentFrameX = 0;
        }
    }


    stepAnimation() {
        /*
         * stepAnimation() increments an animation frame one frame to the left
         * of a spritesheet and loops to the first frame in the row of the spritesheet
         * if currentFrameX exceeds the number of avaiable frames horizontally 
         */
       
        this.currentFrameX += 1;
        this.loopAnimation();
    }












    ///////////////////////////////////////////////////////////////
    // CONTROLLED ANIMATIONS
    //////////////////////////////////////////////////////////////


    startTriggeredAnimation(newFrame){
        /*
        startTriggeredAnimation() sets the animation to run through a specified
        animation starting at the given row in the spritesheet, newFrame, for a single cycle
        */
        this.previousActiveState = this.active;
        this.previousFrameY = this.currentFrameY;
        this.currentFrameX = 0;
        this.currentFrameY = newFrame;

        this.active = true;
        this.triggeredAnimation = true;


    }


    runTriggeredAnimation(){
         /*
        runTriggeredAnimation() steps the current animation horizontally through the spritesheet
        and sets the animation to its previoius animation frame upon completeion of the cycle 
        starting at the given yFrame (row)
        */
       
        this.currentFrameX += 1;
        
        if (this.currentFrameX >= this.xframes) {
            this.triggeredAnimation = false;
            this.currentFrameY = this.previousFrameY;
            this.active = this.previousActiveState;
            this.currentFrameX = 0;
        }

    }



    startEndingAnimation(newFrame){
        /*
        startEndingAnimation() sets the animation to run through a specified
        animation starting at the given row, newFrame, for a single cycle, where it will
        remain on the final animation frame of that row on completion
        */
        this.currentFrameX = 0;
        this.currentFrameY = newFrame;

        this.active = true;
        this.triggeredEndAnimation = true;


    }


    runEndingAnimation(){
        /*
        runEndingAnimation() steps the current animation a single frame horizontally
        and sets the animation to false on the last frame such that the animation remains on
        the last frame in that row
        */
        
        this.currentFrameX += 1;
        
        if (this.currentFrameX == this.xframes - 1) {
            this.active = false;
            this.triggeredEndAnimation = false;
            
        }

    }


    startPairedAnimation(newFrame, callFunction) {
        /*
        startPairedAnimation() sets the animation to run through a specified
        animation starting at the given frame, newFrame, for a single cycle, and pairs
        a function, callFunction, to be executed on completeion of the animation

        NOTE: callFunction must be stored in a arrow function -> () => {}
        Example: 
            startPairedAnimation(2, () => {telelport()});
        */
        this.previousActiveState = this.active;
        this.previousFrameY = this.currentFrameY;
        this.currentFrameX = 0;
        this.currentFrameY = newFrame;

        this.active = true;
        this.pairedAnimation = true;
        this.callFunction = function() {
            callFunction();
            
        }



    }


    runPairedAnimation(){
        /*
        runPairedAnimation() steps the current animation a single frame horizontally
        and executes the paired callFunction upon completeion of the animation and sets
        the animation state and frame to it's previous state
        */

        this.currentFrameX += 1;
        
        if (this.currentFrameX >= this.xframes) {
            this.pairedAnimation = false;
            this.currentFrameY = this.previousFrameY;
            this.active = this.previousActiveState;
            this.currentFrameX = 0;
            this.callFunction();
            this.callFunction = null;
            
        }
        

    }





    startPairedEndingAnimation(newFrame, callFunction) {
        /*
        startPairedAnimation() sets the animation to run through a specified
        animation starting at the given frame, newFrame, for a single cycle, and pairs
        a function, callFunction, to be executed on completeion of the animation

        NOTE: callFunction must be stored in a arrow function -> () => {}
        Example:
            startPairedAnimation(2, () => {telelport()});
        */
        
        this.currentFrameX = 0;
        this.currentFrameY = newFrame;

        this.active = true;
        this.pairedEndingAnimation = true;
        this.callFunction = function() {
            callFunction();
            
        }



    }


    runPairedEndingAnimation(){
        /*
        runPairedAnimation() steps the current animation a single frame horizontally
        and executes the paired callFunction upon completeion of the animation and sets
        the animation state and frame to it's previous state
        */

        this.currentFrameX += 1;
        
        if (this.currentFrameX == this.xframes - 1) {
            this.pairedEndingAnimation = false;
            this.active = false;
            this.callFunction();
            this.callFunction = null;
            
        }
        

    }


   

}
