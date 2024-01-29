import { BaseLevel } from "./BaseLevel";

export class Level14 extends BaseLevel {
  constructor() {
    super(
      "Level14",
      [
        { length: 4, quantity: 10 },
        { length: 5, quantity: 10 },
        { length: 6, quantity: 10 },
        { length: 7, quantity: 10 },
        { length: 8, quantity: 15 },
        { length: 9, quantity: 15 },
      ],
      95,
      "Level15"
    );
  }
}
