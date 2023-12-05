export class WinScene extends Phaser.Scene {
  constructor() {
    super("WinScene");
  }

  init(data) {
    this.nextSceneKey = data.nextSceneKey;
    this.winNumber = data.levelNumber;
  }

  preload() {
    const levelSets = {
      1: {
        bg: "assets/images/mainBackground.png",
      },
      2: {
        bg: "assets/images/mainBackground.png",
      },
      3: {
        bg: "assets/images/mainBackground.png",
      },
      4: {
        bg: "assets/images/plains.png",
      },
      5: {
        bg: "assets/images/plains.png",
      },
      6: {
        bg: "assets/images/plains.png",
      },
      7: {
        bg: "assets/images/celestial.png",
      },
      8: {
        bg: "assets/images/celestial.png",
      },
      9: {
        bg: "assets/images/celestial.png",
      },
      10: {
        bg: "assets/images/underwater.png",
      },
      11: {
        bg: "assets/images/underwater.png",
      },
      12: {
        bg: "assets/images/underwater.png",
      },
      13: {
        bg: "assets/images/hell.png",
      },
      14: {
        bg: "assets/images/hell.png",
      },
      15: {
        bg: "assets/images/hell.png",
      },
    };
    const bgImage = levelSets[this.winNumber].bg;
    this.load.image(`bg${this.winNumber}`, bgImage);
    this.load.spritesheet("fireworks", "assets/vfx/HolyExplosion_96x96.png", {
      frameWidth: 96,
    });
  }

  create() {
    //add background image
    this.bgImage = this.add.image(0, 0, `bg${this.winNumber}`).setOrigin(0, 0);
    this.bgImage.displayWidth = this.sys.game.config.width;
    this.bgImage.displayHeight = this.sys.game.config.height;

    // Create a sprite for the fireworks
    const fireworks = this.add.sprite(
      Phaser.Math.Between(0, 1200), // Random x position
      Phaser.Math.Between(0, 600), // Random y position
      "fireworks"
    );

    // Create an animation for the fireworks sprite
    this.anims.create({
      key: "fireworkAnimation",
      frames: this.anims.generateFrameNumbers("fireworks", {
        start: 0,
        end: 27,
      }),
      frameRate: 28,
      repeat: -1,
    });

    // Play the fireworks animation on the sprite
    fireworks.play("fireworkAnimation");

    // Add continue button if player passes level
    if (this.nextSceneKey) {
      const continueButton = this.add
        .text(600, 300, "Continue", {
          fontSize: "32px",
          fontFamily: "Pixelify Sans",
          fill: "#fff",
        })
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on("pointerdown", () => this.scene.start(this.nextSceneKey)); // Start the next level when the continue button is clicked
      const continueButtonTween = this.tweens.add({
        targets: continueButton,
        scaleX: 1.3,
        scaleY: 1.3,
        ease: "Sine.easeInOut",
        duration: 500,
        alpha: 0.5,
        yoyo: true,
        repeat: -1,
        paused: true,
      });

      const pointsText = this.add
        .text(600, 400, `Points: ${this.registry.get("points")}`, {
          fontSize: "32px",
          fontFamily: "Pixelify Sans",
          fill: "#000000",
        })
        .setOrigin(0.5, 0.5);

      continueButton.on("pointerover", () => {
        continueButtonTween.resume();
      });

      continueButton.on("pointerout", () => {
        continueButtonTween.restart();
        continueButtonTween.pause();
        continueButton.setScale(1, 1);
        continueButton.setAlpha(1);
      });
    } else {
      // Else player won by passing all the levels
      const winText = this.add
        .text(600, 200, "Congratulations! You won the game!", {
          fontSize: "32px",
          fill: "#000000",
        })
        .setOrigin(0.5, 0.5);

      const winPoints = this.add
        .text(600, 250, `Points: ${this.registry.get("points")}`, {
          fontSize: "32px",
          fontFamily: "Pixelify Sans",
          fill: "#000000",
        })
        .setOrigin(0.5, 0.5);

      const menuButton = this.add
        .text(600, 300, "Back to Menu", {
          fontSize: "32px",
          fontFamily: "Pixelify Sans",
          fill: "#fff",
        })
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on("pointerdown", () => this.scene.start("scene-menu")); // Go back to MenuScene when the back button is clicked
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
    }
  }
}
