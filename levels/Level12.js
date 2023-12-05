import { BaseLevel } from "./BaseLevel";

export class Level12 extends BaseLevel {
  constructor() {
    super(
      "Level12",
      [
        { length: 5, quantity: 10 },
        { length: 6, quantity: 10 },
        { length: 7, quantity: 25 },
        { length: 8, quantity: 30 },
        { length: 9, quantity: 5 },
      ],
      95,
      "Level13"
    );
  }
}
