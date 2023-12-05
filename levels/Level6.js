import { BaseLevel } from "./BaseLevel";

export class Level6 extends BaseLevel {
  constructor() {
    super(
      "Level6",
      [
        { length: 4, quantity: 10 },
        { length: 5, quantity: 15 },
        { length: 6, quantity: 10 },
      ],
      65,
      "Level7"
    );
  }
}
