import { BaseLevel } from "./BaseLevel.js";

export class Level0 extends BaseLevel {
  constructor() {
    super("Level0", 4, 30, 100, "TestLevel");
    this.wordDelay = { min: 400, max: 500 };
  }
}
