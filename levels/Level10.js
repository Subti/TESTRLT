import { BaseLevel } from "./BaseLevel";

export class Level10 extends BaseLevel {
  constructor() {
    super(
      "Level10",
      [
        { length: 6, quantity: 10 },
        { length: 7, quantity: 10 },
        { length: 8, quantity: 7 },
        { length: 9, quantity: 2 },
      ],
      80,
      "Level11"
    );
  }
}
