export class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    
    init(data) {
        this.finalScore = data.score || 0;
    }

    create() {
        const bg = this.add.image(512, 384, 'gameOverBG');
        bg.setDisplaySize(1024, 768);
        
        this.add.text(512, 465, 'Pontuação Final: ' + this.finalScore, {
            fontFamily: 'Verdana', fontSize: 32, color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.85)'
        })
        .setOrigin(0.5)
        .setPadding(75);

      
        const restartBtn = this.add.text(512, 640, '                           ', {
            fontFamily: 'Verdana', fontSize: 50, color: '#ffffff', backgroundColor: 'transparent'
        })
        .setOrigin(0.5)
        .setPadding(10)
        .setInteractive({ useHandCursor: true });

        restartBtn.on('pointerdown', () => {
            this.scene.start('Game'); 
        });

       
        const menuBtn = this.add.text(512, 725, '                      ', {
            fontFamily: 'Verdana', fontSize: 42, color: '#ffffff', backgroundColor: 'transparent'
        })
        .setOrigin(0.5)
        .setPadding(10)
        .setInteractive({ useHandCursor: true });

        menuBtn.on('pointerdown', () => {
            this.scene.start('MainMenu'); 
        });

      
        [restartBtn, menuBtn].forEach(btn => {
            btn.on('pointerover', () => btn.setStyle({ fill: '#ffff00' }));
            btn.on('pointerout', () => btn.setStyle({ fill: '#ffffff' }));
        });
    }
}