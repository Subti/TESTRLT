import { BaseLevel } from "./BaseLevel";

export class Level5 extends BaseLevel {
  constructor() {
    super(
      "Level5",
      [
        { length: 4, quantity: 20 },
        { length: 3, quantity: 5 },
        { length: 5, quantity: 10 },
      ],
      60,
      "Level6"
    );
  }
}
