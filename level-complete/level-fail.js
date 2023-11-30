export class LossScene extends Phaser.Scene {
  constructor() {
    super({ key: "LossScene" });
  }

  create() {
    this.add.text(600, 300, "You lose!", { fontSize: "32px", fill: "#fff" }).setOrigin(0.5, 0.5);
  }
};