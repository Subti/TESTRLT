export const powerUps = [
  {
    name: "WordPop",
    description: "Pops the next word after 3 correct words in a row",
    effect: function (scene) {
      if (scene.activeWords.length > 2) {
        let highestYIndex = 0;
        for (let i = 1; i < scene.activeWords.length; i++) {
          if (scene.activeWords[i].y > scene.activeWords[highestYIndex].y) {
            highestYIndex = i;
          }
        }
        scene.handleCorrectWord(highestYIndex);
      }
    },
  },
  {
    name: "WordFreeze",
    description:
      "Freezes the words in place for 1 second after 5 correct words in a row",
    effect: function (scene) {
      // Freeze the words in place for 1 second
      scene.time.delayedCall(1000, () => {
        // After 1 second, resume the words
        scene.resumeWords();
      });

      // Pause the words
      scene.pauseWords();
    },
  },
  {
    name: " Chunky",
    description:
      "Increases the font-size of the words and slows their fall speed by 50% until the end of the game session, but you only gain half the points. Posessing Chunky prevents Phoon from appearing.",
    effect: function (scene) {
      scene.registry.set(
        "pointsMultiplier",
        scene.registry.get("pointsMultiplier") / 2
      );
    },
  },
  {
    name: " Beefy",
    description: "Increase life total to 5 and replenish life to full",
    effect: function (scene) {
      scene.registry.set("lives", 5);
    },
  },
  {
    name: "Recuperate",
    description:
      "For every 10 words typed correctly in a row, replenish 1 life",
    effect: function (scene) {
      scene.registry.set("lives", scene.registry.get("lives") + 1);
    },
  },
  {
    name: " Phoon",
    description:
      "Decreases the font-size of the words and increases their fall speed by 50% until the end of the game session, but you gain double the points. Posessing Phoon prevents Chunky from appearing.",
    effect: function (scene) {
      scene.registry.set(
        "pointsMultiplier",
        scene.registry.get("pointsMultiplier") * 2
      );
    },
  },
  {
    name: "CoinFlip",
    description:
      "Levels now either contain double or half the amount of words. (Points are adjusted accordingly)",
    effect: function (scene) {
      const random = Math.random();
      if (random < 0.5) {
        scene.registry.set(
          "wordQuantityMultiplier",
          scene.registry.get("wordQuantityMultiplier") * 2
        );
        scene.registry.set(
          "pointsMultiplier",
          scene.registry.get("pointsMultiplier") / 2
        );
      } else {
        scene.registry.set(
          "wordQuantityMultiplier",
          scene.registry.get("wordQuantityMultiplier") / 2
        );
        scene.registry.set(
          "pointsMultiplier",
          scene.registry.get("pointsMultiplier") * 2
        );
      }
    },
  },
  {
    name: "Rebirth",
    description:
      "Upon losing all lives, you are given a second chance starting with 1 life. (This power-up is only active once per game session)",
    effect: function (scene) {
      scene.registry.set("lives", 1);
      scene.time.delayedCall(4000, () => {
        scene.resumeWords();
      });
      scene.registry.set("revived", true);
      scene.pauseWords();
    },
  },
];
