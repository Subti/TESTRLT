import { BaseLevel } from "./BaseLevel";

export class Level13 extends BaseLevel {
  constructor() {
    super(
      "Level13",
      [
        { length: 3, quantity: 5 },
        { length: 4, quantity: 5 },
        { length: 5, quantity: 5 },
        { length: 6, quantity: 5 },
        { length: 7, quantity: 7 },
        { length: 8, quantity: 7 },
        { length: 9, quantity: 10 },
      ],
      85,
      "Level14"
    );
  }
}
