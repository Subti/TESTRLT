import { createLoginForm } from "../helper-functions/createLoginForm";

export class LoginScene extends Phaser.Scene {

  constructor() {
    super('LoginScene');
  }

  preload() {
    this.load.image("bg", "assets/images/mainBackground.png");
  }

  create() {
    this.add.image(600, 300, "bg");
    createLoginForm(this);
    const backButton = this.add
    .text(110, 30, "Back to Menu", { fontSize: "24px", fontFamily: "Pixelify Sans", fill: "white" })
    .setOrigin(0.5, 0.5)
    .setInteractive()
    .on("pointerdown", () => {
      const formDiv = document.querySelector('.overlayHTML');
      if (formDiv) {
        formDiv.remove();
      }
      this.scene.start("scene-menu");
    });

  }
};
