import "./style.css";
import Phaser from "phaser";

//Size of game world
const sizes = {
  width: 1200,
  height: 600,
};

//universal Y gravity (change to change acceleration)
const speedDown = 150;

const levels = {
  1: {

    numberOfWords: 5,
    lengthOfWords: 5,
    score: 0,
    lives: 3
  },
  2: {
    numberOfWords: 7,
    lengthOfWords: 7,
    lives: 3
  }
};


//define game canvas (what it does)
class MainScene extends Phaser.Scene {
  
  constructor() {
    super("scene-game");
    this.activeWords = [];
    this.calledWords = [];
    this.lives = 3;
    this.isColliding = false;
    this.speedDown = 150;
    this.score = 0;

  }

  init(data) {
    this.numberOfWords = data.numberOfWords ??  5
    this.lengthOfWords = data.lengthOfWords ?? 5
    this.score = data.score ?? this.score
    this.lives = data.lives ?? this.lives

    console.log(this.score);

  }

  //preload assets, anything that needs to be loaded before the game starts (images, sprites, etc)
  preload() {
    this.load.image("bg", "assets/bg.jpg");
    this.load.image("lives", "assets/heart.png");
    this.load.image('platform', 'assets/platform.png');
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

  //create assets, anything that needs to be added/loaded to the game world (images, sprites, etc), as well as initial game logic and physics

  create() {
    //batch call the api to get a bunch of words at once
    fetch(`https://random-word-api.vercel.app/api?words=${this.numberOfWords}&length=${this.lengthOfWords}`)
      .then((response) => response.json())
      .then((data) => {
        this.calledWords = data;

        //Load a word at random intervals of 1-3 seconds
        this.time.addEvent({
          delay: Phaser.Math.Between(1000, 3000),
          callback: this.loadWord,
          callbackScope: this,
          loop: false,
          repeat: this.calledWords.length - 1,
        });
      });

    //this initializes what the player is currently typing
    this.currentWord = "";

    //add background image
    this.add.image(0, 0, "bg").setOrigin(0, 0);


    //add heart image for amount of lives
    for (let i = 0; i < this.lives; i++) {

      // `livesImg${i}` to uniquely identify each heart img 
      this[`livesImg${i}`] = this.add.image(50 + i * 10, 50, "lives");

    }


    //this is required for the physics engine to work (words can not be added to physics engine without this)
    //it is essentially a group of sprites that can be added to the physics engine and the words follow those sprites
    this.words = this.physics.add.group();

    //same as last text thing but this time for what the player types
    this.currentWordText = this.add.text(
      sizes.width / 2 - 100,
      sizes.height - 150,
      this.currentWord,
      {
        fontSize: "32px",
        fill: "#fff",
      }
    );

    //this is the event listener for when the player types something and handles what will happen when they type something
    this.input.keyboard.on("keydown", (event) => {
      event.preventDefault();
      if (event.code === 'Backspace' && this.currentWord.length > 0) {
        this.currentWord = this.currentWord.slice(0, this.currentWord.length - 1);
        this.currentWordText.setText(this.currentWord);
      }
      else if (event.code.length === 4) {

        this.currentWord += event.key;


        this.currentWordText.setText(this.currentWord);

        if (this.currentWord === this.targetWord) {
          this.currentWord = "";
          this.currentWordText.setText(this.currentWord);

          this.targetWordText.destroy();
          this.targetWordSprite.destroy();
        }
      }
    });


    this.player = this.add
      .sprite(sizes.width / 2, sizes.height - 100, "player")
      .setOrigin(0, 0);

    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.platform = this.physics.add.staticGroup();
    this.platform.create(600, 600, 'platform').setScale(3).refreshBody();
    this.words.addCollidesWith(this.platform);

    this.physics.add.overlap(this.words, this.platform, function() {
      this.isColliding = true;
    },null, this);

    this.textScore = this.add.text(sizes.width - 200, 10, `Score: ${this.score}`, {
      fontSize: "32px",
      fill: "#fff",
    });


  }
  loadWord() {
    const word = this.calledWords.pop();

    const sprite = this.words
      .create(Phaser.Math.Between(0, 1025), 10, "invisibleSprite")
      .setScale(0.5)
      .setVelocityY(speedDown - 90);
    sprite.body.setAllowGravity(false);

    const text = this.add.text(10, 10, word, {
      fontSize: "32px",
      fill: "#fff",
    });

    this.activeWords.push({ sprite, text, word });
  }


  //update assets, anything that needs to be updated every frame (images, sprites, etc), as well as game logic and physics
  update() {



    for (let i = 0; i < this.activeWords.length; i++) {
      this.activeWords[i].text.x = this.activeWords[i].sprite.x;
      this.activeWords[i].text.y = this.activeWords[i].sprite.y;
    }

    // Check if the current word matches any active word
    for (let i = 0; i < this.activeWords.length; i++) {
      if (this.currentWord === this.activeWords[i].word) {
        // Remove the word from the screen and the array
        this.activeWords[i].sprite.destroy();
        this.activeWords[i].text.destroy();
        this.activeWords.splice(i, 1);
        console.log("YEEE" + this.activeWords.length);


        this.score += 10 * this.currentWord.length;

        this.textScore.setText(`Score: ${this.score}`);

        // Clear the current word
        this.currentWord = "";
        this.currentWordText.setText(this.currentWord);

        break;
      }
      if (this.isColliding) {
        this.activeWords[i].sprite.destroy();
        this.activeWords[i].text.destroy();
        this.activeWords.splice(i, 1);
        this.isColliding = false;

        this[`livesImg${this.lives - 1}`].destroy();
        this.lives -= 1;

      }
      if (this.lives <= 0) {
        // Transition to loss scene
        this.scene.start("LossScene");
      }
      if (
        this.calledWords.length === 0 &&
        this.activeWords.length === 0 &&
        this.lives > 0
      ) {
        // Transition to win scene
        console.log(this.score);
        this.scene.start('scene-game',{...levels[2], score: this.score, lives: this.lives});
      } 
    }
  }
}

class WinScene extends Phaser.Scene {
  constructor() {
    super({ key: "WinScene" });
  }

  create() {
    this.add.text(100, 100, "You win!", { fontSize: "32px", fill: "#fff" });
  }
}

class LossScene extends Phaser.Scene {
  constructor() {
    super({ key: "LossScene" });
  }

  create() {
    this.add.text(100, 100, "You lose!", { fontSize: "32px", fill: "#fff" });
  }
}

//define game config (how it looks and works this is what players would change in settings)
//for example if a player wants the game to be "easier" it could just be an option to use a lower gravity
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
