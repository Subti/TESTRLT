import { BaseLevel } from "./BaseLevel";

export class Level11 extends BaseLevel {
  constructor() {
    super(
      "Level11",
      [
        { length: 6, quantity: 15 },
        { length: 7, quantity: 35 },
        { length: 8, quantity: 25 },
        { length: 9, quantity: 5 },
      ],
      90,
      "Level12"
    );
  }
}
