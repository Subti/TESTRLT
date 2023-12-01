import { powerUps } from "../powers/basePowers.js";

//define game canvas (what it does)
export class BaseLevel extends Phaser.Scene {
  constructor(key, wordLength, wordQuantity, fallSpeed, nextSceneKey) {
    super(key);
    this.levelNumber = this.sys.settings.key.replace("Level", "");
    this.wordLength = wordLength;
    this.wordQuantity = wordQuantity;
    this.fallSpeed = fallSpeed;
    this.nextSceneKey = nextSceneKey;
    this.player;
    this.emitter;
    this.dingMusic;
    this.levelComplete;
    this.loseLife;
    this.activeWords = [];
    this.calledWords = [];
    this.activePowerUps = [];
    this.comboCounter = 0;
    this.wordDelay = { min: 500, max: 1000 };
    this.width = 1200;
    this.height = 600;
  }

  //preload assets, anything that needs to be loaded before the game starts (images, sprites, etc)
  preload() {
    this.load.image("bg", "assets/bg.jpg");
    this.load.image("platform", "assets/platform.png");
    this.load.image("hearts", "assets/heart.png");
    this.load.image("star", "assets/starParticle.png");
    this.load.audio("ding", "assets/typewriterDing.wav");
    this.load.audio("levelComplete", "assets/levelComplete.wav");
    this.load.audio("loseLife", "assets/loseLife.wav");
    this.load.image("invisibleSprite", "assets/invisibleSprite.png", {
      frameWidth: 32,
      frameHeight: 16,
    });
    this.load.spritesheet("player", "assets/player.png", {
      frameWidth: 62,
      frameHeight: 64,
    });

    this.registry.set("loaded", false);

    //batch call the api to get a bunch of words at once
    fetch(
      `https://random-word-api.vercel.app/api?words=${this.wordQuantity}&length=${this.wordLength}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.calledWords = data;

        this.registry.set("loaded", true);

        //Load a word at random intervals of 1-3 seconds
        this.time.addEvent({
          delay: Phaser.Math.Between(this.wordDelay.min, this.wordDelay.max),
          callback: this.loadWord,
          callbackScope: this,
          loop: false,
          repeat: this.calledWords.length - 1,
        });
      });
  }

  //create assets, anything that needs to be added/loaded to the game world (images, sprites, etc), as well as initial game logic and physics
  create() {
    console.log(powerUps);
    this.activePowerUps.push(powerUps[0]);

    this.dingMusic = this.sound.add("ding");
    this.levelComplete = this.sound.add("levelComplete");
    this.loseLife = this.sound.add("loseLife");
    //this initializes what the player is currently typing
    this.currentWord = "";

    this.timedEvent = this.time.addEvent({
      delay: 6000000,
      callback: this.onClockEvent,
      callbackScope: this,
      repeat: 1,
    });

    //add background image
    this.add.image(0, 0, "bg").setOrigin(0, 0);

    // Add score and place in the top right of game canvas
    this.textScore = this.add.text(
      this.width / 2,
      10,
      `Level: ${this.levelNumber} | Score: ${this.registry.get("points")}`,
      {
        fontSize: "32px",
        fill: "#fff",
      }
    );
    // Add container for lives and place in the top left corner of page
    this.livesContainer = this.add.container(50, 25);
    // Grabs lives from registry and renders hearts based on remaining lives
    const livesRemaining = this.registry.get("lives");
    for (let i = 0; i < livesRemaining; i++) {
      const hearts = this.add.image(i * 30, 0, "hearts");
      this.livesContainer.add(hearts);
    }
    //this is required for the physics engine to work (words can not be added to physics engine without this)
    //it is essentially a group of sprites that can be added to the physics engine and the words follow those sprites
    this.words = this.physics.add.group();

    //same as last text thing but this time for what the player types
    this.currentWordText = this.add.text(
      this.width / 2 - 100,
      this.height - 150,
      this.currentWord,
      {
        fontSize: "32px",
        fill: "#fff",
      }
    );

    //this is the event listener for when the player types something and handles what will happen when they type something
    this.input.keyboard.on("keydown", (event) => {
      if (event.key === "Backspace") {
        this.currentWord = this.currentWord.slice(0, -1);
      } else if (event.key.length === 1 && /^[a-z0-9]$/i.test(event.key)) {
        this.currentWord += event.key;
      }

      this.currentWordText.setText(this.currentWord);

      if (this.currentWord === this.targetWord) {
        this.currentWord = "";
        this.currentWordText.setText(this.currentWord);

        this.targetWordText.destroy();
        this.targetWordSprite.destroy();
      }
    });

    this.platform = this.physics.add.staticGroup();
    this.platform.create(600, 600, "platform").setScale(3).refreshBody();
    this.physics.add.overlap(this.words, this.platform, (word) => {
      // Reduce the number of lives
      this.registry.set("lives", this.registry.get("lives") - 1);

      this.loseLife.play();

      // Destroy the word sprite
      word.destroy();

      // Remove the last heart from the container
      const lastHeart = this.livesContainer.list.pop();
      lastHeart.destroy();

      // Find and destroy the corresponding word text
      const wordIndex = this.activeWords.findIndex(
        (activeWord) => activeWord.sprite === word
      );
      if (wordIndex !== -1) {
        this.activeWords[wordIndex].text.destroy();
        this.activeWords.splice(wordIndex, 1);
      }
    });

    this.player = this.add
      .sprite(this.width / 2, this.height - 100, "player")
      .setOrigin(0, 0);
    // Player walking left animation set here, repeat -1 is infinite loops
    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNames("player", { frames: [4, 5, 6, 7] }),
      frameRate: 4,
      repeat: -1,
    });
    // Player walking right animation set here
    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [8, 9, 10, 11],
      }),
      frameRate: 12,
      repeat: -1,
    });
    // Load player sprite run walk left animation
    this.player.play("walk-left");
    // Load player walk right after 8 seconds
    this.time.delayedCall(8000, () => {
      this.player.play("walk-right");
    });

    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }
  // Function to load words from API call
  loadWord() {
    const word = this.calledWords.pop();

    const sprite = this.words
      // Make the max number dynamic if the player decides to expand the game canvas
      .create(Phaser.Math.Between(0, this.width - 250), 10, "invisibleSprite")
      // set display size instead of set scale, scale made the text collision boxes much larger than the words themselves
      .setDisplaySize(this.width, 24)
      .setVelocityY(
        Phaser.Math.FloatBetween(this.fallSpeed, 1.5 * this.fallSpeed)
      );
    sprite.body.setAllowGravity(false);

    const text = this.add.text(10, 10, word, {
      fontSize: "32px",
      fill: "#fff",
    });

    this.activeWords.push({ sprite, text, word });
  }

  handleCorrectWord(i) {
    this.registry.set(
      "points",
      this.registry.get("points") + 10 * this.activeWords[i].word.length
    );
    this.textScore.setText(
      `Level: ${this.levelNumber} | Score: ${this.registry.get("points")}`
    );

    // Increase the correct words counter
    this.comboCounter++;

    // Check if the WordPop power-up should be activated
    if (this.comboCounter === 3) {
      // Find the WordPop power-up
      const wordPop = this.activePowerUps.find(
        (powerUp) => powerUp.name === "WordPop"
      );

      // If the WordPop power-up is active, call its effect function
      if (wordPop) {
        wordPop.effect(this);
      }

      // Reset the correct words counter
      this.comboCounter = 0;
    }

    const emitStars = this.add.particles(0, 0, "star", {
      x: this.activeWords[i].sprite.x,
      y: this.activeWords[i].sprite.y,
      speed: 100,
      gravityY: 200,
      scale: 0.04,
      duration: 600,
      emitting: false,
    });

    emitStars.start();

    this.dingMusic.play();
    // Remove the word from the screen and the array
    this.activeWords[i].sprite.destroy();
    this.activeWords[i].text.destroy();
    this.activeWords.splice(i, 1);

    // Clear the current word
    this.currentWord = "";
    this.currentWordText.setText(this.currentWord);
  }

  //update assets, anything that needs to be updated every frame (images, sprites, etc), as well as game logic and physics
  update() {
    if (!this.registry.get("loaded")) {
      return;
    }

    for (let i = 0; i < this.activeWords.length; i++) {
      this.activeWords[i].text.x = this.activeWords[i].sprite.x;
      this.activeWords[i].text.y = this.activeWords[i].sprite.y - 15;
    }

    // Check if the current word matches any active word
    for (let i = 0; i < this.activeWords.length; i++) {
      if (this.currentWord === this.activeWords[i].word) {
        this.handleCorrectWord(i);
      }
    }
    // Check for loss condition
    if (this.registry.get("lives") <= 0) {
      // Transition to loss scene
      this.scene.start("LossScene");
    }

    // Check for win condition
    if (
      this.calledWords.length === 0 &&
      this.activeWords.length === 0 &&
      this.registry.get("lives") > 0
    ) {
      // Uses timer to add a multiplier
      this.registry.set(
        "points",
        Math.floor(
          this.registry.get("points") *
            Math.floor((60 - this.timedEvent.getElapsedSeconds()) / 10)
        )
      );

      this.levelComplete.play();

      // Transition to win scene
      this.scene.start("WinScene", { nextSceneKey: this.nextSceneKey });
    }
  }
}
