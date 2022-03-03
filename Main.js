import GameManager from "./GameEngine/GameManager.js";






/////////////////////////////////////
//
// GAME-MANAGER
//
/////////////////////////////////////


let gameManager = new GameManager();
gameManager.start();



////////////////////////////////
//
// GAME LOOP
//
////////////////////////////////


let fps = 60; //throttle requestAnimationFrame to x frames per a second 
/*
function gameLoop() {
    setTimeout(function () { 
    
        gameManager.update();

        

        window.requestAnimationFrame(gameLoop);
    }, 1000 / fps )
   
}

*/


function gameLoop(){
    gameManager.update();
    window.requestAnimationFrame(gameLoop);
}


gameLoop();

