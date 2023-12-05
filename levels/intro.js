export class IntroScene extends Phaser.Scene {

  constructor() {
    super('IntroScene');
  }

  preload() {
    this.load.image("bg", "assets/images/mainBackground.png");
  }

  create() {
    this.add.image(600, 300, "bg");
    const card = this.add
    .rectangle(
      this.scale.width/2  ,
      this.scale.height / 2,
      600,
      300,
      0xf5f5dc
    )
    
    .setOrigin(0.5)
    .setAlpha(0.7);
    this.add.text(card.x -50, card.y - 120, 'WELCOME', {
      fontSize: "20px",
      fill: "#000",
    });
    this.add.text(card.x - 270, card.y - 60, 'This is a description of the game. Hit space to clear the word!', {
      fontSize: "16px",
      fill: "#000",
      wordWrap: { width: card.width - 20 }
    });
  }
};
