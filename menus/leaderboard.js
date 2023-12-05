import { displayLeaderBoard } from "../helper-functions/getLeaderboard";

export class LeaderboardScene extends Phaser.Scene {

  constructor() {
    super('scene-leaderboard');
  }

  preload() {
    this.load.image("bg", "assets/images/mainBackground.png");
  }

  create() {
    this.add.image(600, 300, "bg");
    // Pass scene into function using 'this'
    displayLeaderBoard(this);
  }
};

