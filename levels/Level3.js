import { BaseLevel } from "./BaseLevel";

export class Level3 extends BaseLevel {
  constructor() {
    super(
      "Level3",
      [
        { length: 3, quantity: 5 },
        { length: 4, quantity: 10 },
      ],
      55,
      "Level4"
    );
  }
}
