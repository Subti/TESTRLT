export class OptionsScene extends Phaser.Scene {
  constructor() {
    super("scene-options");
  }

  create() {
    const backButton = this.add
      .text(600, 300, "Back to Menu", { fontSize: "32px", fill: "#0f0" })
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .on("pointerdown", () => this.scene.start("scene-menu"));
  }
};