export class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        // Define o caminho base para os assets
        this.load.setPath('assets');

        // Carrega a imagem do menu usando o nome real do arquivo (Start.png)
        this.load.image('startBG', 'Start.png');
        this.load.image('gameOverBG', 'GameOver.png');

        // Itens do Jogo
        this.load.image('saudavel1', 'abacate.png');
        this.load.image('saudavel2', 'melancia.png');
        this.load.image('saudavel3', 'maca.png'); 
        this.load.image('saudavel4', 'banana.png');
        this.load.image('bomba1', 'burguer.png');
        this.load.image('bomba2', 'pizza.png');
        this.load.image('bomba3', 'fritas.png');
        this.load.image('bomba4', 'refri.png');
        this.load.image('bomba5', 'bolo.png');
        this.load.image('bala', 'bala.png');
        this.load.image('background', 'bg.png');
    }

    create() {
        // Vai para o MainMenu, garantindo que a tela de início apareça
        this.scene.start('MainMenu');
    }
}