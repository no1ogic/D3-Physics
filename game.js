class Example extends Phaser.Scene
{
    //rect;
    blocks = [];

    preload ()
    {
        this.load.image('rain', 'assets/drop.png');
        this.load.image('bound', 'assets/bound.png');
        this.load.image('cloud', 'assets/cloud.png');
        this.load.image('dbacc','assets/bacc.png');
        this.load.image('earth', 'assets/earth.png');

    }

    create ()
    {
        let backq = this.add.image(400,300,'dbacc').setScale(2)
        let topover = this.add.image(400,150,'cloud').setScale(1.7)
        
        const spriteBounds = Phaser.Geom.Rectangle.Inflate(Phaser.Geom.Rectangle.Clone(this.physics.world.bounds), -20, -20);
        let raindrop = 500;
        for (let i = 0; i < raindrop; i++)
        {
            const pos = Phaser.Geom.Rectangle.Random(spriteBounds);

            var block = this.physics.add.sprite(pos.x, pos.y, 'rain').setScale(Phaser.Math.Between(1,3));
            block.setGravityY(Phaser.Math.Between(-1000,1000));
            block.setGravityX(Phaser.Math.Between(-1000,1000));
            block.setBounce(1.0).setCollideWorldBounds(true);

            Phaser.Math.RandomXY(block.body.velocity, 200);

            this.blocks.push(block);
        }

        this.rect = this.add.rectangle(400, 100, 500, 200).setStrokeStyle(2, 0xffff00)
        let overlay = this.add.image(400,100,'bound')
        this.tweens.add({
            targets: this.rect,
            y: "+-" + 400,
            x: "+-" + 100,
            yoyo: true,
            ease: 'Bounce.inOut',
            repeat: -1,
            duration: 2000
        })
        this.tweens.add({
            targets: overlay,
            y: "+-" + 400,
            x: "+-" + 100,
            yoyo: true,
            ease: 'Bounce.inOut',
            repeat: -1,
            duration: 2000
        })

        
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
                //console.log(config.arcade)


        })

    }

    update ()
    {
        Phaser.Actions.SetAlpha(this.blocks, 0);
        //Phaser.Actions.SetAlpha(this.backq, 0);
        

        const { left, top, width, height } = this.rect.getBounds();

        const bodiesInRect = this.physics.overlapRect(left, top, width, height);


        Phaser.Actions.SetAlpha(bodiesInRect.map(body => body.gameObject), 1);
        
        //console.log(bodiesInRect.length)
    }
}
class Level2 extends Phaser.Scene
{
    constructor(){
        super("level2")
    }
    //rect;
    blocks = [];

    create ()
    {
        let backq = this.add.image(400,300,'dbacc').setScale(2)
        let topover = this.add.image(400,150,'cloud').setScale(1.7)
        
        const spriteBounds = Phaser.Geom.Rectangle.Inflate(Phaser.Geom.Rectangle.Clone(this.physics.world.bounds), -20, -20);
        let raindrop = 50;
        // for (let i = 0; i < raindrop; i++)
        // {
        //     const pos = Phaser.Geom.Rectangle.Random(spriteBounds);

        //     var block = this.physics.add.sprite(pos.x, pos.y, 'rain').setScale(Phaser.Math.Between(1,3));
        //     //block.setGravityY(Phaser.Math.Between(-1000,1000));
        //     //block.setGravityX(Phaser.Math.Between(-1000,1000));
        //     block.setGravityX(-1)
        //     block.setBounce(1.0).setCollideWorldBounds(true);

        //     Phaser.Math.RandomXY(block.body.velocity, 200);

        //     this.blocks.push(block);
        // }
        let ammo = 27
        const group = this.physics.add.group({
            key: 'earth',
            frameQuantity: ammo,
            gridAlign:{
                x:10,
                y:25,
                width: 20,
                height: 15,
                cellWidth: 100,
                cellHeight: 100
            },
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true
        });
            group.setVelocityX(50,100);
            group.setVelocityY(100,50);

        let groupcoord1 = 400;
        let groupcoord2 = 300;
        this.rect = this.add.rectangle(groupcoord1, groupcoord2, 500, 200).setStrokeStyle(2, 0xffff00)
        this.overlay = this.physics.add.image(groupcoord1,groupcoord2,'bound').setImmovable(true);
        //this.physics.add.collider(group, overlay)
        

        
        this.input.on('pointerdown', (pointer) =>{
            const { left, top, width, height } = this.rect.getBounds();
            const qodiesInRect = this.physics.overlapRect(left, top, width, height);
            this.rect = this.add.rectangle(400, 300, 800, 600, "#5da9be");
            if ( qodiesInRect.length == ammo+1){
                this.scene.start('trans1');

            }
            else{
                let disp = this.add.text(400,300, qodiesInRect.length, {fontSize: 200}).setOrigin(0.5,0.5)
            }
                //console.log(config.arcade)


        })

    }

    update ()
    {
        //Phaser.Actions.SetAlpha(this.blocks, 1);
        //Phaser.Actions.SetAlpha(this.backq, 0);
        

        const { left, top, width, height } = this.rect.getBounds();

        const bodiesInRect = this.physics.overlapRect(left, top, width, height);
        this.rect.rotation += 0.01;
        this.overlay.rotation += 0.01;


        //Phaser.Actions.SetAlpha(bodiesInRect.map(body => body.gameObject), 0.1);
        
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
        this.scene.start("level2")

    }

    update ()
    {

    }
}



var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { x: 100, y: 200 },
            debug: false
        }
    },
    scene: [Example,Trans1,Level2]
    //scene: Level2
};

const game = new Phaser.Game(config);
