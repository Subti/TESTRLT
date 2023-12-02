import { MenuScene } from "../menus/mainMenu";
import { OptionsScene } from "../menus/optionsMenu";
import { WinScene } from "../level-complete/level-pass";
import { LossScene } from "../level-complete/level-fail";
import { BaseLevel } from "../levels/BaseLevel";
import { PowerUp } from "../levels/PowerUp.js";
import { Level1 } from "../levels/Level1";
import { Level2 } from "../levels/Level2";
import { Level3 } from "../levels/Level3";
import { Level4 } from "../levels/Level4";
import { Level5 } from "../levels/Level5";
import { Level6 } from "../levels/Level6";
import { Level7 } from "../levels/Level7";
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
  scene: [
    MenuScene,
    OptionsScene,
    BaseLevel,
    PowerUp,
    Level1,
    Level2,
    Level3,
    Level4,
    Level5,
    Level6,
    Level7,
    WinScene,
    LossScene,
  ],
};
