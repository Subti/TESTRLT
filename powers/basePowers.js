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
    name: "Chunky",
    description:
      "Increases the font-size of the words and slows their fall speed by 50% until the end of the game session, but you only gain half the points",
  },
  {
    name: "Beefy",
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
];
