export class MenuScene extends Phaser.Scene {
  constructor() {
    super("scene-menu");
  }
  preload() {
    // From phaser example
    this.load.image('raster', 'assets/raster.png');
    // Also from phaser example
    this.load.audioSprite('sfx', 'assets/audio/SoundEffects/fx_mixdown.json', [
      'assets/audio/SoundEffects/fx_mixdown.ogg',
      'assets/audio/SoundEffects/fx_mixdown.mp3'
    ]);
  }

  create() {
    this.registry.set("points", 0);
    this.registry.set("speedDown", 150);
    this.registry.set("isColliding", false);
    this.registry.set("lives", 3);
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
    // Menu title text with basic style
    const title = this.add
      .text(600, 100, "Menu", { fontSize: "32px", fill: "#0f0" })
      .setOrigin(0.5, 0.5);
    // Create start button
    const startButton = this.add
      .text(600, 300, "Start Game", { fontSize: "32px", fill: "#0f0" })
      .setOrigin(0.5, 0.5) // Center align text
      .setInteractive()
      .on("pointerdown", () => this.scene.start("Level1")); // Start GameScene when the start button is clicked
    const options = this.add
      .text(600, 350, "Options", { fontSize: "32px", fill: "#0f0" })
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .on("pointerdown", () => this.scene.start("scene-options")); // Switch to options
  }
};