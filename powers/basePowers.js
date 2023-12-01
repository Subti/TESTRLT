export const powerUps = [
  {
    name: "WordPop",
    description: "Pops the next word after 3 correct words in a row",
    effect: function (scene) {
      if (scene.activeWords.length > 0) {
        scene.handleCorrectWord(0);
      }
    },
  },
];
