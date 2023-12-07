import { createLoginRegisterBtn } from "../helper-functions/createLogReg.js";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super("scene-menu");
  }

  preload() {
    this.load.image("bg", "assets/images/mainBackground.png");
    this.load.audio("mainMenu", "assets/music/mainMenu.wav");
  }

  create() {
    this.registry.set("points", 0);
    this.registry.set("speedDown", 150);
    this.registry.set("isColliding", false);
    this.registry.set("lives", 3);
    this.registry.set("pointsMultiplier", 1);
    this.registry.set("wordQuantityMultiplier", 1);
    this.registry.set("revived", false);
    this.registry.set("activePowerUps", []);
    this.registry.set("winSceneCount", 1);
    this.add.image(600, 300, "bg");
    this.sound.play("mainMenu", { loop: true, volume: 0.1 });
    this.events.on("shutdown", () => {
      this.sound.removeByKey("mainMenu");
    });
    // Check if user loginStatus was set, if not then set to false
    if (this.registry.get("loginStatus") === undefined) {
      this.registry.set("loginStatus", false);
    }

    const gameTitle = "KEYBOARD WARRIOR";
    let startX = 200; // X position needs to be mutable, the value gets redefined in the forEach method below

    // Container to hold all letters
    const fallingLetters = this.add.group();

    // Loop through each letter
    gameTitle.split("").forEach((letter, index) => {
      // Create a text object for each letter
      const letterText = this.add
        .text(startX, -50, letter, {
          fontSize: "96px",
          fontFamily: "Pixelify Sans",
          color: "#fff",
        })
        .setOrigin(0.5);

      // Add letter to the group
      fallingLetters.add(letterText);

      // Adjust startX for the next letter
      startX += 50;

      // Animate each letter falling into place
      this.tweens.add({
        targets: letterText,
        y: 300,
        ease: "Bounce.easeOut",
        duration: 1000,
        delay: index * 100, // Stagger the start of each letter's animation
      });
      // Define colour array to cycle through
      const colors = [
        "#FF0000",
        "#800000",
        "#FFC0CB",
        "#DC143C",
        "#B22222",
        "#FFA500",
        "#FFD700",
        "#FFFF00",
        "#FF4500",
        "#DAA520",
        "#008000",
        "#00FF00",
        "#228B22",
        "#32CD32",
        "#90EE90",
        "#0000FF",
        "#000080",
        "#87CEEB",
        "#1E90FF",
        "#4169E1",
        "#800080",
        "#EE82EE",
        "#8A2BE2",
        "#9400D3",
        "#9932CC",
        "#FF69B4",
        "#C71585",
        "#FF00FF",
        "#DB7093",
        "#FF1493",
      ];
      let currentColor = 0;
      this.time.addEvent({
        delay: 1000,
        callback: () => {
          letterText.setFill(colors[currentColor]);
          currentColor = (currentColor + 1) % colors.length;
        },
        loop: true,
      });
    });

    // After all letters have fallen into place, resize and reposition
    this.time.delayedCall(gameTitle.length * 100 + 1000, () => {
      this.tweens.add({
        targets: fallingLetters.getChildren(),
        scaleX: 0.5,
        scaleY: 0.5,
        x: "+=0",
        y: 125,
        duration: 1000,
        ease: "Power1",
      });
    });

    const startYposition =
      this.registry.get("loginStatus") === false ? 300 : 250;
    // Starts game when clicked
    const startButton = this.add
      .text(600, startYposition, "Start Game", {
        fontSize: "32px",
        fontFamily: "Pixelify Sans",
        fill: "#fff",
      })
      .setOrigin(0.5)
      .setInteractive()
      .setAlpha(0)
      .on("pointerdown", () => this.scene.start("IntroScene")); // Start GameScene when the start button is clicked
    // Breate animation for the start button
    const startButtonTween = this.tweens.add({
      targets: startButton,
      scaleX: 1.3,
      scaleY: 1.3,
      ease: "Sine.easeInOut",
      duration: 500,
      alpha: 0.5,
      yoyo: true,
      repeat: -1,
      paused: true, // Starts off paused
    });
    // On pointer hover start the breathe animation
    startButton.on("pointerover", () => {
      startButtonTween.resume();
    });
    // When pointer is not hovering over start button, reset the animation,
    startButton.on("pointerout", () => {
      startButtonTween.restart();
      startButtonTween.pause();
      startButton.setAlpha(1);
    });
    // Options button takes user to options menu
    const optionsButton = this.add
      .text(600, 350, "Options", {
        fontSize: "32px",
        fontFamily: "Pixelify Sans",
        fill: "#fff",
      })
      .setInteractive()
      .setOrigin(0.5)
      .setAlpha(0)
      .on("pointerdown", () => this.scene.start("scene-options"));

    const optionsButtonTween = this.tweens.add({
      targets: optionsButton,
      scaleX: 1.3,
      scaleY: 1.3,
      ease: "Sine.easeInOut",
      duration: 500,
      alpha: 0.5,
      yoyo: true,
      repeat: -1,
      paused: true,
    });

    optionsButton.on("pointerover", () => {
      optionsButtonTween.resume();
    });

    optionsButton.on("pointerout", () => {
      optionsButtonTween.restart();
      optionsButtonTween.pause();
      optionsButton.setAlpha(1);
    });

    // Leaderboard button takes user to options menu

    const leaderboardButton = this.add
      .text(600, 350, "Leaderboard", {
        fontSize: "32px",
        fontFamily: "Pixelify Sans",
        fill: "#fff",
      })
      .setInteractive()
      .setOrigin(0.5)
      .setAlpha(0)
      .on("pointerdown", () => this.scene.start("scene-leaderboard"));

    const leaderboardButtonTween = this.tweens.add({
      targets: leaderboardButton,
      scaleX: 1.3,
      scaleY: 1.3,
      ease: "Sine.easeInOut",
      duration: 500,
      alpha: 0.5,
      yoyo: true,
      repeat: -1,
      paused: true,
    });

    leaderboardButton.on("pointerover", () => {
      leaderboardButtonTween.resume();
    });

    leaderboardButton.on("pointerout", () => {
      leaderboardButtonTween.restart();
      leaderboardButtonTween.pause();
      leaderboardButton.setAlpha(1);
    });

    // Fade in menu buttons after falling letters animation
    this.time.delayedCall(gameTitle.length * 100 + 1000, () => {
      this.tweens.add({
        targets: [startButton, leaderboardButton],
        alpha: 1,
        duration: 1000,
        ease: "Power1",
      });
    });

    createLoginRegisterBtn(this);
    // For quick test/debug access to other menus
    // this.add.text(0,0,"test game over scene", {fontSize: "16px", fill: "#000000"})
    // .setInteractive()
    // .on("pointerdown", () => this.scene.start("LossScene"));
    // this.add.text(600,0,"test win scene", {fontSize:"16px",fill:"#000000"})
    // .setInteractive()
    // .on("pointerdown", () => this.scene.start("WinScene"));
  }
}
