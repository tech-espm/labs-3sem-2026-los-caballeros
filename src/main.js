import { Boot } from './scenes/Boot.js';
import { Game } from './scenes/Game.js';
import { GameOver } from './scenes/GameOver.js';
import { Preloader } from './scenes/Preloader.js';
import { MainMenu } from './scenes/MainMenu.js';

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game', 
    backgroundColor: '#000000',
    
    scale: {
        mode: Phaser.Scale.FIT,        // ← Isso é o mais importante
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 450 },
            debug: false
        }
    },

    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver
    ]
};

new Phaser.Game(config);