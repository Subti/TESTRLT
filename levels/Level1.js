import { BaseLevel } from "./BaseLevel";

export class Level1 extends BaseLevel {
  constructor() {
    super("Level1", [{ length: 3, quantity: 10 }], 30, "Level3");
  }
}
