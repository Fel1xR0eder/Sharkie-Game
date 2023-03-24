class World {

    character = new Character();
    
    enemies = [
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
    ];
    
    
    lights = [
        new Light()
    ];


    backgroundObjects = [
        new BackgroundObject('img/3. Background/Layers/5. Water/left.png', 0),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/left.png', 0),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/left.png',0),
        new BackgroundObject('img/3. Background/Layers/2. Floor/left.png', 0)
    ];


    canvas;
    ctx;
    
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Canvas wird gelöscht

        this.addObjectsToMap(this.backgroundObjects);   // Element wird gerendert
        this.addObjectsToMap(this.lights);              // Element wird gerendert
        this.addObjectsToMap(this.enemies);             // Element wird gerendert
        this.addToMap(this.character);                  // Element wird gerendert

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }
    

    addToMap(MovObj) {
        this.ctx.drawImage(MovObj.img, MovObj.x, MovObj.y, MovObj.width, MovObj.height);
    };

    
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }
}