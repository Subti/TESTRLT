import { BaseLevel } from "./BaseLevel";

export class Level9 extends BaseLevel {
  constructor() {
    super(
      "Level9",
      [
        { length: 5, quantity: 3 },
        { length: 6, quantity: 5 },
        { length: 7, quantity: 15 },
        { length: 8, quantity: 5 },
      ],
      75,
      "Level10"
    );
  }
}
