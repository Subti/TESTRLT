export class LossScene extends Phaser.Scene {
  constructor() {
    super({ key: "LossScene" });
  }

  create() {
    this.add.text(100, 100, "You lose!", { fontSize: "32px", fill: "#fff" });
  }
};