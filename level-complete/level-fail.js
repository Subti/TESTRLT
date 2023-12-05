export class LossScene extends Phaser.Scene {
  constructor() {
    super({ key: "LossScene" });
  }

  preload() {
    this.load.image("gameoverBG", "assets/images/Summer3.png");
  }

  create() {
    // Load background
    this.add.image(600, 0, "gameoverBG");
    // Add "Game Over" text
    this.add
      .text(600, 200, "Game Over", {
        fontSize: "64px",
        fontFamily: "Pixelify Sans",
        fill: "#fff",
      })
      .setOrigin(0.5);

    const pointsText = this.add
      .text(600, 250, `Points: ${this.registry.get("points")}`, {
        fontSize: "32px",
        fontFamily: "Pixelify Sans",
        fill: "#fff",
      })
      .setOrigin(0.5, 0.5);

    // Add "Restart" button
    const restartButton = this.add
      .text(600, 300, "Restart", {
        fontSize: "32px",
        fontFamily: "Pixelify Sans",
        fill: "#fff",
      })
      .setInteractive()
      .setOrigin(0.5)
      .on("pointerdown", () => {
        // Get a list of all active scenes
        const activeScenes = this.scene.manager.getScenes(true);

        // Stop all active scenes
        for (let scene of activeScenes) {
          if (scene.scene.key !== "LevelFail") {
            // Exclude the current scene because then it just bugs out
            scene.scene.stop();
          }
        }
        // Re-initialize lives and points then send player back to level 1
        this.registry.set("points", 0);
        this.registry.set("speedDown", 150);
        this.registry.set("isColliding", false);
        this.registry.set("lives", 3);
        this.registry.set("pointsMultiplier", 1);
        this.registry.set("wordQuantityMultiplier", 1);
        this.registry.set("revived", false);
        this.registry.set("activePowerUps", []);
        this.registry.set("winSceneCount", 0);
        this.scene.start("Level1");
      });

    // Add "Main Menu" button
    const menuButton = this.add
      .text(600, 400, "Main Menu", {
        fontSize: "32px",
        fontFamily: "Pixelify Sans",
        fill: "#fff",
      })
      .setInteractive()
      .setOrigin(0.5)
      .on("pointerdown", () => {
        // Go to the main menu
        this.scene.start("scene-menu");
      });

    const restartButtonTween = this.tweens.add({
      targets: restartButton,
      scaleX: 1.3,
      scaleY: 1.3,
      ease: "Sine.easeInOut",
      duration: 500,
      alpha: 0.5,
      yoyo: true,
      repeat: -1,
      paused: true,
    });

    const menuButtonTween = this.tweens.add({
      targets: menuButton,
      scaleX: 1.3,
      scaleY: 1.3,
      ease: "Sine.easeInOut",
      duration: 500,
      alpha: 0.5,
      yoyo: true,
      repeat: -1,
      paused: true,
    });

    menuButton.on("pointerover", () => {
      menuButtonTween.resume();
    });

    menuButton.on("pointerout", () => {
      menuButtonTween.restart();
      menuButtonTween.pause();
      menuButton.setScale(1, 1);
      menuButton.setAlpha(1);
    });

    restartButton.on("pointerover", () => {
      restartButtonTween.resume();
    });

    restartButton.on("pointerout", () => {
      restartButtonTween.restart();
      restartButtonTween.pause();
      restartButton.setScale(1, 1);
      restartButton.setAlpha(1);
    });
  }
}
