export class LossScene extends Phaser.Scene {
  constructor() {
    super({ key: "LossScene" });
  }

  create() {
    this.add.text(100, 100, "You lose!", { fontSize: "32px", fill: "#fff" });
    this.add.text(100, 150, "Score: " + this.registry.get("points"), {
      fontSize: "32px",
      fill: "#fff",
    });
    this.add
      .text(100, 300, "Back to Menu", { fontSize: "32px", fill: "#0f0" })
      .setInteractive()
      .on("pointerdown", () => this.scene.start("scene-menu"));
  }
}
