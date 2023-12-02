import { powerUps } from "../powers/basePowers.js";

export class PowerUp extends Phaser.Scene {
  constructor() {
    super("PowerUp");
  }

  init(data) {
    // Store the key of the next scene
    this.nextSceneKey = data.nextSceneKey;
  }

  create() {
    // Select three random power-ups
    const selectedPowerUps = Phaser.Utils.Array.Shuffle(powerUps).slice(0, 3);

    // Create a semi-transparent black rectangle as a background
    const background = this.add
      .rectangle(0, 0, this.scale.width, this.scale.height, 0x000000)
      .setAlpha(0.5);

    // Create a white rectangle as a pop-up
    const popup = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2,
      300,
      200,
      0xffffff
    );

    // Create text for the power-ups
    const powerUpTexts = selectedPowerUps.map((powerUp, index) => {
      const text = this.add.text(
        popup.x - 100,
        popup.y - 50 + index * 50,
        powerUp.name,
        { fontSize: "32px", fill: "#000" }
      );
      text.setInteractive();
      text.on("pointerdown", () => {
        // Activate the selected power-up and start the next scene
        this.activatePowerUp(powerUp);
        this.scene.start(this.nextSceneKey);
      });
      return text;
    });
  }

  activatePowerUp(powerUp) {
    // Get the active power-ups from the registry
    let activePowerUps = this.registry.get("activePowerUps");

    // If there are no active power-ups, initialize the array
    if (!activePowerUps) {
      activePowerUps = [];
    }

    // Add the power-up to the active power-ups
    activePowerUps.push(powerUp);

    // Store the active power-ups in the registry
    this.registry.set("activePowerUps", activePowerUps);
  }
}
