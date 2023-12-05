import { MenuScene } from "../menus/mainMenu";
import { OptionsScene } from "../menus/optionsMenu";
import { RegisterScene } from "../menus/registerMenu.js";
import { LoginScene } from "../menus/loginMenu.js";
import { WinScene } from "../level-complete/level-pass";
import { LossScene } from "../level-complete/level-fail";
import { BaseLevel } from "../levels/BaseLevel";
import { PowerUp } from "../levels/PowerUp.js";
import { LeaderboardScene } from "../menus/leaderboard.js";
import { Level1 } from "../levels/Level1";
import { Level2 } from "../levels/Level2";
import { Level3 } from "../levels/Level3";
import { Level4 } from "../levels/Level4";
import { Level5 } from "../levels/Level5";
import { Level6 } from "../levels/Level6";
import { Level7 } from "../levels/Level7";
import { Level8 } from "../levels/Level8";
import { Level9 } from "../levels/Level9";
import { Level10 } from "../levels/Level10";
import { Level11 } from "../levels/Level11";
import { Level12 } from "../levels/Level12";
import { Level13 } from "../levels/Level13";
import { Level14 } from "../levels/Level14";
import { Level15 } from "../levels/Level15";
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
      // debug: true, // Renders outline of all physics objects
    },
  },
  scene: [
    MenuScene,
    OptionsScene,
    RegisterScene,
    LoginScene,
    LeaderboardScene,
    BaseLevel,
    PowerUp,
    Level1,
    Level2,
    Level3,
    Level4,
    Level5,
    Level6,
    Level7,
    Level8,
    Level9,
    Level10,
    Level11,
    Level12,
    Level13,
    Level14,
    Level15,
    WinScene,
    LossScene,
  ],
};
