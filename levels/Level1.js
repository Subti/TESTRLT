import { BaseLevel } from "./BaseLevel";

export class Level1 extends BaseLevel {
  constructor() {
    super("Level1", 3, 1, 50, "Level2");
  }
}
