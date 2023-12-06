export class IntroScene extends Phaser.Scene {
  constructor() {
    super("IntroScene");
  }

  preload() {
    this.load.image("bg", "assets/images/mainBackground.png");
  }

  create() {
    this.add.image(600, 300, "bg");
    const card = this.add
      .rectangle(
        this.scale.width / 2,
        this.scale.height / 2,
        600,
        300,
        0xf5f5dc
      )

      .setOrigin(0.5)
      .setAlpha(0.7);
    this.add.text(card.x - 50, card.y - 120, "WELCOME", {
      fontSize: "20px",
      fill: "#000",
    });
    this.add.text(
      card.x - 270,
      card.y - 60,
      "Welcome to Keyboard Warrior, a rogue-like typing game to hone your speed and accuracy when typing! \n\nHitting space will fully clear the word you are typing. \n\nPower-ups last for the whole session. \n\nEnjoy!",
      {
        fontSize: "16px",
        fill: "#000",
        wordWrap: { width: card.width - 20 },
      }
    );
    const backButton = this.add
      .text(1100, 530, "Continue", {
        fontSize: "24px",
        fontFamily: "Pixelify Sans",
        fill: "white",
      })
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("Level1");
      });
  }
}
