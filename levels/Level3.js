import { BaseLevel } from "./BaseLevel";

export class Level3 extends BaseLevel {
  constructor() {
    super(
      "Level3",
      [
        { length: 3, quantity: 20 },
        { length: 4, quantity: 5 },
      ],
      55,
      "Level4"
    );
  }
}
