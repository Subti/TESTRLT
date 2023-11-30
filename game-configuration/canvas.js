import { MenuScene } from "../menus/mainMenu";
import { WinScene } from "../level-complete/level-pass"
import { LossScene } from "../level-complete/level-fail"
import { BaseLevel } from "../levels/BaseLevel";
import { Level1 } from "../levels/Level1";
import { Level2 } from "../levels/Level2";
//define game config (how it looks and works this is what players would change in settings)
//for example if a player wants the game to be "easier" it could just be an option to use a lower gravity
export const canvasConfiguration = {
  type: Phaser.WEBGL,
  width: 1200,
  height: 600,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 50 },
      debug: true,
    },
  },
  scene: [MenuScene, BaseLevel, Level1, Level2, WinScene, LossScene],
};