import { powerUps } from "../powers/basePowers.js";
import { submitScore } from "../helper-functions/submitScore.js";
import {
  RegExpMatcher,
  TextCensor,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

//define game canvas (what it does)
export class BaseLevel extends Phaser.Scene {
  constructor(key, wordConfig, fallSpeed, nextSceneKey) {
    super(key);
    this.levelNumber = this.sys.settings.key.replace("Level", "");
    // this.wordLength = wordLength;
    // this.wordQuantity = wordQuantity;
    this.wordConfig = wordConfig;
    this.fallSpeed = fallSpeed;
    this.nextSceneKey = nextSceneKey;
    this.player;
    this.emitter;
    this.dingMusic;
    this.levelComplete;
    this.loseLife;
    this.activeWords = [];
    this.firstPass = [];
    this.calledWords = [];
    this.activePowerUps = [];
    this.comboCounter = 0;
    this.wordDelay = {
      min: 1000 / (1 + this.levelNumber / 30),
      max: 1500 / (1 + this.levelNumber / 30),
    };
    this.width = 1200;
    this.height = 600;
  }

  //preload assets, anything that needs to be loaded before the game starts (images, sprites, etc)
  preload() {
    const levelSets = {
      1: {
        bg: "assets/images/mainBackground.png",
        track: "assets/music/beginnerLevels.mp3",
      },
      2: {
        bg: "assets/images/mainBackground.png",
        track: "assets/music/beginnerLevels.mp3",
      },
      3: {
        bg: "assets/images/mainBackground.png",
        track: "assets/music/beginnerLevels.mp3",
      },
      4: {
        bg: "assets/images/plains.png",
        track: "assets/music/plains.wav",
      },
      5: {
        bg: "assets/images/plains.png",
        track: "assets/music/plains.wav",
      },
      6: {
        bg: "assets/images/plains.png",
        track: "assets/music/plains.wav",
      },
      7: {
        bg: "assets/images/celestial.png",
        track: "assets/music/mid.wav",
      },
      8: {
        bg: "assets/images/celestial.png",
        track: "assets/music/mid.wav",
      },
      9: {
        bg: "assets/images/celestial.png",
        track: "assets/music/mid.wav",
      },
      10: {
        bg: "assets/images/underwater.png",
        track: "assets/music/underwater.wav",
      },
      11: {
        bg: "assets/images/underwater.png",
        track: "assets/music/underwater.wav",
      },
      12: {
        bg: "assets/images/underwater.png",
        track: "assets/music/underwater.wav",
      },
      13: {
        bg: "assets/images/hell.png",
        track: "assets/music/endgame.wav",
      },
      14: {
        bg: "assets/images/hell.png",
        track: "assets/music/endgame.wav",
      },
      15: {
        bg: "assets/images/hell.png",
        track: "assets/music/endgame.wav",
      },
    };
    const bgImage = levelSets[this.levelNumber].bg;
    const track = levelSets[this.levelNumber].track;
    this.load.image(`bg${this.levelNumber}`, bgImage);
    this.load.audio(`track${this.levelNumber}`, track);
    this.load.image("platform", "assets/images/platform.png");
    this.load.image("star", "assets/vfx/starParticle.png");
    this.load.audio("ding", "assets/soundEffects/typewriterDing.wav");
    this.load.audio("levelComplete", "assets/soundEffects/levelComplete.wav");
    this.load.audio("loseLife", "assets/soundEffects/loseLife.wav");
    this.load.audio("type", "assets/soundEffects/typeSound.wav");
    this.load.image("invisibleSprite", "assets/images/invisibleSprite.png", {
      frameWidth: 32,
      frameHeight: 16,
    });
    this.load.spritesheet("player", "assets/images/player.png", {
      frameWidth: 50,
      frameHeight: 37,
    });

    this.registry.set("loaded", false);

    // Get the active power-ups from the registry
    this.activePowerUps = this.registry.get("activePowerUps");

    this.originalPointsMultiplier = this.registry.get("pointsMultiplier");
    this.originalWordQuantityMultiplier = this.registry.get(
      "wordQuantityMultiplier"
    );

    const coinFlip = this.activePowerUps.find(
      (powerUp) => powerUp.name === "CoinFlip"
    );

    if (coinFlip) {
      coinFlip.effect(this);
    }

    let fetchQuantity = Math.round(
      this.wordQuantity * this.registry.get("wordQuantityMultiplier")
    );

    //batch call the api to get a bunch of words at once
    // fetch(
    //   `https://random-word-api.vercel.app/api?words=${fetchQuantity}&length=${this.wordLength}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.calledWords = data;

    //     this.registry.set("loaded", true);

    //     //Load a word at random intervals of 1-3 seconds
    //     this.time.addEvent({
    //       delay: Phaser.Math.Between(this.wordDelay.min, this.wordDelay.max),
    //       callback: this.loadWord,
    //       callbackScope: this,
    //       loop: false,
    //       repeat: this.calledWords.length - 1,
    //     });
    //   });

    this.fetchWords();
  }

  //create assets, anything that needs to be added/loaded to the game world (images, sprites, etc), as well as initial game logic and physics
  create() {
    this.sound.play(`track${this.levelNumber}`, { loop: true, volume: 0.1 });
    this.events.on("shutdown", () => {
      this.sound.removeByKey(`track${this.levelNumber}`);
    });

    this.typeSound = this.sound.add("type");
    this.dingMusic = this.sound.add("ding");
    this.levelComplete = this.sound.add("levelComplete");
    this.loseLife = this.sound.add("loseLife");
    //this initializes what the player is currently typing
    this.currentWord = "";

    //add background image
    this.bgImage = this.add
      .image(0, 0, `bg${this.levelNumber}`)
      .setOrigin(0, 0);
    this.bgImage.displayWidth = this.sys.game.config.width;
    this.bgImage.displayHeight = this.sys.game.config.height;
    // Graphic added for better visibility on playerStats
    this.add.graphics().fillStyle(0xffffff, 0.75).fillRect(360, 10, 470, 32);

    // Add level + score + lives info in the top center of game canvas
    this.playerStats = this.add
      .text(
        this.width / 2,
        10,
        `Level: ${this.levelNumber} | Score: ${this.registry.get(
          "points"
        )} | Lives: ${this.registry.get("lives")}`,
        {
          fontSize: "32px",
          fontFamily: "Pixelify Sans",
          fill: "#000000",
        }
      )
      .setOrigin(0.5, 0.1);
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
        fontFamily: "Pixelify Sans",
        fill: "#000000",
      }
    );

    //this is the event listener for when the player types something and handles what will happen when they type something
    this.input.keyboard.on("keydown", (event) => {
      this.typeSound.play();
      if (event.key === "Backspace") {
        this.currentWord = this.currentWord.slice(0, -1);
      } else if (event.code === "Space") {
        this.currentWord = "";
      } else if (event.key.length === 1 && /^[a-zA-Z0-9-]$/i.test(event.key)) {
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
    this.platform
      .create(600, 600, "platform")
      .setScale(3)
      .refreshBody()
      .setAlpha(0); // Set alpha to 0 to hide image, remove or set to 1 if platform image is needed
    this.physics.add.overlap(this.words, this.platform, (word) => {
      // Reduce the number of lives
      this.registry.set("lives", this.registry.get("lives") - 1);
      //Reset combo counter
      this.comboCounter = 0;

      // Update text in game data
      this.playerStats.setText(
        `Level: ${this.levelNumber} | Score: ${this.registry.get(
          "points"
        )} | Lives: ${this.registry.get("lives")}`
      );

      this.loseLife.play({ volume: 0.05 });

      // Destroy the word sprite
      word.destroy();

      // Run player hurt animation
      this.player.anims.play("hurt");

      // After 1.5 seconds, switch back to the idle animation
      setTimeout(() => {
        this.player.anims.play("idle");
      }, 1500);

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
      .setScale(2)
      .setOrigin(0, 0);
    // Player idle animation set here, repeat -1 is infinite loops
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNames("player", { frames: [0, 1, 2, 3] }),
      frameRate: 8,
      repeat: -1,
    });
    // Load player idling animation
    this.player.play("idle");
    // Player getting hit animation set here
    this.anims.create({
      key: "hurt",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [3, 65, 66, 67],
      }),
      frameRate: 8,
    });

    this.cursorKeys = this.input.keyboard.createCursorKeys();

    let demoCheatButton = this.add.text(
      this.width - 100,
      this.height - 20,
      "Demo Cheat",
      {
        fontSize: "16px",
        fontFamily: "Pixelify Sans",
        fill: "#000000",
      }
    );

    demoCheatButton.setInteractive();
    demoCheatButton.on("pointerdown", () => {
      if (
        this.levelNumber % 3 === 0 &&
        this.levelNumber < 15 &&
        this.activePowerUps.length !== powerUps.length &&
        !this.scoreAnimation
      ) {
        this.scene.start("PowerUp", { nextSceneKey: this.nextSceneKey });
      } else {
        // Transition to win scene
        if (this.registry.get("loginID") && !this.nextSceneKey) {
          submitScore(
            this.registry.get("points"),
            this.registry.get("loginID")
          );
        }
        if (!this.scoreAnimation) {
          this.scene.start("WinScene", {
            nextSceneKey: this.nextSceneKey,
            levelNumber: this.levelNumber,
          });
        }
      }
    });
  }
  wordFilter(words, wordQuantity, wordLength) {
    let filteredWords = words.filter((word) => {
      //use imported package to check for profanity, if a word does contain profanity, it gets filtered out
      if (!matcher.hasMatch(word)) {
        return word;
      }
    });

    //call the api again to replace the word
    if (filteredWords.length !== wordQuantity) {
      //define new word quantity based on how many words are remaining after the filter
      const newQuantity = wordQuantity - filteredWords.length;
      fetch(
        `https://random-word-api.herokuapp.com/word?number=${newQuantity}&length=${wordLength}`
      )
        .then((response) => response.json())
        .then((words) => {
          //recursive call to ensure new word(s) does not contain profanity
          const replacement = this.wordFilter(words, words.length, wordLength);

          filteredWords = filteredWords.concat(replacement);
          return filteredWords;
        });
    }
    return Promise.resolve(filteredWords);
  }

  fetchWords() {
    // For each word length and quantity, make a fetch request
    const fetchPromises = this.wordConfig.map(({ length, quantity }) => {
      const fetchQuantity =
        quantity * this.registry.get("wordQuantityMultiplier");
      const url = `https://random-word-api.herokuapp.com/word?number=${fetchQuantity}&length=${length}`;

      return fetch(url)
        .then((firstResponse) => firstResponse.json())
        .then((words) => {
          // Add the received words to this.calledWords
          this.firstPass = [...words];
          this.wordFilter(
            this.firstPass,
            this.wordConfig[0].quantity,
            this.wordConfig[0].length
          ).then((response) => {
            this.calledWords.push(...response);
          });
        });
    });

    // Wait for all fetch requests to complete
    Promise.all(fetchPromises).then(() => {
      // Shuffle this.calledWords
      for (let i = this.calledWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.calledWords[i], this.calledWords[j]] = [
          this.calledWords[j],
          this.calledWords[i],
        ];
      }

      this.registry.set("loaded", true);
      this.time.addEvent({
        delay: Phaser.Math.Between(this.wordDelay.min, this.wordDelay.max),
        callback: this.loadWord,
        callbackScope: this,
        repeat: this.calledWords.length - 1,
      });
      this.firstPass = [];
    });

    // });
  }

  // Function to load words from API call
  loadWord() {
    const word = this.calledWords.pop();

    let velocityY = Phaser.Math.FloatBetween(
      this.fallSpeed,
      1.2 * this.fallSpeed
    );

    const chunky = this.activePowerUps.find(
      (powerUp) => powerUp.name === "Chunky"
    );

    const phoon = this.activePowerUps.find(
      (powerUp) => powerUp.name === "Phoon"
    );

    if (chunky) {
      velocityY /= 2;
    }

    if (phoon) {
      velocityY *= 2;
    }

    const sprite = this.words
      .create(Phaser.Math.Between(0, this.width - 250), 10, "invisibleSprite")
      .setDisplaySize(this.width, 24)
      .setVelocityY(velocityY);
    sprite.body.setAllowGravity(false);

    const text = this.add.text(10, 10, word, {
      fontSize: chunky ? "64px" : phoon ? "16px" : "32px",
      stroke: "#000000",
      strokeThickness: 2,
      fill: "#ffffff",
    });

    const wordTimer = this.time.now;

    this.activeWords.push({
      sprite,
      text,
      word,
      velocity: velocityY,
      wordTimer,
    });
  }

  pauseWords() {
    // Pause the words
    this.activeWords.forEach((word) => word.sprite.body.setVelocity(0, 0));
  }

  resumeWords() {
    // Resume the words
    this.activeWords.forEach((word) =>
      word.sprite.body.setVelocity(0, word.velocity)
    );
  }

  handleCorrectWord(i) {
    // Increase the correct words counter
    this.comboCounter++;

    let pointsToAdd;

    const recuperate = this.activePowerUps.find(
      (powerUp) => powerUp.name === "Recuperate"
    );

    const beefy = this.activePowerUps.find(
      (powerUp) => powerUp.name === "Beefy"
    );

    if (recuperate && this.comboCounter % 10 === 0) {
      if (beefy) {
        if (this.registry.get("lives") < 5) {
          recuperate.effect(this);
        }
      } else {
        if (this.registry.get("lives") < 3) {
          recuperate.effect(this);
        }
      }
    }

    let elapsedTime = this.time.now - this.activeWords[i].wordTimer;
    let additionalPoints = Math.floor(30000 / elapsedTime);

    pointsToAdd =
      (10 * this.activeWords[i].word.length + additionalPoints) *
      this.registry.get("pointsMultiplier");

    this.updateScore(pointsToAdd);

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

    // Check if the WordPop power-up should be activated
    if (this.comboCounter % 3 === 0) {
      // Find the WordPop power-up
      const wordPop = this.activePowerUps.find(
        (powerUp) => powerUp.name === "WordPop"
      );

      // If the WordPop power-up is active, call its effect function
      if (wordPop) {
        wordPop.effect(this);
      }
    }

    // Check if the WordFreeze power-up should be activated
    if (this.comboCounter % 5 === 0) {
      // Find the WordFreeze power-up
      const wordFreeze = this.activePowerUps.find(
        (powerUp) => powerUp.name === "WordFreeze"
      );

      // If the WordFreeze power-up is active, call its effect function
      if (wordFreeze) {
        wordFreeze.effect(this);
      }
    }
  }

  updateScore(amount) {
    // If there are no active words, instantly update the score
    if (this.activeWords.length <= 1) {
      this.registry.set("points", this.registry.get("points") + amount);
      return;
    }

    // If a score update is already in progress, add the new score to the target score
    if (this.scoreAnimation) {
      this.targetScore += amount;
      return;
    }

    // Calculate the target score
    this.targetScore = this.registry.get("points") + amount;

    // Calculate the duration of the score animation
    const duration = 500; // 0.5 seconds

    // Calculate the increment per frame
    const increment = amount / (duration / 60);

    // Create a timer event
    this.scoreAnimation = this.time.addEvent({
      delay: 60, // 60 ms = 1 frame
      callback: () => {
        // Increase the score
        let newScore = this.registry.get("points") + increment;

        // Round the score to avoid floating point numbers
        newScore = Math.round(newScore);

        // Update the score in the registry
        this.registry.set("points", newScore);

        // Update the score text
        this.playerStats.setText(
          `Level: ${
            this.levelNumber
          } | Score: ${newScore} | Lives: ${this.registry.get("lives")}`
        );

        // If the score has reached the target, stop the timer event
        if (newScore >= this.targetScore) {
          this.registry.set("points", this.targetScore);
          this.playerStats.setText(
            `Level: ${this.levelNumber} | Score: ${
              this.targetScore
            } | Lives: ${this.registry.get("lives")}`
          );
          this.scoreAnimation.remove(false);
          this.scoreAnimation = null;
        }
      },
      loop: true,
    });
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
      const revive = this.activePowerUps.find(
        (powerUp) => powerUp.name === "Rebirth"
      );

      if (revive && !this.registry.get("revived")) {
        revive.effect(this);
      } else {
        // Transition to loss scene
        if (this.registry.get("loginID")) {
          submitScore(
            this.registry.get("points"),
            this.registry.get("loginID")
          );
        }
        this.activeWords = [];
        this.scene.start("LossScene");
      }
    }

    // Check for win condition
    if (
      this.calledWords.length === 0 &&
      this.activeWords.length === 0 &&
      this.registry.get("lives") > 0
    ) {
      this.levelComplete.play();

      this.registry.set("pointsMultiplier", this.originalPointsMultiplier);
      this.registry.set(
        "wordQuantityMultiplier",
        this.originalWordQuantityMultiplier
      );

      if (
        this.levelNumber % 3 === 0 &&
        this.levelNumber < 15 &&
        this.activePowerUps.length !== powerUps.length &&
        !this.scoreAnimation
      ) {
        this.scene.start("PowerUp", { nextSceneKey: this.nextSceneKey });
      } else {
        // Transition to win scene
        if (this.registry.get("loginID") && !this.nextSceneKey) {
          submitScore(
            this.registry.get("points"),
            this.registry.get("loginID")
          );
        }
        if (!this.scoreAnimation) {
          this.scene.start("WinScene", {
            nextSceneKey: this.nextSceneKey,
            levelNumber: this.levelNumber,
          });
        }
      }
    }
  }
}
