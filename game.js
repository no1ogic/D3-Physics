class Example extends Phaser.Scene
{
    rect;
    blocks = [];

    preload ()
    {
        this.load.image('mushroom', 'assets/drop.png');
        this.load.image('bound', 'assets/bound.png');
        this.load.image('cloud', 'assets/cloud.png');
        this.load.image('dbacc','assets/bacc.png');

    }

    create ()
    {
        let backq = this.add.image(400,300,'dbacc').setScale(2)
        let topover = this.add.image(400,150,'cloud').setScale(1.7)
        
        const spriteBounds = Phaser.Geom.Rectangle.Inflate(Phaser.Geom.Rectangle.Clone(this.physics.world.bounds), -20, -20);
        let raindrop = 200;
        for (let i = 0; i < raindrop; i++)
        {
            const pos = Phaser.Geom.Rectangle.Random(spriteBounds);

            const block = this.physics.add.sprite(pos.x, pos.y, 'mushroom').setScale(3);

            block.setBounce(1).setCollideWorldBounds(true);

            Phaser.Math.RandomXY(block.body.velocity, 200);

            this.blocks.push(block);
        }

        this.rect = this.add.rectangle(400, 300, 500, 200).setStrokeStyle(2, 0xffff00)
        let overlay = this.add.image(400,300,'bound')

        
        this.input.on('pointerdown', (pointer) =>{
            const { left, top, width, height } = this.rect.getBounds();
            const qodiesInRect = this.physics.overlapRect(left, top, width, height);
            this.rect = this.add.rectangle(400, 300, 800, 600, "#5da9be");
            if ( qodiesInRect.length == raindrop){
                this.scene.start('trans1');

            }
            else{
                let disp = this.add.text(400,300, qodiesInRect.length, {fontSize: 200}).setOrigin(0.5,0.5)
            }
                console.log(qodiesInRect.length)


        })

    }

    update ()
    {
        Phaser.Actions.SetAlpha(this.blocks, 0.8);
        

        const { left, top, width, height } = this.rect.getBounds();

        const bodiesInRect = this.physics.overlapRect(left, top, width, height);


        Phaser.Actions.SetAlpha(bodiesInRect.map(body => body.gameObject), 1);
        
        //console.log(bodiesInRect.length)
    }
}

class Trans1 extends Phaser.Scene
{
    constructor(){
        super("trans1")
    }
    create ()
    {
        this.rect = this.add.rectangle(400, 300, 500, 200).setStrokeStyle(2, 0xffff00);

    }

    update ()
    {

    }
}
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: [Example,Trans1]
};

const game = new Phaser.Game(config);
