class DrawableObject {
    
    img;
    imagecache = {};
    currentImage = 0;
    x = 50;
    y = 25;
    height = 100;
    width = 100;
    
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(json) {
        json.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imagecache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Pufferfish || this instanceof Jellyfish) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'black';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}