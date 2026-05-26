export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    // O init roda sempre que a cena reinicia
    init() {
        this.score = 0;
        this.lives = 3;
        this.isGameOver = false;
        this.targetBasketX = 512;
        this.obstacles = [];
        this.itensSaudaveis = ['saudavel1', 'saudavel2', 'saudavel3', 'saudavel4'];
        this.itensBombas = ['bomba1', 'bomba2', 'bomba3', 'bomba4', 'bomba5', 'bala'];
    }

    create() {
        // Garante que a física não esteja pausada de uma rodada anterior
        this.physics.resume();
        this.cameras.main.setBackgroundColor(0x1a237e);
        
        // Limites do mundo
        this.physics.world.setBounds(0, 0, 1024, 850);

        if (this.textures.exists('background')) {
            this.add.image(512, 384, 'background').setAlpha(1.0).setDisplaySize(1024, 768);
        }

        this.physics.world.gravity.y = 450;

        this.createObstacles();
        this.createBasket();

        // UI - Score e Vidas (Fontes alteradas para Arial - Sem Serifa)
        this.scoreText = this.add.text(20, 20, 'Pontuação: 0', { 
            fontFamily: 'Verdana', fontSize: 32, color: '#ffffff', stroke: '#000' , strokeThickness: 6
        });
        this.livesText = this.add.text(20, 70, 'Vidas: 3', { 
            fontFamily: 'Verdana', fontSize: 24, color: '#ff4d4d', stroke: '#000' , strokeThickness: 4
        });

        // Evento de Spawn
        this.spawnTimer = this.time.addEvent({
            delay: 500,
            callback: this.spawnItem,
            callbackScope: this,
            loop: true
        });

        // Movimentação do Mouse
        this.input.on('pointermove', (pointer) => {
            if (!this.isGameOver) {
                this.targetBasketX = Phaser.Math.Clamp(pointer.x, 75, 949);
            }
        });
    }

    createObstacles() {
        const rows = 4; 
        const cols = 10;
        const xSpacing = 95;
        const ySpacing = 110;

        for (let row = 0; row < rows; row++) {
            let offsetX = (row % 2 === 0) ? 0 : 45;
            for (let col = 0; col < cols; col++) {
                let x = 100 + offsetX + (col * xSpacing);
                let y = 180 + (row * ySpacing);
                
                let peg = this.add.circle(x, y, 6, 0xFFD700);
                this.physics.add.existing(peg, true);
                peg.body.setCircle(4); 
                this.obstacles.push(peg);
            }
        }
    }

    createBasket() {
        const basketY = 700;
        this.basketSprite = this.add.graphics();
        this.basketSprite.fillStyle(0x4caf50, 1);
        this.basketSprite.fillRect(-75, -15, 150, 30);
        this.basketSprite.lineStyle(4, 0xffffff, 1);
        this.basketSprite.strokeRect(-75, -15, 150, 30);

        this.basket = this.physics.add.existing(
            this.add.rectangle(512, basketY, 150, 50, 0x000000, 0),
            true
        );
    }

    spawnItem() {
        if (this.isGameOver) return;

        const x = Phaser.Math.Between(100, 924);
        const isSaudavel = Math.random() > 0.6;
        const textureKey = isSaudavel 
            ? Phaser.Utils.Array.GetRandom(this.itensSaudaveis)
            : Phaser.Utils.Array.GetRandom(this.itensBombas);

        let item = this.physics.add.image(x, -50, textureKey);
        item.setScale(0.4); 
        
        const radius = item.width * 0.25;
        item.setCircle(radius, item.width * 0.25, item.height * 0.25);
        
        item.setVelocityX(Phaser.Math.Between(-100, 100));
        item.setBounce(0.5, 0.3); 
        item.setCollideWorldBounds(true); 
        item.isSaudavel = isSaudavel;

        this.physics.add.collider(item, this.obstacles);
        this.physics.add.overlap(item, this.basket, this.collectItem, null, this);
    }

    collectItem(item, basket) {
        if (item.isSaudavel) {
            this.score += 10;
            this.scoreText.setText('Pontuação: ' + this.score);
        } else {
            this.lives--;
            this.livesText.setText('Vidas: ' + this.lives);
            this.cameras.main.shake(100, 0.01);
            if (this.lives <= 0) this.gameOver();
        }
        item.destroy();
    }

    update() {
        if (this.isGameOver) return;

        if (this.basket) {
            const lerp = 0.2;
            this.basket.x = Phaser.Math.Linear(this.basket.x, this.targetBasketX, lerp);
            this.basket.body.updateFromGameObject(); 

            this.basketSprite.x = this.basket.x;
            this.basketSprite.y = this.basket.y;
        }

        this.children.list.forEach(child => {
            if (child.texture && child.y > 750) {
                child.destroy();
            }
        });
    }

    gameOver() {
        this.isGameOver = true;
        this.physics.pause(); // Pausa a física
        this.spawnTimer.remove(); // Para o surgimento de itens
        
        // Em vez de criar botões aqui, vamos para a cena de GameOver
        // Passamos o score atual para ser exibido lá
        this.scene.start('GameOver', { score: this.score });
    }
}