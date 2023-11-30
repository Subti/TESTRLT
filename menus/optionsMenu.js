export class OptionsScene extends Phaser.Scene {
  constructor() {
    super("scene-options");
  }

  preload() {
    this.load.image('raster', 'assets/raster.png');
    // Also from phaser example
    // this.load.audioSprite('sfx', 'assets/audio/SoundEffects/fx_mixdown.json', [
    //   'assets/audio/SoundEffects/fx_mixdown.ogg',
    //   'assets/audio/SoundEffects/fx_mixdown.mp3'
    // ]);
  }

  create() {
    // Test background from phaser example
    const group = this.add.group();

    group.createMultiple({ key: 'raster', repeat: 8 });

    let ci = 0;
    const colors = [0xef658c, 0xff9a52, 0xffdf00, 0x31ef8c, 0x21dfff, 0x31aade, 0x5275de, 0x9c55ad, 0xbd208c];

    const _this = this;

    group.children.iterate(child => {

      child.x = -100;
      child.y = 300;
      child.depth = 9 - ci;

      child.tint = colors[ci];

      ci++;

      _this.tweens.add({
        targets: child,
        x: 1300,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        duration: 1500,
        delay: 100 * ci
      });

    });

    const backButton = this.add
      .text(600, 300, "Back to Menu", { fontSize: "32px", fill: "white" })
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .on("pointerdown", () => this.scene.start("scene-menu"));
    this.tweens.add({
      targets: backButton,
      alpha: 0.25, // Fades out in 250 ms
      yoyo: true, // Reverses animation
      repeat: -1, // Repeat infinitely
      duration: 500, // Run animation for 500 ms
    });
  }
};