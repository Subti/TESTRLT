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
  }
};
