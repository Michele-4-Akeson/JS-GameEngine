/*

MAP-MANAGER CLASS:
    Description: The Map-Manager class stores the data of every 'game-map'/'level' in the game, which
                 is formed by creating a integer array, where every integer corresponds to a specific
                 GameObject. This allows for locational data to be specified for all objects and acts
                 as a make shift level designer

    Fields:
        MAP: Repersents the initial location of gameObjects for a level, as well as what layer they're rendered in

            background(int[]): integer array repersenting GameObjects in the background layer 
            mainground(int[]): integer array repersenting GameObjects in the mainground layer
            foregroud(int[]): integer array repersenting GameObjects in the foreground layer
            scale(int): integer indicating scale of map (size of objects to be rendered)
            columns(int): number of columns in a map (indicates width of map size)
            rows(int): number of rows in a map (indicates the height of map size)
                --> MAP-AREA(Pixels) = Scale(Pixels) X Columns(Width) X Rows(Height) 

                    
                    Notes:
                        => This class stores an integer array for every canvas layer
                        => The (columns X rows) of a Map object should match how they are displayed
                        in an array
                
                    
*/



export default class MapManager{
    constructor(){
        this.map0 = {background:[], mainground: [], foreground:[], scale:0, columns:0, rows:0, tilemap: ""}; // Start Level
      
        
    }


    build(){
        /*
        build() sets the background, mainground, and forground integer arrays
        for every level

        
        */

        let nn = null;
        const QQ = null;
        const PP = 1; // player placement
        const LL = "LoadTarget";


         //////////////////////////////////////////////////////////////////////////////////////////
        //
        //
        //
        // StartScreen
        //
        //
        //
        //////////////////////////////////////////////////////////////////////////////////////////

        this.map0.scale = 64;
        this.map0.columns = 30;
        this.map0.rows = 20;
        this.map0.background = [
            0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ];
        this.map0.mainground =  [
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn,  4, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,  4, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, PP, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn,  2, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,  3, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,  4, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn

        ];            
        this.map0.foreground =  [];
           


      


    
    }



}






/*


50 x 20 Map


            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
            nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn, nn,
          




50 x 10 Large Tile Map
             9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, nn,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, nn,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, nn,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, nn,
            QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ,
             9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, nn,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, nn,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, nn,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, nn,
            QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ


55 x 30 Large Tile Map
             9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ,
            QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ,
             9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ,
            QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ,
             9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ,
            QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ,
             9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ,
            QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ,
             9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ,
            QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ,
             9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,  9, nn, nn, nn, QQ,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ,
            QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ, QQ, nn, nn, nn, QQ,
            QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ, QQ





            61, nn, nn, nn, nn, nn, nn, nn, nn, 61, 
            61, nn, nn, nn, nn, nn, nn, nn, nn, 61, 
            61, nn, nn, nn, nn, nn, nn, nn, nn, 61, 
            61, nn, nn, nn, nn, nn, nn, nn, nn, 61, 
            61, nn, nn, nn, nn, nn, nn, nn, nn, 61, 
            61, nn, nn, nn, nn, nn, nn, nn, nn, 61, 
            61, nn, nn, nn, nn, nn, nn, nn, nn, 61, 
            61, nn, nn, nn, nn, nn, nn, PP, nn, 61, 
            61, nn, nn, nn, nn, nn, nn, nn, nn, 61, 
            79, nn, nn, nn, nn, 79, nn, nn, nn, nn, 













*/
