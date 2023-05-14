class Level1 extends Phaser.Scene
{
    constructor(){
        super("level1")
    }
    blocks = [];

   
    create ()
    {
        let backq = this.add.image(400,300,'dbacc').setScale(2)
        let topover = this.add.image(400,150,'cloud').setScale(1.7)
        
        const spriteBounds = Phaser.Geom.Rectangle.Inflate(Phaser.Geom.Rectangle.Clone(this.physics.world.bounds), -20, -20);
        let raindrop = 100;
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
            let scre = this.add.image(400,300, "sco").setScale(2);

            if ( qodiesInRect.length == raindrop){
                this.scene.start('trans1');

            }
            else{
                let disp = this.add.text(580,310, qodiesInRect.length, {fontSize: 200}).setOrigin(0.5,0.5);
                let ep = this.add.text(100,500, "Now for some earth for a landslide!",{fontSize:30});
            }
                //console.log(config.arcade)


        })

    }

    update ()
    {
        
        

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
        let backq = this.add.image(400,300,'torn').setScale(2)

        
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
        let ammo = 35
        const group = this.physics.add.group({
            key: 'earth',
            frameQuantity: ammo,
            gridAlign:{
                x:5,
                y:10,
                width: 10,
                height: 15,
                cellWidth: 10,
                cellHeight: 10,
            },
            bounceX: .9,
            bounceY: .9,
            collideWorldBounds: true
        });
            group.setVelocityX(5,350);
            group.setVelocityY(5,10);

        let groupcoord1 = 400;
        let groupcoord2 = 300;
        this.rect = this.add.rectangle(groupcoord1, groupcoord2, 500, 200).setStrokeStyle(2, 0xffff00)
        this.overlay = this.physics.add.image(groupcoord1,groupcoord2,'bound').setImmovable(true);
        //this.physics.add.collider(group, overlay)
        // this.input.on('pointermove', (pointer) => {
        //     this.rect.copyPosition(pointer);
        //     this.overlay.copyPosition(pointer);
        // });

        this.tweens.add({
            targets: this.rect,
            x: "+-" + 20,
            yoyo: true,
            ease: 'Bounce.inOut',
            repeat: -1,
            duration: 200
        })
        this.tweens.add({
            targets: this.overlay,
            x: "+-" + 20,
            yoyo: true,
            ease: 'Bounce.inOut',
            repeat: -1,
            duration: 200
        })
        this.input.on('pointerdown', (pointer) =>{
            const { left, top, width, height } = this.rect.getBounds();
            const qodiesInRect = this.physics.overlapRect(left, top, width, height);
            this.rect = this.add.rectangle(400, 300, 800, 600, "#5da9be").setScale(1);
            let scr = this.add.image(400,300,'sco').setScale(2)

            if ( qodiesInRect.length == ammo+1){
                this.scene.start('trans2');

            }
            else{
                
                let disp = this.add.text(570,300, qodiesInRect.length, {fontSize: 200}).setOrigin(0.5,0.5)
                let ep = this.add.text(100,500, "Lastly, some stars for fire.",{fontSize:30});

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
        //this.rect.rotation += 0.01;
        //this.overlay.rotation += 0.01;


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
class Level3 extends Phaser.Scene
{
    constructor(){
        super("level3")
    }
    //rect;
    blocks = [];

    create ()
    {
        let backq = this.add.image(400,300,'strs').setScale(2)

        
        //const spriteBounds = Phaser.Geom.Rectangle.Inflate(Phaser.Geom.Rectangle.Clone(this.physics.world.bounds), -20, -20);
        const spriteBounds = Phaser.Geom.Rectangle.Inflate(Phaser.Geom.Rectangle.Clone(this.physics.world.bounds), -20, -20);
        let raindrop = 100;
        for (let i = 0; i < raindrop; i++)
        {
            const pos = Phaser.Geom.Rectangle.Random(spriteBounds);

            var block = this.physics.add.sprite(pos.x, pos.y, 'star').setScale(Phaser.Math.Between(1,3));
            //block.setGravityY(Phaser.Math.Between(-1000,1000));
            //block.setGravityX(Phaser.Math.Between(-1000,1000));
            block.setBounce(1.0).setCollideWorldBounds(true);

            Phaser.Math.RandomXY(block.body.velocity, 40);

            this.blocks.push(block);
        }

        let groupcoord1 = 400;
        let groupcoord2 = 300;
        this.rect = this.add.rectangle(groupcoord1, groupcoord2, 500, 200).setStrokeStyle(2, 0xffff00)
        this.overlay = this.physics.add.image(groupcoord1,groupcoord2,'bound').setImmovable(true);
        

        this.input.on('pointermove', (pointer) => {
            this.rect.copyPosition(pointer);
            this.overlay.copyPosition(pointer);
        });
        this.input.on('pointerdown', (pointer) =>{
            const { left, top, width, height } = this.rect.getBounds();
            const qodiesInRect = this.physics.overlapRect(left, top, width, height);
            this.rect = this.add.rectangle(400, 300, 800, 600, "#5da9be").setScale(4);
            let scr = this.add.image(400,300,'sco').setScale(2)

            if ( qodiesInRect.length == raindrop+1){
                this.scene.start('trans3');

            }
            else{
                
                let disp = this.add.text(570,300, qodiesInRect.length, {fontSize: 200}).setOrigin(0.5,0.5)

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
        //this.rect.rotation += 0.01;
        //this.overlay.rotation += 0.01;


        Phaser.Actions.SetAlpha(bodiesInRect.map(body => body.gameObject), 1);
        
        //console.log(bodiesInRect.length)
    }
}

class Trans2 extends Phaser.Scene
{
    constructor(){
        super("trans2")
    }
    create ()
    {
        this.rect = this.add.rectangle(400, 300, 500, 200).setStrokeStyle(2, 0xffff00);
        this.scene.start("level3")

    }

    update ()
    {

    }
}

class Trans3 extends Phaser.Scene
{
    constructor(){
        super("trans3")
    }
    create ()
    {
        this.rect = this.add.rectangle(400, 300, 500, 200).setStrokeStyle(2, 0xffff00);
        this.scene.start("epo")

    }

    update ()
    {

    }
}

class eplogue extends Phaser.Scene
{
    constructor(){
        super("epo")
    }
    create ()
    {
        this.add.image(400,300,'endp').setScale(2);
        this.input.on('pointerdown', () =>{
            this.scene.start('int')
        })

    }

    update ()
    {

    }
}
class intro extends Phaser.Scene
{
    constructor(){
        super("int")
    }
    preload ()
    {
        this.load.image('rain', 'assets/drop.png');
        this.load.image('bound', 'assets/bound.png');
        this.load.image('cloud', 'assets/cloud.png');
        this.load.image('dbacc','assets/bacc.png');
        this.load.image('earth', 'assets/earth.png');
        this.load.image('torn','assets/torn.png');
        this.load.image('sco','assets/sco.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('strs', 'assets/strs.png');
        this.load.image('endp', 'assets/endp.png');
        this.load.image('int', 'assets/intro.png');

    }

    create ()
    {
        this.add.image(400,300,'int').setScale(1);
        this.input.on('pointerdown', () =>{
            this.scene.start('level1')
        })

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
    scene: [intro, Level1,Trans1,Level2,Trans2,Level3,Trans3,eplogue]
    //scene: Level2
    //scene:[Level3]
};

const game = new Phaser.Game(config);
