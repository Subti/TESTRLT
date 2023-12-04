import { createRegisterForm } from "../helper-functions/createRegisterForm";

export class LeaderboardScene extends Phaser.Scene {

  constructor() {
    super('LeaderboardScene');
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

