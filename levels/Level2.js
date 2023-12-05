import { BaseLevel } from "./BaseLevel";

export class Level2 extends BaseLevel {
  constructor() {
    super("Level2", [{ length: 3, quantity: 20 }], 45, "Level3");
  }
}
