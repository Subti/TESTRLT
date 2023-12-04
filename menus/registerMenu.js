import { createRegisterForm } from "../helper-functions/createRegisterForm";

export class RegisterScene extends Phaser.Scene {

  constructor() {
    super('RegisterScene');
  }

  preload() {
    this.load.image("bg", "assets/images/mainBackground.png");
  }

  create() {
    this.add.image(600, 300, "bg");
    // Pass scene into function using 'this'
    createRegisterForm(this);
  }
};
