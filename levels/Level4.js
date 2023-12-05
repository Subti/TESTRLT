import { BaseLevel } from "./BaseLevel";

export class Level4 extends BaseLevel {
  constructor() {
    super(
      "Level4",
      [
        { length: 4, quantity: 15 },
        { length: 3, quantity: 15 },
      ],
      50,
      "Level5"
    );
  }
}
