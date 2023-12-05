import { BaseLevel } from "./BaseLevel";

export class Level10 extends BaseLevel {
  constructor() {
    super(
      "Level10",
      [
        { length: 5, quantity: 5 },
        { length: 6, quantity: 30 },
        { length: 7, quantity: 30 },
        { length: 8, quantity: 10 },
        { length: 9, quantity: 2 },
      ],
      80,
      "Level11"
    );
  }
}
