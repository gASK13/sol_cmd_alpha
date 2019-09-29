import {Player} from './player.mjs';

// Mining scene
export class Menu extends Phaser.Scene {
    
    constructor()
    {
        super({ key: 'menu' });
    };
    
    
    preload()
    {
        // LOAD PLAYER
        this.load.spritesheet('ships', 'assets/ships.png', {
    	   frameWidth: 66,
    	   frameHeight: 66
        });
        
        // LOAD LSR
        this.load.image('laser', 'assets/lsr.png');
        
        // LOAD AS(S)
        this.load.image('ass', 'assets/ass.png');
        this.load.image('ass_1', 'assets/ass_1.png');
        this.load.image('ass_2', 'assets/ass_2.png');
        this.load.image('ass_3', 'assets/ass_3.png');
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
        this.scene.scene.start("mining", { player: new Player(0) });
        this.scene.scene.launch("mining-status");
    }
           
    update() {
        // TADAH!
    }
};