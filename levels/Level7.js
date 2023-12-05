import { BaseLevel } from "./BaseLevel";

export class Level7 extends BaseLevel {
  constructor() {
    super(
      "Level7",
      [
        { length: 4, quantity: 5 },
        { length: 5, quantity: 20 },
        { length: 6, quantity: 20 },
        { length: 7, quantity: 5 },
      ],
      60,
      "Level8"
    );
  }
}
