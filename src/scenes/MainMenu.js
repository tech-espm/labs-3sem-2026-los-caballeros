export class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        const bg = this.add.image(512, 384, 'startBG');
        bg.setDisplaySize(1024, 768);

        // Botão Start
        const startButton = this.add.rectangle(512, 695, 360, 95, 0x000000, 0);
        startButton.setInteractive({ useHandCursor: true });

        startButton.on('pointerdown', () => {
            this.cameras.main.fadeOut(400, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('Game');
            });
        });

        startButton.on('pointerover', () => startButton.setAlpha(0.3));
        startButton.on('pointerout', () => startButton.setAlpha(1));
    }
}