import { BaseLevel } from "./BaseLevel";

export class Level12 extends BaseLevel {
  constructor() {
    super(
      "Level12",
      [
        { length: 6, quantity: 5 },
        { length: 7, quantity: 10 },
        { length: 8, quantity: 15 },
        { length: 9, quantity: 15 },
      ],
      95,
      "Level13"
    );
  }
}
