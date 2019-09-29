import {Player} from './player.mjs';

/*
    Menu class - placeholder for now, so I can prove I can do it.
*/
export class Menu extends Phaser.Scene {
    
    constructor()
    {
        super({ key: 'menu' });
    }
            
    create()
    {
        var text = this.add.text(500, 100, 'SOL COMMAND');
        text.setOrigin(0.5, 0.5);
        text.setFontSize(60);
        text.setColor("red");
        text.setFontStyle("bold");
        
        var text = this.add.text(500, 150, 'ALPHA');
        text.setOrigin(0.5, 0.5);
        text.setFontSize(20);
        text.setColor("red");
        
        var text = this.add.text(500, 300, 'Start New Game');
        text.setOrigin(0.5, 0.5);
        text.setFontSize(30);
        text.setInteractive().on("pointerup", this.startGame);
        
        // CATCH INPUT
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.SHIFT);             
    }
    
    startGame() {
        // this is the button :(
        let player = new Player(0);
        this.scene.scene.start("mining", { player: player});
        this.scene.scene.launch("mining-status", { player: player});
    }           
};