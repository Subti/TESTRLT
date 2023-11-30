import { BaseLevel } from "./BaseLevel";

export class Level1 extends BaseLevel {
  constructor() {
    super("Level1", 5, 5, 50, "Level2");
  }
}
