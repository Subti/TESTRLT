import { BaseLevel } from "./BaseLevel";

export class Level8 extends BaseLevel {
  constructor() {
    super(
      "Level8",
      [
        { length: 5, quantity: 10 },
        { length: 6, quantity: 25 },
        { length: 7, quantity: 15 },
      ],
      70,
      "Level9"
    );
  }
}
