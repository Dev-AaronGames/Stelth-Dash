function gamescene() {


    var player;
    var player2;
    var midpoint;
    var bombs;
    var platforms;
    var cursors;
    var score = 0;
    var gameOver = false;
    var scoreText;
    var atak;
    var atak2;
    var bulits;
    var players;
    var trophys;


    function preload() {
        this.load.image('bulit', 'assets/New Piskel (7).png')
        this.load.image('sidegrownd', 'assets/New Piskel (6.1.png');
        this.load.image('place', 'assets/New Piskel (5).png');
        this.load.image('ground', 'assets/New Piskel (6).png');
        this.load.image('win', 'assets/New Piskel (4).png');
        this.load.spritesheet('punk', 'assets/New Piskel (3).png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('dude', 'assets/New Piskel.png', { frameWidth: 32, frameHeight: 26 });
        this.load.audio("coin", "sounds/coin.wav")
        this.load.audio("bob", "sounds/explosion1.mp3")
        this.load.audio("m", "sounds/game song.mp3")
    }

    function create() {
        /*
         * World Setup
         */
        const worldTiles = 5;
        const tileWidth = 800;
        this.physics.world.setBounds(0, 0, worldTiles * tileWidth, 600);
        const camera = this.cameras.main;
        camera.setBounds(0, 0, worldTiles * tileWidth, 600)
        midpoint = this.add.sprite()
        camera.startFollow(midpoint)
        this.sound.play("m", { loop: true})
        /*
         * Background
         */
        for (let i = 0; i < worldTiles; i++) {
            this.add.image(400 + (i * tileWidth), 300, 'place');
            this.add.image(400 + (i * tileWidth), 900, 'place');
        }


        /*
         * Platforms
         */
        platforms = this.physics.add.staticGroup();
        platforms.create(600, 260, 'ground');
        platforms.create(1, 260, 'ground');
       // platforms.create(200, 260, 'sidegrownd').setScale(1,0.3).refreshBody();
         //platforms.create(200, 400, 'sidegrownd').setScale(1,0.3).refreshBody();
         //platforms.create(300, 210, 'ground').setScale(2,0.3).refreshBody();
         //platforms.create(300, 450, 'ground').setScale(2,0.3).refreshBody();
    
        platforms.create(300, 260, 'ground');
        platforms.create(800, 260, 'ground');
        platforms.create(1400, 260, 'ground');
        platforms.create(1800, 260, 'ground');
        platforms.create(2200, 260, 'ground');
        platforms.create(2600, 260, 'ground');
        platforms.create(3000, 260, 'ground');
        platforms.create(3400, 260, 'ground');
        platforms.create(3800, 260, 'ground');
        platforms.create(4200, 260, 'ground');
        platforms.create(4600, 260, 'ground');
        platforms.create(5000, 260, 'ground');
        platforms.create(1000, 260, 'ground');
        for (let i = 0; i < worldTiles; i++) {
            platforms.create(400 + (i * tileWidth), 568, "ground").setScale(2).refreshBody();
        }



        //eny
        eny = this.physics.add.group();
        bulits = this.physics.add.group();

        const eny1 = eny.create(300, 231, "punk");
        eny1.flipX = true;
        eny1.setData("facing", "left");

        const eny2 = eny.create(300, 523, "punk");
        eny2.flipX = true;
        eny2.setData("facing", "left");

        const eny3 = eny.create(320, 523, "punk");
        eny3.flipX = false;
        eny3.setData("facing", "right");

        trophys = this.physics.add.group()
        trophys.create(3210, 523,"win")
        trophys.create(3210, 231 ,"win")


        /*
         * Player Setup
         */
        players = this.physics.add.group();
        player = players.create(100, 450, 'dude');
        player.setBounce(.01);
        player.setCollideWorldBounds(true);
        player.setData("player", 1);
        player2 = players.create(100, 200, 'dude');
        player2.setBounce(.01);
        player2.setCollideWorldBounds(true);
        player2.setData("player", 2);



        /*
         * Player Animations
         */
        this.anims.create({
            key: 'left',
            frames: [{ key: 'dude', frame: 0 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 1 }],
            frameRate: 1
        });
        this.anims.create({
            key: 'right',
            frames: [{ key: 'dude', frame: 2 }],
            frameRate: 100,
            repeat: -1
        });
        this.anims.create({
            key: 'atak',
            frames: [{ key: 'dude', frame: 3 }],
            frameRate: 100,

        })

        /*
         * Input
         */
        cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up2: Phaser.Input.Keyboard.KeyCodes.W,
            down2: Phaser.Input.Keyboard.KeyCodes.S,
            left2: Phaser.Input.Keyboard.KeyCodes.A,
            right2: Phaser.Input.Keyboard.KeyCodes.D,
            atak: Phaser.Input.Keyboard.KeyCodes.SPACE,
            atak2: Phaser.Input.Keyboard.KeyCodes.SHIFT,

        });

        /*
         * Collisions
         */
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player2, platforms);
        this.physics.add.collider(trophys, platforms);

        this.physics.add.collider(eny, platforms);
        this.physics.add.collider(players, bulits, player => {
            console.log("hit")
            window.playerName = player.getData("player");
            window.win = false
            this.scene.stop();
            this.scene.start("gameover");
        });
        this.physics.add.collider(players, trophys, player => {
            console.log("hit")
            window.playerName = player.getData("player");
            window.win = true

            this.scene.stop();
            this.scene.start("gameover");
        });
    }

    function update() {
        eny.getChildren().forEach(eny => {
            [player, player2].forEach(player => {
                let facing = false;
                if (eny.getData("facing") === "left" && player.x < eny.x) {
                    facing = true;
                }
                else if (eny.getData("facing") === "right" && player.x > eny.x) {
                    facing = true;
                }

                const enyDistance = 200;
                let distance = false;
                if (Math.abs(eny.x - player.x) < enyDistance) {
                    distance = true;
                }

                let height = false;
                if (Math.abs(eny.y - player.y) < 100)
                    if (distance && facing) {

                        spawnBulit.call(this, eny.x, eny.y, eny.getData("facing"));
                    }
            })
        })

        if (gameOver) {
            return;
        }

        console.log(`player1: (${Math.floor(player.x)}, ${Math.floor(player.y)}), player2: (${Math.floor(player.x)}, ${Math.floor(player2.y)})`)

        const distance = Math.abs(player.x - player2.x)
        const mid = Math.min(player.x, player2.x) + distance / 2
        midpoint.x = mid

        /*
         * Player one controls
         */
        if (cursors.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }

        if (cursors.atak.isDown) {
            player.anims.play("atak", true)
            atak = true
        } else {
            atak = false
        }

        /*
         * Player two controls
         */
        if (cursors.left2.isDown) {
            player2.setVelocityX(-160);

            player2.anims.play('left', true);
        }
        else if (cursors.right2.isDown) {
            player2.setVelocityX(160);

            player2.anims.play('right', true);
        }
        else {
            player2.setVelocityX(0);

            player2.anims.play('turn');
        }

        if (cursors.up2.isDown && player2.body.touching.down) {
            player2.setVelocityY(-330);
        }

        if (cursors.atak2.isDown) {
            player2.anims.play("atak", true)
            atak2 = true
        } else {
            atak2 = false
        }
        function spawnBulit(x, y, direction) {
            var bulit = bulits.create(x, y, "bulit")
            bulit.body.allowGravity = false
            if (direction == "left") {
                bulit.setVelocityX(-200)
            }
            else if (direction == "right") {
                bulit.setVelocityX(200)
            } else {
                console.error("invalid bullit direction")
            }

            this.time.addEvent({
                delay: 2000,
                callback: () => {
                    bulit.destroy()
                }
            })
        }
    }
    return {
        preload,
        create,
        update
    }
}