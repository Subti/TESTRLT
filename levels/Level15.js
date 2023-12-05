import { BaseLevel } from "./BaseLevel";

export class Level15 extends BaseLevel {
  constructor() {
    super(
      "Level15",
      [
        { length: 5, quantity: 10 },
        { length: 6, quantity: 15 },
        { length: 7, quantity: 15 },
        { length: 8, quantity: 20 },
        { length: 9, quantity: 25 },
      ],
      100
    );
  }
}
