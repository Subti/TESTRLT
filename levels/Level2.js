import { BaseLevel } from "./BaseLevel";

export class Level2 extends BaseLevel {
  constructor() {
    super("Level2", 3, 5, 30, "Level3");
  }

  preload() {
    super.preload();
  }
}
