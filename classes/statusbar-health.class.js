class StatusBarHealth extends DrawableObject {
    IMAGES_HEALTH = [
        './img/4. Markers/green/Life/0_  copia 3.png',    // 0 % LIFE
        './img/4. Markers/green/Life/20_ copia 4.png',    // 20% LIFE
        './img/4. Markers/green/Life/40_  copia 3.png',   // 40% LIFE   
        './img/4. Markers/green/Life/60_  copia 3.png',   // 60% LIFE
        './img/4. Markers/green/Life/80_  copia 3.png',   // 80% LIFE
        './img/4. Markers/green/Life/100_  copia 2.png'   // 100% LIFE
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.y = -20;
        this.x = 0;
        this.width = 200;
        this.height = 80;
        this.setPercentage(100);
    }


    /**
     * updates the statusbar by colliding with enemies 
     * @param {number} percentage - the percentage displays of the energy of the character
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imagecache[path];
    }


    /**
     * 
     * @returns the number of the actual image to display the correct statusbar percent
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}