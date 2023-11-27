import "./style.css";
import Phaser from "phaser";

const sizes = {
  width: 600,
  height: 600,
};

const speedDown = 150;

class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game");
    this.player;
  }

  preload() {
    this.load.image("bg", "assets/bg.jpg");
    this.load.spritesheet("player", "assets/player.png", {
      frameWidth: 62,
      frameHeight: 64,
      startFrame: 5,
    });
    this.load.spritesheet("invisibleSprite", "assets/invisibleSprite.png", {
      frameWidth: 32,
      frameHeight: 32,
      startFrame: 0,
      endFrame: 0,
    });
  }
  create() {
    this.add.image(0, 0, "bg");

    this.currentWord = "";

    this.words = this.physics.add.group();

    fetch("https://random-word-api.vercel.app/api?words=1&length=5")
      .then((response) => response.json())
      .then((data) => {
        this.targetWord = data[0];

        this.targetWordSprite = this.words
          .create(10, 10, "invisibleSprite")
          .setScale(0.5);

        this.targetWordText = this.add.text(10, 10, this.targetWord, {
          fontSize: "32px",
          fill: "#fff",
        });
      });

    this.currentWordText = this.add.text(
      sizes.width / 2 - 100,
      sizes.height - 150,
      this.currentWord,
      {
        fontSize: "32px",
        fill: "#fff",
      }
    );

    this.input.keyboard.on("keydown", (event) => {
      if (event.key === "Backspace") {
        this.currentWord = this.currentWord.slice(0, -1);
        this.currentWordText.setText(this.currentWord);
        return;
      }

      this.currentWord += event.key;

      this.currentWordText.setText(this.currentWord);

      if (this.currentWord === this.targetWord) {
        this.currentWord = "";
        this.currentWordText.setText(this.currentWord);

        this.targetWordText.destroy();
        this.targetWordSprite.destroy();
      }
    });

    this.player = this.add
      .sprite(sizes.width / 2, sizes.height - 100, "player")
      .setOrigin(0, 0);

    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }
  update() {
    if (this.targetWordSprite && this.targetWordText) {
      this.targetWordText.x = this.targetWordSprite.x;
      this.targetWordText.y = this.targetWordSprite.y;
    }
  }
}

const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: speedDown },
      debug: true,
    },
  },
  scene: [GameScene],
};

const game = new Phaser.Game(config);
