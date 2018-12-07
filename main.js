var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
};
var game = new Phaser.Game(config);

game.scene.add("game", gamescene());
game.scene.add("gameover", gameover());

game.scene.start("game")