import { BaseLevel } from "./BaseLevel";

export class Level8 extends BaseLevel {
  constructor() {
    super(
      "Level8",
      [
        { length: 5, quantity: 5 },
        { length: 6, quantity: 10 },
        { length: 7, quantity: 10 },
      ],
      70,
      "Level9"
    );
  }
}
