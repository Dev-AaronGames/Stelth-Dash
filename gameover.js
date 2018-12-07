function gameover() {
    let cursors;
    function preload() {

    }
    function create() {
        
        cursors = this.input.keyboard.addKeys({
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
        })
        if (window.win == true){
            this.add.text(500,300, `Player ${window.playerName} wins!`)
        }else{
            let text = this.add.text(500, 300, `Game Over, player ${window.playerName} loses`, {
                color: "white"
            });
        }
    }
    function update() {
        if (cursors.enter.isDown) {
            location.reload();
        }
    }

    return {
        preload,
        create,
        update
    }
}