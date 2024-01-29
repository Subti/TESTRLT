import { BaseLevel } from "./BaseLevel";

export class Level7 extends BaseLevel {
  constructor() {
    super(
      "Level7",
      [
        { length: 4, quantity: 2 },
        { length: 5, quantity: 10 },
        { length: 6, quantity: 10 },
        { length: 7, quantity: 5 },
      ],
      60,
      "Level8"
    );
  }
}
