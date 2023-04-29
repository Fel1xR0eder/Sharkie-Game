class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoins = new StatusBarCoins();
    statusBarPoison = new StatusBarPoison();
    throwableObjects = [];
    // collectableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    };


    setWorld() {
        this.character.world = this;
    };


    run() {
        setInterval(() => {
            this.BubbleAttack();
        }, 100);

        this.attackJellyfish();
        this.attackPufferfish();
        this.attackEndboss();
        this.checkHealthCollision();
        this.checkPoisonCollision();
        this.checkCoinCollision();
        this.jellyShock();
    }


    BubbleAttack() {
        if (this.keyboard.D && this.character.poison > 0) {

            setTimeout(() => {
                let bubble = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bubble);
                this.character.poison -= 10;
            }, 500);
        };

        this.statusBarPoison.setPercentagePoison(this.character.poison);
    }


    checkHealthCollision() {
        // #####    HIT BY ENEMY    ##### //
        setInterval(() => {
            this.level.pufferfish.forEach((pufferfish) => {
                this.level.jellyfish.forEach((jellyfish) => {
                    if (this.character.isColliding(pufferfish) || this.character.isColliding(jellyfish)) {
                        this.character.hit();
                        this.statusBarHealth.setPercentage(this.character.energy);
                    };
                });
            });
        }, 500);
    };


    checkCoinCollision() {
        // #####    COLLECT A COIN    ##### //
        setInterval(() => {
            this.level.coins.forEach((coins) => {
                if (this.character.isColliding(coins)) {
                    this.statusBarCoins.setPercentageCoin(this.character.money);
                    this.character.collectCoin();
                    this.level.coins.pop();
                };
            });
        }, 100);
    }


    checkPoisonCollision() {
        // #####    COLLECT POISON    ##### //
        setInterval(() => {
            this.level.poison.forEach((poison) => {
                if (this.character.isColliding(poison)) {
                    this.statusBarPoison.setPercentagePoison(this.character.poison);
                    this.character.collectPoison();
                    this.level.poison.pop(); // reihenfolge von Poisonbottles zufällig gerendert!
                };
            });
        }, 100);
    }


    attackPufferfish() {
        // #####    BUBBLE COLLIDES WITH ENEMY    ##### //
        setInterval(() => {
            this.level.pufferfish.forEach((pufferfish) => {
                this.throwableObjects.forEach((bubble) => {
                    if (bubble.isColliding(pufferfish)) {
                        pufferfish.health = false;
                        this.throwableObjects.pop(bubble);
                        pufferfish.enemyBubbleDead();
                    };
                });
            });
        }, 50);
    }


    attackEndboss() {
        // #####    BUBBLE COLLIDES WITH ENEMY    ##### //
        setInterval(() => {
            this.level.endboss.forEach((killerwhale) => {
                this.throwableObjects.forEach((bubble) => {
                    if (bubble.isColliding(killerwhale)) {
                        //killerwhale.health -= 20;
                        //enemyBubbleDead();
                    };
                });
            });
        }, 50);
    }

    attackJellyfish() {
        // #####    BUBBLE COLLIDES WITH ENEMY    ##### //
        setInterval(() => {
            this.level.jellyfish.forEach((jellyfish) => {
                this.throwableObjects.forEach((bubble) => {
                    if (bubble.isColliding(jellyfish)) {
                        jellyfish.health = false;
                        this.throwableObjects.pop(bubble);
                        jellyfish.enemyBubbleDead();
                    };
                });
            });
        }, 50);
    }


    jellyShock() {
        setInterval(() => {
            this.level.jellyfish.forEach(jellyfish => {
                if (this.character.isColliding(jellyfish)) {
                    this.character.hit();
                    this.character.shock = true;
                    jellyfish.shockAtCollision();
                };
            });
        }, 50);
    }


    draw() {    // ##### THE LOWER THE LINE, THE LOWER ON CANVAS ##### //
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.lights);
        this.ctx.translate(-this.camera_x, 0);

        // ##### FIXED OBJECTS HERE ##### //
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarPoison);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.pufferfish);
        this.addObjectsToMap(this.level.jellyfish);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poison);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    };


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    };

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    };


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    };


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    };

}