class Audio {

    //Character Sounds
    swimming_sound = new Audio('./audio/swimming.mp3');
    bubble_sound = new Audio('./audio/blub.mp3');
    earn_coin_sound = new Audio('./audio/collect-coin.wav');
    collect_poison_sound = new Audio('./audio/collect-poison.wav');
    gameover_sound = new Audio('./audio/gameover.wav');

    // Endboss Sounds
    bossHurt_sound = new Audio('./audio/bosshurt.wav');
    win_sound = new Audio ('./audio/you_win.mp3');
    attack_sound = new Audio ('./audio/bite.wav');

    //Jellyfish Sounds
    buzz_sound = new Audio ('./audio/buzz.wav');


    //Pufferfish Sounds
    hurt_sound = new Audio ('./audio/hurt.mp3');


    // Game Sounds
    ambience_sound = new Audio('./audio/gamesound.mp3');
    intro_sound = new Audio('./audio/underwater_normal.mp3');


    pushAllAudios() {
        allAudios.push(ambience_sound);
        allAudios.push(intro_sound);
        allAudios.push(this.buzz_sound);
        allAudios.push(this.hurt_sound);
        allAudios.push(this.bossHurt_sound);
        allAudios.push(this.win_sound);
        allAudios.push(this.attack_sound);
        allAudios.push(this.swimming_sound);
        allAudios.push(this.bubble_sound);
        allAudios.push(this.earn_coin_sound);
        allAudios.push(this.collect_poison_sound);
        allAudios.push(this.gameover_sound);
    }
}